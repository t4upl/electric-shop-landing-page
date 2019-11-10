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
      element.classList.add(blinkClass);
    }, 500);
  }
}

function getIsMobile() {
  return parseInt(document.documentElement.clientWidth, 10) <= smallDevicesWidth;
}
