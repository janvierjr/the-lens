document.addEventListener('DOMContentLoaded', function () {
  // DOM ready code
  console.log('DOM is ready');

  /** Update copyright date to current year */
  const currentYear = document.querySelector('#current-year');
  currentYear.innerHTML = new Date().getFullYear();

  /** 0. Mega Menu + Hamburger - Open and Close - Active Class Toggle function */
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
  // 0. function execution on click
  hamburgerButton.addEventListener('click', handleHamburgerButtonClick);

  //** With the next two functions, one can add the class '.replace-title' to any header element and each letter of that header will be replaced with a span styled to resemble a perspective skew. A parent element with the class of '.skew-title-text-contain' is required for the perspective skew styles to apply. Function 1. handleReplaceTitleParentChange will create the parent element if a header element with a class of '.replace-text' is a child of '.skew-title-text-contain'. Function 2. handleCreateSkewTextTitles will apply skew text styles via the parent: '.skew-title-text-contain. */

  /** 1. Find .replace-title class and give parent of .skew-title-text-contain if without */
  function handleReplaceTitleParentChange() {
    const replaceTitleAll = document.querySelectorAll('.replace-title');
    replaceTitleAll.forEach((replaceTitle, i) => {
      // check if current .replace-title element has a parent with a class of .skew-title-text-contain (this will create skew text autom)
      if (
        !replaceTitle.parentElement.classList.contains(
          'skew-title-text-contain'
        )
      ) {
        // `replaceTitle` to be wrapped by new Parent wrapper with class .skew-title-text-contain
        let parent = replaceTitle.parentNode;
        let wrapper = document.createElement('div');
        wrapper.classList.add('skew-title-text-contain');

        parent.replaceChild(wrapper, replaceTitle);
        wrapper.appendChild(replaceTitle);
      }
    });
  }
  // 1. execute function
  handleReplaceTitleParentChange();

  /** 2. Perspective Title - change font and weight per each new letter based on .skew-title-text-container elementToReplace class */
  function handleCreateSkewTextTitles() {
    const skewTitleTextContainer = document.querySelectorAll(
      '.skew-title-text-contain'
    );
    skewTitleTextContainer.forEach((elementToReplace, i) => {
      const replaceText = elementToReplace.innerText; // select each .replace-text element's inner text from DOM
      for (let i = 0; i < replaceText.length; i++) {
        // loop through each .replace-text inner text
        const letter = replaceText.charAt(i);
        // create new span for with text of each letter uppercase
        const span = document.createElement('span');
        span.textContent = letter.toUpperCase();

        // Apply fonts and weights in indexed sequence
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
  }
  // 2. execute function
  handleCreateSkewTextTitles();

  //** 3. Copy Hex color with class .copy-text to clipboard  */
  function handleClickCopyText() {
    const copyText = document.querySelectorAll('.copy-text');
    for (let copied of copyText) {
      copied.onclick = function () {
        document.execCommand('copy'); // execCommand is deprecated but unsure of another method with similar execution
      };
      copied.addEventListener('copy', function (event) {
        event.preventDefault();
        const clickedText = event.target.textContent;

        // Update text to show as 'copied' if clicked once - HEX code has 7 characters
        if (clickedText.length === 7) {
          if (event.clipboardData) {
            // clip copy Hex Code Text
            event.clipboardData.setData('text/plain', copied.textContent);
          }
          // append ' copied' to read '<Hex Code> copied'
          event.target.textContent += ' copied';

          // if .copy-text is 'COPY LINK' - i.e. copy article button text
        } else if (clickedText.toUpperCase() === 'COPY LINK') {
          if (event.clipboardData) {
            // clip copy parent custom attribute 'data-href-copied' - i.e. url of article
            event.clipboardData.setData(
              'text/plain',
              this.parentElement.getAttribute('data-href-copied')
            );
            // append ✔
            event.target.innerHTML += ` &#10004;`;
          }
          // if .copy-text is 'COPY LINK ✔' - i.e. copy article button text
        } else if (clickedText.toUpperCase() === 'COPY LINK ✔') {
          // remove a space and ✔
          event.target.textContent = event.target.innerHTML.slice(0, -2);
          if (event.clipboardData) {
            // clip copy parent custom attribute 'data-href-copied' - i.e. url of article
            event.clipboardData.setData(
              'text/plain',
              this.parentElement.getAttribute('data-href-copied')
            );
          }
        } else {
          // remove text of 'copied' if clicked twice and set clipboardData to only HEX code
          event.target.textContent = event.target.textContent.slice(0, -7);
          if (event.clipboardData) {
            event.clipboardData.setData('text/plain', event.target.textContent);
          }
        }
        console.log(
          event.clipboardData.getData('text'),
          ' copied to clipboard'
        );
      });
    }
  }
  // 3. execute function
  handleClickCopyText();
});
