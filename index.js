document.addEventListener('DOMContentLoaded', function () {
  // DOM ready code
  console.log('DOM is ready');

  /** Update copyright date to current year */
  const currentYear = document.querySelector('#current-year');
  currentYear.innerHTML = new Date().getFullYear();

  /** Mega Menu + Hamburger - Open and Close - Active Class Toggle function */
  const hamburgerButton = document.querySelector('.btn-hamburger');
  const offCanvasMegaMenu = document.querySelector('.offcanvas-mega-menu');
  const offCanvasCircleExpand = document.querySelector(
    '.offcanvas-circle-expand'
  );
  const page = document.querySelector('.page');

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
    // offCanvasMegaMenu.classList.toggle('overflow-visible');
  };

  hamburgerButton.addEventListener('click', handleHamburgerButtonClick);

  /** Perspective Title - change font and weight per each new letter based on .skew-title-text-container elementToReplace class */
  const skewTitleTextContainer = document.querySelectorAll(
    '.skew-title-text-container'
  );

  skewTitleTextContainer.forEach((elementToReplace, i) => {
    const newHeader = document.createElement('h2'); // creates new header h2 element for replaceText letters
    newHeader.classList.add('skew-text-header');

    const replaceText = elementToReplace.innerText; // select each .replace-text element's inner text from DOM
    for (let i = 0; i < replaceText.length; i++) {
      // loop through each .replace-text inner text
      const letter = replaceText.charAt(i); // Each letter per element
      const span = document.createElement('span'); // create new span for each letter
      span.textContent = letter.toUpperCase(); // Uppercase each span with letter

      // Apply fonts and weights in sequence based on index
      const fonts = [
        ['agenda-extra-condensed', 500],
        ['agenda-extra-condensed', 600],
        ['agenda-condensed', 900],
        ['agenda', 800],
      ];

      if (i === 0 || i === 1) {
        span.style.fontFamily = fonts[0][0];
        span.style.fontWeight = fonts[0][1];
      }

      if (i === 2 || i === 3) {
        span.style.fontFamily = fonts[1][0];
        span.style.fontWeight = fonts[1][1];
      }

      if (i === 4 || i === 5) {
        span.style.fontFamily = fonts[2][0];
        span.style.fontWeight = fonts[2][1];
      }

      if (i === 6 || i >= 7) {
        span.style.fontFamily = fonts[3][0];
        span.style.fontWeight = fonts[3][1];
      }

      span.style.fontSize = '2.5rem';
      span.style.lineHeight = '2rem';
      span.setAttribute('aria-hidden', true);

      // Append span of skew title letters to respective elementToReplace
      elementToReplace.appendChild(span);
    }
  });

  //** Copy Hex color with class .copy-text to clipboard  */
  const copyText = document.querySelectorAll('.copy-text');
  for (const copied of copyText) {
    copied.onclick = function () {
      document.execCommand('copy'); // execCommand is deprecated but unsure of another method with similar execution
    };
    copied.addEventListener('copy', function (event) {
      event.preventDefault();
      const clickedText = event.target.textContent;

      // Update text to show as 'copied' if clicked once - HEX code has 7 characters
      if (clickedText.length < 8) {
        if (event.clipboardData) {
          event.clipboardData.setData('text/plain', copied.textContent);
        }
        event.target.textContent += ' copied';
      } else {
        // remove text of 'copied' if clicked twice and set clipboardData to only HEX code
        event.target.textContent = event.target.textContent.slice(0, -7);
        if (event.clipboardData) {
          event.clipboardData.setData('text/plain', event.target.textContent);
        }

        console.log(
          event.clipboardData.getData('text'),
          'color copied to clipboard'
        );
      }
    });
  }
});
