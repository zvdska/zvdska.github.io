/* ============================================================
   ROOTS BOOK — backend logic (Supabase)
   Обычный сайт в браузере — без Telegram WebApp SDK.
   ============================================================ */

const SUPABASE_URL = 'https://xnfknmhahczszlsvebih.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_WUpJKhQMeqvYDKen-yUxng_J6Hv3VhV';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const FN = (name) => `${SUPABASE_URL}/functions/v1/${name}`;

function getUserKey(){
  let k = localStorage.getItem('rb_uid');
  if (!k){ k = 'anon_' + crypto.randomUUID(); localStorage.setItem('rb_uid', k); }
  return k;
}

/* ---------------- editor auth ---------------- */
const EditorAuth = {
  token: localStorage.getItem('rb_editor_token') || null,
  editor: JSON.parse(localStorage.getItem('rb_editor_info') || 'null'),

  async login(name, passcode){
    const r = await fetch(FN('editor-login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, passcode }),
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error);
    this.token = d.token;
    this.editor = d.editor;
    localStorage.setItem('rb_editor_token', d.token);
    localStorage.setItem('rb_editor_info', JSON.stringify(d.editor));
    return d.editor;
  },
  logout(){
    this.token = null;
    this.editor = null;
    localStorage.removeItem('rb_editor_token');
    localStorage.removeItem('rb_editor_info');
  },
  isLoggedIn(){ return !!this.token; },
};

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

/* ============================================================
   ARTICLE EDITOR MODAL — used from artist.html and editor.html
   ============================================================ */
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

  modal.querySelector('#ed-cancel').onclick = () => modal.remove();

  modal.querySelector('#ed-save').onclick = async () => {
    state.title = modal.querySelector('#ed-title').value.trim();
    state.published = modal.querySelector('#ed-published').checked;
    if (!state.title){ alert('Нужен заголовок'); return; }
    const saveBtn = modal.querySelector('#ed-save');
    saveBtn.disabled = true; saveBtn.textContent = 'Сохраняем…';
    try{
      const r = await fetch(FN('save-article'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${EditorAuth.token}` },
        body: JSON.stringify({
          id: state.id, artistId, title: state.title,
          lang: state.lang, blocks: state.blocks, published: state.published,
        }),
      });
      const d = await r.json();
      if (d.error){ alert('Ошибка: ' + d.error); saveBtn.disabled=false; saveBtn.textContent='Сохранить'; return; }
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
