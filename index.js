document.addEventListener('DOMContentLoaded', function () {
  // DOM ready code
  console.log('DOM is ready')

  /** Mega Menu + Hamburger - Open and Close - Active Class Toggle */
  const hamburgerButton = document.querySelector('.btn-hamburger');
  const offCanvasMegaMenu = document.querySelector('.offcanvas-mega-menu');
  const offCanvasCircleExpand = document.querySelector('.offcanvas-circle-expand');
  const page = document.querySelector('.page');

  hamburgerButton.addEventListener('click', () => {
    offCanvasCircleExpand.classList.toggle('active');
    offCanvasMegaMenu.classList.toggle('active');
    hamburgerButton.classList.toggle('active');

    // prevents page scroll with Mega Menu active / open
    page.classList.toggle('overflow-hidden');
  });

});