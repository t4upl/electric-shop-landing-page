function addOnClickHideNavBar() {
  let navArrowContainerElement = document.getElementById("nav-arrow");
  let navElement = document.getElementById("navbar-mobile");
  navElement.style.maxHeight = navElement.scrollHeight + "px";

  navArrowContainerElement.addEventListener('click', () => {
    let content = navElement;
    if (content.style.maxHeight !== '0px'){
      content.style.maxHeight = '0px';
      navArrowContainerElement.classList.add('rotated');
      content.style.margin = "0";
      content.style.padding = "0";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      navArrowContainerElement.classList.remove('rotated');
      content.style.margin = "";
      content.style.padding = "";
    }
  });
}

function addOnScrollForStickyMenu() {
  let contactBannerElement = document.getElementById("contact-banner");
  window.addEventListener("scroll", () => {
    var contactBannerElementTop = contactBannerElement.offsetTop + contactBannerElement.offsetHeight;
    if (window.pageYOffset > contactBannerElementTop) {
      navContainerElement.style.position = 'fixed';
    } else {
      navContainerElement.style.position = 'relative';
    }
  });
}

function getActiveStickyMenu() {
  let stickyMenuId = "nav-container";
  if (isMobile) {
    stickyMenuId = "nav-container-mobile";
  }
  return document.getElementById(stickyMenuId);
}