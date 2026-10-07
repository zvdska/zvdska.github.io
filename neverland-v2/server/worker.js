/**
 * NEVERLAND shop — сервер заказов (Cloudflare Worker, бесплатный тариф)
 *
 * Что делает:
 *   GET  /config               → цена коробки в гривнах (для чекаута)
 *   GET  /np/cities?q=Київ     → поиск населённых пунктов Новой почты
 *   GET  /np/branches?city=REF&q=12 → отделения и почтоматы города
 *   POST /order                → проверяет заказ, создаёт счёт monobank,
 *                                шлёт заказ в Telegram, отдаёт ссылку на оплату
 *   POST /mono                 → вебхук monobank: при успешной оплате пишет в Telegram
 *   GET  /status?inv=ID        → статус оплаты (страница «спасибо» на сайте)
 *
 * Секреты и настройки (Settings → Variables and Secrets в Cloudflare):
 *   TG_TOKEN     — токен бота от @BotFather                      (secret)
 *   TG_CHAT_ID   — куда слать заказы: ваш id или id группы        (text)
 *   NP_KEY       — API-ключ Новой почты из кабинета               (secret)
 *   MONO_TOKEN   — X-Token эквайринга monobank для ФОП           (secret)
 *   PRICE_UAH    — цена одной коробки в гривнах, напр. 12500      (text)
 *   SITE_URL     — адрес сайта, напр. https://neverland.tyrazh.com (text)
 *
 * Цена и сумма считаются ТОЛЬКО здесь, на сервере, — с сайта её подделать нельзя.
 */

const MAX_QTY = 5;
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const MONO = 'https://api.monobank.ua';
const NP = 'https://api.novaposhta.ua/v2.0/json/';

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    try {
      if (url.pathname === '/config' && req.method === 'GET')
        return json({ priceUAH: price(env), maxQty: MAX_QTY }, cors);

      if (url.pathname === '/np/cities' && req.method === 'GET')
        return json(await npCities(env, url.searchParams.get('q') || ''), cors);

      if (url.pathname === '/np/branches' && req.method === 'GET')
        return json(await npBranches(env, url.searchParams.get('city') || '', url.searchParams.get('q') || ''), cors);

      if (url.pathname === '/order' && req.method === 'POST')
        return json(await createOrder(req, env), cors);

      if (url.pathname === '/status' && req.method === 'GET')
        return json(await invoiceStatus(env, url.searchParams.get('inv') || ''), cors);

      if (url.pathname === '/mono' && req.method === 'POST')
        return await monoWebhook(req, env);

      return json({ error: 'not_found' }, cors, 404);
    } catch (e) {
      const status = e.status || 500;
      return json({ error: e.code || 'server_error', message: e.expose ? e.message : undefined }, cors, status);
    }
  },
};

/* ── helpers ─────────────────────────────────────────────── */
function corsHeaders(req, env) {
  const origin = req.headers.get('Origin') || '';
  const allowed = (env.SITE_URL || '').replace(/\/+$/, '');
  // разрешаем свой сайт и локальную разработку
  const ok = origin === allowed || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : allowed,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}
const json = (data, headers = {}, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } });
const fail = (code, message, status = 400) => Object.assign(new Error(message), { code, status, expose: true });
const price = env => Math.round(Number(env.PRICE_UAH) || 0);
const esc = s => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const clip = (s, n = 200) => String(s ?? '').trim().slice(0, n);
const uah = n => n.toLocaleString('uk-UA') + ' ₴';

async function tg(env, text) {
  const r = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  if (!r.ok) throw fail('telegram_failed', 'Telegram: ' + (await r.text()), 502);
}

/* ── Нова пошта ──────────────────────────────────────────── */
async function np(env, modelName, calledMethod, methodProperties) {
  const r = await fetch(NP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: env.NP_KEY, modelName, calledMethod, methodProperties }),
  });
  const d = await r.json();
  if (!d.success) throw fail('np_failed', (d.errors || []).join('; ') || 'Nova Poshta error', 502);
  return d.data || [];
}
async function npCities(env, q) {
  q = clip(q, 60);
  if (q.length < 2) return [];
  const data = await np(env, 'Address', 'searchSettlements', { CityName: q, Limit: '12', Page: '1' });
  const list = (data[0] && data[0].Addresses) || [];
  return list
    .filter(a => Number(a.Warehouses) > 0)                // только где есть отделения
    .map(a => ({ ref: a.DeliveryCity, name: a.Present }));
}
async function npBranches(env, cityRef, q) {
  if (!/^[0-9a-f-]{36}$/i.test(cityRef)) return [];
  const data = await np(env, 'AddressGeneral', 'getWarehouses', {
    CityRef: cityRef, FindByString: clip(q, 60), Limit: '60', Page: '1',
  });
  return data.map(w => ({
    ref: w.Ref,
    name: w.Description,
    kind: w.CategoryOfWarehouse === 'Postomat' ? 'postomat' : 'branch',
  }));
}

/* ── заказ → счёт monobank + Telegram ────────────────────── */
async function createOrder(req, env) {
  const b = await req.json().catch(() => ({}));
  if (b.website) throw fail('bad_request', 'Bad request');          // ловушка для ботов

  const qty = Math.trunc(Number(b.qty));
  if (!(qty >= 1 && qty <= MAX_QTY)) throw fail('bad_qty', 'Invalid quantity');
  if (!SIZES.includes(b.size)) throw fail('bad_size', 'Pick a size');
  const name = clip(b.name, 80), phone = clip(b.phone, 30);
  if (!name) throw fail('bad_name', 'Name is required');
  if (phone.replace(/\D/g, '').length < 10) throw fail('bad_phone', 'Check the phone number');
  if (!b.cityRef || !b.branchRef) throw fail('bad_delivery', 'Choose a city and a Nova Poshta branch');

  const P = price(env);
  if (!P) throw fail('no_price', 'PRICE_UAH is not set', 500);
  const total = P * qty;
  const id = 'NL-' + Date.now().toString(36).slice(-5).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase();
  const site = (env.SITE_URL || '').replace(/\/+$/, '');
  const workerUrl = new URL(req.url).origin;

  // 1. счёт в monobank
  const r = await fetch(`${MONO}/api/merchant/invoice/create`, {
    method: 'POST',
    headers: { 'X-Token': env.MONO_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: total * 100,                                     // в копейках
      ccy: 980,
      merchantPaymInfo: {
        reference: id,
        destination: `Never Land Box × ${qty}, замовлення ${id}`,
        basketOrder: [{ name: `Never Land Box (футболка ${b.size})`, qty, sum: P * 100, code: 'NL-BOX', unit: 'шт.' }],
      },
      redirectUrl: `${site}/?order=${id}`,
      webHookUrl: `${workerUrl}/mono`,
      validity: 60 * 60 * 24,
    }),
  });
  const inv = await r.json().catch(() => ({}));
  if (!r.ok || !inv.pageUrl) throw fail('mono_failed', 'Payment is unavailable right now', 502);

  // 2. заказ в Telegram
  const lines = [
    `🆕 <b>Нове замовлення ${esc(id)}</b> — очікує оплату`,
    `Never Land Box × ${qty} — <b>${uah(total)}</b>`,
    `Розмір футболки: <b>${esc(b.size)}</b>`,
    '',
    `👤 ${esc(name)}`,
    `📞 ${esc(phone)}`,
    b.email ? `✉️ ${esc(clip(b.email, 100))}` : null,
    b.handle ? `💬 ${esc(clip(b.handle, 60))}` : null,
    '',
    `📦 НП: ${esc(clip(b.cityName, 120))}`,
    `${esc(clip(b.branchName, 200))}`,
    b.comment ? `\n📝 ${esc(clip(b.comment, 500))}` : null,
    '',
    `Рахунок monobank: <code>${esc(inv.invoiceId)}</code>`,
  ].filter(x => x !== null);
  await tg(env, lines.join('\n'));

  return { orderId: id, invoiceId: inv.invoiceId, pageUrl: inv.pageUrl, total };
}

/* ── статус оплаты ───────────────────────────────────────── */
async function getInvoice(env, inv) {
  if (!/^[A-Za-z0-9_-]{4,64}$/.test(inv)) throw fail('bad_invoice', 'Bad invoice id');
  const r = await fetch(`${MONO}/api/merchant/invoice/status?invoiceId=${encodeURIComponent(inv)}`, {
    headers: { 'X-Token': env.MONO_TOKEN },
  });
  if (!r.ok) throw fail('mono_failed', 'Status unavailable', 502);
  return r.json();
}
async function invoiceStatus(env, inv) {
  const d = await getInvoice(env, inv);
  return { status: d.status, reference: d.reference };
}

/* ── вебхук monobank ─────────────────────────────────────────
   Подписи не доверяем на слово: на каждый вызов перепроверяем статус
   счёта напрямую в monobank по нашему токену — подделать это нельзя. */
async function monoWebhook(req, env) {
  const body = await req.json().catch(() => ({}));
  if (!body.invoiceId) return new Response('ok');
  const d = await getInvoice(env, body.invoiceId);
  if (d.status !== body.status) return new Response('ok');   // устаревший/чужой вызов

  const amount = d.finalAmount ?? d.amount;
  if (d.status === 'success')
    await tg(env, `✅ <b>Оплачено: ${esc(d.reference)}</b>\nСума: ${uah(amount / 100)}\nРахунок: <code>${esc(d.invoiceId)}</code>`);
  else if (d.status === 'failure')
    await tg(env, `❌ Оплата не пройшла: ${esc(d.reference)}${d.failureReason ? '\n' + esc(d.failureReason) : ''}`);
  else if (d.status === 'reversed')
    await tg(env, `↩️ Повернення коштів: ${esc(d.reference)}`);

  return new Response('ok');
}
