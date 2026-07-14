/* ============================================================
   ROOTS BOOK — i18n (RU / UK / EN)
   ============================================================ */

const I18N = {
  ru: {
    nav_artists: 'Артисты',
    nav_donate: 'Донат',
    nav_search: 'Поиск',
    nav_contacts: 'Контакты',
    nav_about: 'О проекте',
    search_placeholder: 'Поиск артиста',
    footer_editors: 'Для редакторов',
    footer_cookie: 'Политика cookie',
    footer_copy_line: 'Материалы публикуются с разрешения редакции; при цитировании ссылка на источник обязательна.',
    sponsors_heading: 'Наши спонсоры',
    artists_heading: 'Артисты',
    view_all_btn: 'Смотреть всех →',
    comments_heading: 'Комментарии',
    comment_placeholder: 'Ваш комментарий…',
    empty_comments: 'Пока нет комментариев — будьте первым.',
    history_heading: 'История',
    editors_note_label: 'Редакция',
    all_artists_heading: 'Все артисты',
    sort_default: 'По умолчанию',
    sort_az: 'А → Я',
    contacts_heading: 'Контакты',
    press_label: 'Связь с редакцией',
    ads_label: 'Реклама и сотрудничество',
    write_btn: 'Написать →',
    donate_heading: 'Поддержать проект',
    donate_blurb: 'ROOTS BOOK — некоммерческий архив украинского хип-хопа, который ведут редакторы-волонтёры. Донаты идут на хостинг, базу данных и работу редакции.',
    card_label: 'Карта',
    crypto_label: 'Крипто-кошелёк',
    cookies_heading: 'Политика сбора cookie',
    home_link: 'Главная',
  },
  uk: {
    nav_artists: 'Артисти',
    nav_donate: 'Донат',
    nav_search: 'Пошук',
    nav_contacts: 'Контакти',
    nav_about: 'Про проєкт',
    search_placeholder: 'Пошук артиста',
    footer_editors: 'Для редакторів',
    footer_cookie: 'Політика cookie',
    footer_copy_line: 'Матеріали публікуються з дозволу редакції; при цитуванні посилання на джерело обов\u2019язкове.',
    sponsors_heading: 'Наші спонсори',
    artists_heading: 'Артисти',
    view_all_btn: 'Дивитись усіх →',
    comments_heading: 'Коментарі',
    comment_placeholder: 'Ваш коментар…',
    empty_comments: 'Поки немає коментарів — будьте першим.',
    history_heading: 'Історія',
    editors_note_label: 'Редакція',
    all_artists_heading: 'Усі артисти',
    sort_default: 'За замовчуванням',
    sort_az: 'А → Я',
    contacts_heading: 'Контакти',
    press_label: 'Зв\u2019язок з редакцією',
    ads_label: 'Реклама та співпраця',
    write_btn: 'Написати →',
    donate_heading: 'Підтримати проєкт',
    donate_blurb: 'ROOTS BOOK — некомерційний архів українського хіп-хопу, який ведуть редактори-волонтери. Донати йдуть на хостинг, базу даних і роботу редакції.',
    card_label: 'Картка',
    crypto_label: 'Крипто-гаманець',
    cookies_heading: 'Політика збору cookie',
    home_link: 'Головна',
  },
  en: {
    nav_artists: 'Artists',
    nav_donate: 'Donate',
    nav_search: 'Search',
    nav_contacts: 'Contacts',
    nav_about: 'About',
    search_placeholder: 'Search artist',
    footer_editors: 'For editors',
    footer_cookie: 'Cookie policy',
    footer_copy_line: 'Content is published with the editors\u2019 permission; attribution is required when quoting.',
    sponsors_heading: 'Our sponsors',
    artists_heading: 'Artists',
    view_all_btn: 'View all →',
    comments_heading: 'Comments',
    comment_placeholder: 'Your comment…',
    empty_comments: 'No comments yet — be the first.',
    history_heading: 'History',
    editors_note_label: 'Editorial team',
    all_artists_heading: 'All artists',
    sort_default: 'Default',
    sort_az: 'A → Z',
    contacts_heading: 'Contacts',
    press_label: 'Editorial contact',
    ads_label: 'Advertising & partnerships',
    write_btn: 'Write →',
    donate_heading: 'Support the project',
    donate_blurb: 'ROOTS BOOK is a non-profit archive of Ukrainian hip-hop, run by volunteer editors. Donations cover hosting, the database, and editorial work.',
    card_label: 'Card',
    crypto_label: 'Crypto wallet',
    cookies_heading: 'Cookie policy',
    home_link: 'Home',
  },
};

function getLang(){
  return localStorage.getItem('rb_lang') || 'ru';
}

function applyLang(lang){
  if (!I18N[lang]) lang = 'ru';
  localStorage.setItem('rb_lang', lang);
  document.documentElement.lang = lang === 'uk' ? 'uk' : lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = I18N[lang][key];
    if (val === undefined) return;
    if (el.hasAttribute('data-i18n-placeholder')) el.setAttribute('placeholder', val);
    else el.textContent = val;
  });

  document.querySelectorAll('.lang-switch [data-lang]').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  window.dispatchEvent(new CustomEvent('rb:lang-changed', { detail: { lang } }));
}

function mountLangSwitch(){
  const header = document.querySelector('.site-header .wrap');
  if (!header || header.querySelector('.lang-switch')) return;
  const sw = document.createElement('div');
  sw.className = 'lang-switch';
  sw.innerHTML = `
    <span data-lang="ru">RU</span>
    <span data-lang="uk">UA</span>
    <span data-lang="en">EN</span>`;
  header.appendChild(sw);
  sw.querySelectorAll('[data-lang]').forEach(el => {
    el.addEventListener('click', () => applyLang(el.dataset.lang));
  });
  updateLangSwitchAccess();
}

function updateLangSwitchAccess(){
  const isEditor = !!(window.EditorAuth && window.EditorAuth.isLoggedIn());
  const ruPill = document.querySelector('.lang-switch [data-lang="ru"]');
  if (ruPill) ruPill.style.display = isEditor ? '' : 'none';
}
window.updateLangSwitchAccess = updateLangSwitchAccess;

/* ---------------- first-visit language prompt (UA / EN only) ---------------- */
function mountLangPrompt(){
  if (localStorage.getItem('rb_lang_prompted')) return;
  if (document.getElementById('lang-prompt')) return;

  const el = document.createElement('div');
  el.id = 'lang-prompt';
  el.className = 'lang-prompt-overlay';
  el.innerHTML = `
    <div class="lang-prompt-card">
      <button class="lang-prompt-close" aria-label="Закрыть">✕</button>
      <div class="lang-prompt-title">Обери мову / Choose language</div>
      <div class="lang-prompt-options">
        <button data-pick="uk">Українська</button>
        <button data-pick="en">English</button>
      </div>
    </div>`;
  document.body.appendChild(el);

  const dismiss = () => {
    localStorage.setItem('rb_lang_prompted', '1');
    el.remove();
  };
  el.querySelector('.lang-prompt-close').addEventListener('click', dismiss);
  el.addEventListener('click', (e) => { if (e.target === el) dismiss(); });
  el.querySelectorAll('[data-pick]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.pick);
      dismiss();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mountLangSwitch();
  applyLang(getLang());
  mountLangPrompt();
  if (typeof editorAuthReady !== 'undefined') editorAuthReady.then(updateLangSwitchAccess);
});
