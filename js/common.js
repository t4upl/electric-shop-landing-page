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
  if (!element.classList.contains(blinkClass)) {
    element.classList.add(blinkClass);
    setTimeout(function() {
      element.classList.remove(blinkClass);
    }, 250);
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

function checkIfElementInViewport(element) {
  let checkedOffset = element.offsetTop;
  let isTopOnscreen = window.pageYOffset < checkedOffset && checkedOffset < window.pageYOffset + window.innerHeight;
  checkedOffset = element.offsetTop + element.offsetHeight;
  let isBottomOnscreen = window.pageYOffset < checkedOffset && checkedOffset < window.pageYOffset + window.innerHeight;
  return isTopOnscreen && isBottomOnscreen;
}

function getEventPath(event) {
  return event.path || (event.composedPath && event.composedPath());
}