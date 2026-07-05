/* ============================================================
   ROOTS BOOK — backend logic (Supabase)
   Обычный сайт в браузере — без Telegram WebApp SDK.
   ============================================================ */

const SUPABASE_URL = 'https://xnfknmhahczszlsvebih.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_WUpJKhQMeqvYDKen-yUxng_J6Hv3VhV';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getUserKey(){
  let k = localStorage.getItem('rb_uid');
  if (!k){ k = 'anon_' + crypto.randomUUID(); localStorage.setItem('rb_uid', k); }
  return k;
}

/* ---------------- editor auth (Supabase Auth) ---------------- */
const EditorAuth = {
  session: null,
  editor: null,

  async init(){
    const { data } = await sb.auth.getSession();
    this.session = data.session || null;
    if (this.session) await this.loadProfile();
    mountEditorBadge();
  },

  async loadProfile(){
    const { data } = await sb.from('editor_profiles').select('*').eq('user_id', this.session.user.id).maybeSingle();
    this.editor = data ? { name: data.name, role: data.role } : { name: this.session.user.email, role: 'editor' };
  },

  async login(email, password){
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    this.session = data.session;
    await this.loadProfile();
    mountEditorBadge();
    return this.editor;
  },

  async logout(){
    await sb.auth.signOut();
    this.session = null;
    this.editor = null;
    mountEditorBadge();
  },

  isLoggedIn(){ return !!this.session; },
};

// Каждая страница должна дождаться этого перед первым render(),
// чтобы сразу знать, залогинен редактор или нет:
const editorAuthReady = EditorAuth.init();

/* ---------------- article blocks: render for readers ---------------- */
function renderBlocks(blocks){
  return blocks.map(b => {
    if (b.type === 'text') return b.html;
    if (b.type === 'image') return `
      <img src="${b.url}" loading="lazy">
      ${b.caption ? `<div class="block-caption">${escapeHtml(b.caption)}</div>` : ''}`;
    if (b.type === 'quote') return `
      <blockquote>${escapeHtml(b.text)}${b.author ? `<footer>— ${escapeHtml(b.author)}</footer>` : ''}</blockquote>`;
    if (b.type === 'youtube') return `
      <div class="yt" onclick="playYt(this,'${b.id}')">
        <img class="yt-thumb" src="https://i.ytimg.com/vi/${b.id}/hqdefault.jpg" loading="lazy">
        <div class="yt-play">▶</div>
      </div>`;
    if (b.type === 'links') return `
      <div class="tags" style="margin:16px 0">${b.items.map(l =>
        `<a class="tag" href="${l.url}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join('')}</div>`;
    return '';
  }).join('');
}

function playYt(el, id){
  el.onclick = null;
  el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1"
    title="YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
}

/* ---------------- fetch a published DB article for an artist ---------------- */
async function fetchPublishedArticle(artistId, lang = 'ru'){
  try{
    const { data } = await sb.from('articles')
      .select('*')
      .eq('artist_id', artistId)
      .eq('lang', lang)
      .eq('published', true)
      .order('updated_at', { ascending:false })
      .limit(1);
    return (data && data.length) ? data[0] : null;
  }catch(e){ return null; }
}

async function fetchArtistArticles(artistId){
  try{
    const { data } = await sb.from('articles').select('*').eq('artist_id', artistId).order('updated_at', { ascending:false });
    return data || [];
  }catch(e){ return []; }
}

/* ---------------- likes ---------------- */
async function getLikeState(artistId){
  const key = getUserKey();
  try{
    const { count } = await sb.from('likes').select('*', { count:'exact', head:true }).eq('artist_id', artistId);
    const { data: mine } = await sb.from('likes').select().eq('artist_id', artistId).eq('user_key', key);
    return { count: count ?? 0, liked: !!(mine && mine.length) };
  }catch(e){ return { count: 0, liked: false }; }
}

async function toggleLike(artistId){
  const key = getUserKey();
  const { data: mine } = await sb.from('likes').select().eq('artist_id', artistId).eq('user_key', key);
  if (mine && mine.length) await sb.from('likes').delete().eq('artist_id', artistId).eq('user_key', key);
  else await sb.from('likes').insert({ artist_id: artistId, user_key: key });
  return getLikeState(artistId);
}

/* ---------------- comments ---------------- */
async function fetchComments(artistId){
  try{
    const { data } = await sb.from('comments').select().eq('artist_id', artistId).order('created_at', { ascending:true });
    return data || [];
  }catch(e){ return []; }
}

async function postComment(artistId, author, text){
  await sb.from('comments').insert({ artist_id: artistId, author: author || 'Гость', text, user_key: getUserKey() });
  return fetchComments(artistId);
}

/* ---------------- editor status badge (shown site-wide in header) ---------------- */
function mountEditorBadge(){
  const wrap = document.querySelector('.site-header .wrap');
  if (!wrap) return;
  let badge = document.getElementById('editor-badge-pill');
  if (!EditorAuth.isLoggedIn()){
    if (badge) badge.remove();
    return;
  }
  if (!badge){
    badge = document.createElement('div');
    badge.id = 'editor-badge-pill';
    badge.style.cssText = 'margin-left:auto;display:flex;align-items:center;gap:8px;background:#111;color:#fff;border-radius:999px;padding:8px 8px 8px 14px;font-size:12.5px;font-weight:700;white-space:nowrap';
    wrap.appendChild(badge);
  }
  badge.innerHTML = `
    <a href="editor.html" style="color:#fff;text-decoration:none">✎ Редактор: ${escapeHtml(EditorAuth.editor?.name || '')}</a>
    <button onclick="handleHeaderLogout()" title="Выйти из режима редактора"
      style="background:rgba(255,255,255,.15);border:none;color:#fff;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center;padding:0">✕</button>`;
}

function handleHeaderLogout(){
  if (!confirm('Выйти из режима редактора?')) return;
  EditorAuth.logout().then(() => location.reload());
}

/* ---------------- artist profile override (name + cover photo, DB-backed) ---------------- */
async function fetchArtistOverride(id){
  try{
    const { data } = await sb.from('artists').select('*').eq('id', id).maybeSingle();
    return data || null;
  }catch(e){ return null; }
}

async function fetchAllArtistOverrides(){
  try{
    const { data } = await sb.from('artists').select('id, name, photo_url');
    const map = {};
    (data || []).forEach(row => { map[row.id] = row; });
    return map;
  }catch(e){ return {}; }
}

async function saveArtistProfile(id, name, photoUrl, infobox){
  const { data, error } = await sb.from('artists')
    .upsert({ id, name, photo_url: photoUrl || null, infobox: infobox || {}, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

async function uploadPhoto(file){
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from('photos').upload(path, file);
  if (error) throw new Error(error.message);
  const { data } = sb.storage.from('photos').getPublicUrl(path);
  return data.publicUrl;
}

const INFOBOX_FIELDS = [
  ['real_name', 'Настоящее имя'],
  ['born', 'Дата рождения'],
  ['from', 'Город / регион'],
  ['years_active', 'Годы активности'],
  ['genre', 'Жанр'],
  ['label', 'Лейбл'],
];

function openArtistProfileEditor(id, currentName, currentPhoto, currentInfobox){
  if (!EditorAuth.isLoggedIn()){ alert('Сначала войдите как редактор.'); return; }
  const infobox = currentInfobox || {};

  const modal = document.createElement('div');
  modal.className = 'editor-modal';
  modal.innerHTML = `
    <div class="editor-panel" style="max-width:460px">
      <div class="editor-panel-head">
        <h3>Профиль артиста</h3>
        <div class="editor-close" onclick="this.closest('.editor-modal').remove()">✕</div>
      </div>
      <input class="editor-title" id="ap-name" placeholder="Имя артиста" value="${escapeAttr(currentName || '')}">

      <div class="ed-block">
        <b>Фото</b>
        <input id="ap-photo" placeholder="https://... (ссылка на фото)" value="${escapeAttr(currentPhoto || '')}">
        <input id="ap-photo-file" type="file" accept="image/*" style="padding:8px 0">
        <div id="ap-photo-status" style="font-size:11.5px;color:var(--muted)"></div>
      </div>

      <div class="ed-block">
        <b>Анкетные данные</b>
        ${INFOBOX_FIELDS.map(([key,label]) => `
          <input data-ib="${key}" placeholder="${label}" value="${escapeAttr(infobox[key] || '')}">`).join('')}
      </div>

      <div class="editor-actions" style="justify-content:flex-end">
        <div class="ed-btn-row">
          <button id="ap-cancel">Отмена</button>
          <button id="ap-save">Сохранить</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector('#ap-photo-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const status = modal.querySelector('#ap-photo-status');
    status.textContent = 'Загружаем…';
    try{
      const url = await uploadPhoto(file);
      modal.querySelector('#ap-photo').value = url;
      status.textContent = 'Загружено ✓';
    }catch(err){
      status.textContent = 'Ошибка загрузки: ' + err.message;
    }
  });

  modal.querySelector('#ap-cancel').onclick = () => modal.remove();
  modal.querySelector('#ap-save').onclick = async () => {
    const name = modal.querySelector('#ap-name').value.trim();
    const photoUrl = modal.querySelector('#ap-photo').value.trim();
    const newInfobox = {};
    modal.querySelectorAll('[data-ib]').forEach(inp => {
      const v = inp.value.trim();
      if (v) newInfobox[inp.dataset.ib] = v;
    });
    if (!name){ alert('Нужно имя'); return; }
    const btn = modal.querySelector('#ap-save');
    btn.disabled = true; btn.textContent = 'Сохраняем…';
    try{
      await saveArtistProfile(id, name, photoUrl, newInfobox);
      modal.remove();
      window.dispatchEvent(new CustomEvent('rb:artist-saved', { detail: { id } }));
    }catch(e){
      alert('Не получилось сохранить: ' + e.message);
      btn.disabled = false; btn.textContent = 'Сохранить';
    }
  };
}
function openArticleEditor(artistId, artistName, existing = null){
  if (!EditorAuth.isLoggedIn()){ alert('Сначала войдите как редактор.'); return; }

  const state = {
    id: existing?.id || null,
    title: existing?.title || artistName || '',
    lang: existing?.lang || 'ru',
    published: existing?.published || false,
    blocks: existing?.blocks ? JSON.parse(JSON.stringify(existing.blocks)) : [],
  };

  const modal = document.createElement('div');
  modal.className = 'editor-modal';
  modal.innerHTML = `
    <div class="editor-panel">
      <div class="editor-panel-head">
        <h3>Статья · ${escapeHtml(artistName || '')}</h3>
        <div class="editor-close" onclick="this.closest('.editor-modal').remove()">✕</div>
      </div>
      <input class="editor-title" id="ed-title" placeholder="Заголовок статьи" value="${escapeAttr(state.title)}">
      <div class="editor-lang-row">
        <div class="lang-pill ${state.lang==='ru'?'active':''}" data-l="ru">RU</div>
        <div class="lang-pill ${state.lang==='uk'?'active':''}" data-l="uk">UA</div>
        <div class="lang-pill ${state.lang==='en'?'active':''}" data-l="en">EN</div>
      </div>
      <div class="editor-blocks" id="ed-blocks"></div>
      <div class="editor-toolbar">
        <button data-add="text">+ Текст</button>
        <button data-add="image">+ Фото</button>
        <button data-add="quote">+ Цитата</button>
        <button data-add="youtube">+ YouTube</button>
        <button data-add="links">+ Ссылки</button>
      </div>
      <div class="editor-actions">
        <label><input type="checkbox" id="ed-published" ${state.published ? 'checked' : ''}> Опубликовать</label>
        <div class="ed-btn-row">
          <button id="ed-cancel">Отмена</button>
          <button id="ed-save">Сохранить</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelectorAll('.editor-lang-row .lang-pill').forEach(el=>{
    el.onclick = () => {
      state.lang = el.dataset.l;
      modal.querySelectorAll('.editor-lang-row .lang-pill').forEach(x=>x.classList.toggle('active', x===el));
    };
  });

  const blocksEl = modal.querySelector('#ed-blocks');
  const redraw = () => { blocksEl.innerHTML = state.blocks.map((b,i)=>blockEditorRow(b,i)).join(''); };
  redraw();

  modal.querySelectorAll('[data-add]').forEach(btn => {
    btn.onclick = () => {
      const type = btn.dataset.add;
      const fresh = {
        text:{type:'text',html:'<p></p>'},
        image:{type:'image',url:'',caption:''},
        quote:{type:'quote',text:'',author:''},
        youtube:{type:'youtube',id:''},
        links:{type:'links',items:[]},
      }[type];
      state.blocks.push(fresh);
      redraw();
    };
  });

  blocksEl.addEventListener('input', (e) => {
    const row = e.target.closest('[data-idx]');
    if (!row) return;
    const idx = +row.dataset.idx;
    const b = state.blocks[idx];
    const field = e.target.dataset.field;
    if (field === '_links_raw'){
      b.items = e.target.value.split('\n').filter(Boolean).map(line => {
        const [label, url] = line.split('|').map(s => s.trim());
        return { label: label || url, url: url || '#' };
      });
    } else if (field){
      b[field] = e.target.value;
    }
  });

  blocksEl.addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (del){ state.blocks.splice(+del.dataset.del, 1); redraw(); }
  });

  blocksEl.addEventListener('change', async (e) => {
    const fileInput = e.target.closest('[data-imgfile]');
    if (!fileInput) return;
    const idx = +fileInput.dataset.imgfile;
    const file = fileInput.files[0];
    if (!file) return;
    const status = blocksEl.querySelector(`[data-status="${idx}"]`);
    status.textContent = 'Загружаем…';
    try{
      const url = await uploadPhoto(file);
      state.blocks[idx].url = url;
      redraw();
    }catch(err){
      status.textContent = 'Ошибка загрузки: ' + err.message;
    }
  });

  modal.querySelector('#ed-cancel').onclick = () => modal.remove();

  modal.querySelector('#ed-save').onclick = async () => {
    state.title = modal.querySelector('#ed-title').value.trim();
    state.published = modal.querySelector('#ed-published').checked;
    if (!state.title){ alert('Нужен заголовок'); return; }
    const saveBtn = modal.querySelector('#ed-save');
    saveBtn.disabled = true; saveBtn.textContent = 'Сохраняем…';
    try{
      const row = {
        artist_id: artistId, title: state.title, lang: state.lang,
        blocks: state.blocks, published: state.published,
        updated_at: new Date().toISOString(),
      };
      const { data, error } = state.id
        ? await sb.from('articles').update(row).eq('id', state.id).select().single()
        : await sb.from('articles').insert(row).select().single();

      if (error){ alert('Ошибка: ' + error.message); saveBtn.disabled=false; saveBtn.textContent='Сохранить'; return; }
      modal.remove();
      window.dispatchEvent(new CustomEvent('rb:article-saved', { detail: { artistId } }));
    }catch(e){
      alert('Не получилось сохранить: ' + e.message);
      saveBtn.disabled=false; saveBtn.textContent='Сохранить';
    }
  };
}

function blockEditorRow(b, i){
  const del = `<button data-del="${i}" class="ed-block-del">✕</button>`;
  if (b.type === 'text')
    return `<div class="ed-block" data-idx="${i}"><b>Текст</b>${del}
      <textarea data-field="html" placeholder="HTML, например &lt;p&gt;...&lt;/p&gt;">${escapeHtml(b.html)}</textarea></div>`;
  if (b.type === 'image')
    return `<div class="ed-block" data-idx="${i}"><b>Фото</b>${del}
      <input data-field="url" placeholder="URL картинки" value="${escapeAttr(b.url)}">
      <input type="file" accept="image/*" data-imgfile="${i}" style="padding:8px 0">
      <div class="img-upload-status" data-status="${i}" style="font-size:11.5px;color:var(--muted);margin-bottom:8px"></div>
      <input data-field="caption" placeholder="Подпись (необязательно)" value="${escapeAttr(b.caption||'')}"></div>`;
  if (b.type === 'quote')
    return `<div class="ed-block" data-idx="${i}"><b>Цитата</b>${del}
      <textarea data-field="text" placeholder="Текст цитаты">${escapeHtml(b.text)}</textarea>
      <input data-field="author" placeholder="Автор (необязательно)" value="${escapeAttr(b.author||'')}"></div>`;
  if (b.type === 'youtube')
    return `<div class="ed-block" data-idx="${i}"><b>YouTube</b>${del}
      <input data-field="id" placeholder="ID видео (из youtube.com/watch?v=ID)" value="${escapeAttr(b.id)}"></div>`;
  if (b.type === 'links')
    return `<div class="ed-block" data-idx="${i}"><b>Ссылки</b>${del}
      <textarea data-field="_links_raw" placeholder="Instagram | https://instagram.com/...  (по одной на строку)">${
        (b.items||[]).map(l => `${l.label} | ${l.url}`).join('\n')}</textarea></div>`;
  return '';
}
