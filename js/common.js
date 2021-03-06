function getDateString(date) {
  let dd = date.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }

  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }

  return dd + "-" + mm + "-" + date.getFullYear();
}

function blink(element, blinkClass) {
  let blinkTime = 300;
  if (!element.classList.contains(blinkClass)) {
    element.classList.add(blinkClass);
    setTimeout(function() {
      element.classList.remove(blinkClass);
    }, blinkTime);
  }
}

function getIsMobile() {
  return parseInt(document.documentElement.clientWidth, 10) <= smallDevicesWidth;
}

function scrollToElement(domElement) {
  let yScrollPosition = domElement.offsetTop - navContainerElement.offsetHeight;
  let marginTop = window.getComputedStyle(domElement).marginTop;
  if (marginTop.endsWith('px')) {
    marginTop = marginTop.substr(0, marginTop.length - 2);
    yScrollPosition = yScrollPosition - marginTop;
  }

  if (window.getComputedStyle(navContainerElement).position === 'relative') {
    yScrollPosition = yScrollPosition - navContainerElement.offsetHeight;
  }
  window.scroll({
    'left': window.scrollX,
    'top': yScrollPosition,
    'behavior': 'smooth'
  });
}

function checkIfEnoughHeightOfElementInViewport(element, elementHeightProcent) {
  checkedOffset = element.offsetTop + element.offsetHeight * elementHeightProcent;
  let isProcentOfElementHeightOnscreen = window.pageYOffset < checkedOffset && checkedOffset < window.pageYOffset + window.innerHeight;
  return isProcentOfElementHeightOnscreen;
}

function getEventPath(event) {
  return event.path || (event.composedPath && event.composedPath());
}