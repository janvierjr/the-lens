document.addEventListener('DOMContentLoaded', function () {
  // DOM ready code
  console.log('DOM is ready')

  const hamburgerButton = document.querySelector('.btn-hamburger');
  const offCanvasMegaMenu = document.querySelector('.offcanvas-mega-menu');
  const offCanvasCircleExpand = document.querySelector('.offcanvas-circle-expand');
  const page = document.querySelector('.page');

  /** Mega Menu + Hamburger - Open and Close - Active Class Toggle function */
  const handleHamburgerButtonClick = (e) => {
    e.preventDefault();
    offCanvasCircleExpand.classList.toggle('active');
    offCanvasMegaMenu.classList.toggle('active');
    hamburgerButton.classList.toggle('active');

    // update Aria-expanded Attribute
    offCanvasMegaMenu.getAttribute('aria-expanded') === 'true'
      ? offCanvasMegaMenu.setAttribute('aria-expanded', 'false')
      : offCanvasMegaMenu.setAttribute('aria-expanded', 'true');

    // prevents page scroll with Mega Menu active / open
    page.classList.toggle('overflow-hidden');
  };

  hamburgerButton.addEventListener('click', handleHamburgerButtonClick);
});