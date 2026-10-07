# Подключение заказов: Telegram + Нова пошта + monobank

Сервер заказов — один файл `worker.js`. Он живёт на Cloudflare Workers (бесплатно, без своего сервера).
Ключи хранятся только там, на сайт они не попадают.

## 1. Telegram-бот
1. В Telegram откройте @BotFather → `/newbot` → придумайте имя → получите **токен** (`123456:ABC…`).
2. Напишите своему боту любое сообщение (или добавьте бота в группу, куда хотите получать заказы).
3. Откройте в браузере `https://api.telegram.org/bot<ТОКЕН>/getUpdates` и найдите `"chat":{"id": …}` — это **TG_CHAT_ID**
   (у групп он с минусом, например `-1001234567890`).

## 2. Нова пошта
Кабинет business.novaposhta.ua → Налаштування → Безпека → **Створити ключ** → это **NP_KEY**.

## 3. monobank (ФОП)
1. В приложении monobank для ФОП подключите **Інтернет-еквайринг** (раздел «Еквайринг» / web.monobank.ua).
2. В кабинете эквайринга (web.monobank.ua) возьмите **X-Token** — это **MONO_TOKEN**.
   Для пробных оплат там же есть тестовый токен — с ним деньги не списываются.

## 4. Cloudflare Worker
1. Зарегистрируйтесь на dash.cloudflare.com → **Workers & Pages** → **Create** → **Create Worker**
   → имя `neverland-shop` → **Deploy**.
2. **Edit code** → удалите всё → вставьте содержимое `worker.js` → **Deploy**.
3. **Settings → Variables and Secrets** → добавьте:

   | Имя | Тип | Значение |
   |---|---|---|
   | TG_TOKEN | Secret | токен бота |
   | TG_CHAT_ID | Text | id чата |
   | NP_KEY | Secret | ключ Новой почты |
   | MONO_TOKEN | Secret | X-Token monobank |
   | PRICE_UAH | Text | цена одной коробки в гривнах, например `12500` |
   | SITE_URL | Text | адрес сайта без слэша в конце, например `https://neverland.tyrazh.com` |

4. Скопируйте адрес воркера (вид `https://neverland-shop.ИМЯ.workers.dev`).

## 5. Сайт
В `index.html`, в настройках `CFG.order`, впишите адрес воркера:

```js
api:'https://neverland-shop.ИМЯ.workers.dev'
```

## Как это работает
1. Покупатель выбирает размер, город и отделение НП (подсказки идут прямо из базы Новой почты) → «Pay with monobank».
2. Сервер сам считает сумму (`PRICE_UAH × количество`), создаёт счёт в monobank
   и присылает в Telegram заказ со статусом «очікує оплату».
3. Покупатель платит на странице monobank (карта, Apple Pay, Google Pay) и возвращается на сайт — там видно «Paid — thank you!».
4. monobank сообщает серверу об оплате → в Telegram приходит «✅ Оплачено: NL-…».
   Сервер каждый раз перепроверяет статус напрямую в monobank, так что подделать «оплату» нельзя.

Проверка: `https://neverland-shop.ИМЯ.workers.dev/config` должен показать вашу цену.
