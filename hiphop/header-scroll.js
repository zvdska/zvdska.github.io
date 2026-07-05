(function(){
  const header = document.querySelector('.site-header');
  if (!header) return;

  let bannerMode = false;

  function applyOffset(){
    document.body.style.paddingTop = bannerMode ? '0px' : header.offsetHeight + 'px';
  }

  // Вызывается со страницы, когда на ней подтвердились баннеры (см. index.html)
  window.enableBannerHeaderOverlay = function(){
    bannerMode = window.innerWidth <= 640;
    applyOffset();
    onScroll();
  };

  applyOffset();
  window.addEventListener('resize', () => {
    bannerMode = bannerMode && window.innerWidth <= 640;
    applyOffset();
  });

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll(){
    ticking = false;
    const y = window.scrollY;

    // прозрачность/цвет шапки — зависит от того, ещё ли мы над баннером
    if (bannerMode){
      const slider = document.querySelector('.banner-slider');
      const bh = slider ? slider.getBoundingClientRect().height : 0;
      header.classList.toggle('header-transparent', y < Math.max(bh - 40, 0));
      header.classList.toggle('header-scrolled', y >= Math.max(bh - 40, 0));
    }

    // прятать/показывать при скролле — работает всегда, в том числе поверх баннера
    if (y <= 8){
      header.classList.remove('header-hidden');
    } else if (y > lastY){
      header.classList.add('header-hidden');    // скролл вниз — прячем
    } else if (y < lastY){
      header.classList.remove('header-hidden'); // скролл вверх — показываем
    }
    if (!bannerMode) header.classList.toggle('header-scrolled', y > 8);
    lastY = y;
  }

  window.addEventListener('scroll', () => {
    if (!ticking){ ticking = true; requestAnimationFrame(onScroll); }
  }, { passive:true });
})();
