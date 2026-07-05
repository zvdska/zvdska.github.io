(function(){
  const header = document.querySelector('.site-header');
  if (!header) return;

  function applyOffset(){
    document.body.style.paddingTop = header.offsetHeight + 'px';
  }
  applyOffset();
  window.addEventListener('resize', applyOffset);

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll(){
    ticking = false;
    const y = window.scrollY;

    if (y <= 8){
      header.classList.remove('header-hidden');
    } else if (y > lastY){
      header.classList.add('header-hidden');    // скролл вниз — прячем
    } else if (y < lastY){
      header.classList.remove('header-hidden'); // скролл вверх — показываем
    }
    header.classList.toggle('header-scrolled', y > 8);
    lastY = y;
  }

  window.addEventListener('scroll', () => {
    if (!ticking){ ticking = true; requestAnimationFrame(onScroll); }
  }, { passive:true });
})();
