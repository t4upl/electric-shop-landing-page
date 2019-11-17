const pageSize = 3;
const firebaseUrl = 'https://elmet-88207.firebaseio.com/news.json';
const smallDevicesWidth = '768';
let news = null; 
let newsOnSiteCounter = 0;
let newsContentElement = null;
let newsLoadMoreElement = null;
let contactBigImageElement = null;
let navContainerElement = null;
let isMobile = null;
let isSafari = null;


document.addEventListener('DOMContentLoaded', function() {
  setGlobal();
  addOnScrollForStickyMenu();
  addOnClickGoToSectionEvents();
  
  initializeNews();
  addOnClickEventToProductContent();
  addOnClickEventToContactImages();
  centerImageThumbnailsInProduct();

  addMobileEvents();
  addSafariActions();
}, false);

function centerImageThumbnailsInProduct() {
  let images = Array.from(document.querySelectorAll("#contact-images-wrapper img"));
  images.forEach(img => {
    img.addEventListener('load', function() {
      let box = findInSelfOrAncestors(img, (img) => img.classList.contains('contact-image-box'));
      let boxBoundryBox = box.getBoundingClientRect();
      let imgBoundry = img.getBoundingClientRect();
      let distanceToMoveImageToLeft = (imgBoundry.width - boxBoundryBox.width) /2;
      if (distanceToMoveImageToLeft < 0) {
        return;
      }
      let transformValue = 'translateX(-' + distanceToMoveImageToLeft + 'px)';
      img.style.transform = transformValue;
    })    
  }); 
}

function findInSelfOrAncestors(element, predicate) {
  if (predicate(element)) {
    return element;
  } else {
    return findInSelfOrAncestors(element.parentElement, predicate);
  }
}

function addSafariActions() {
  if (isSafari) {
    replaceWebpWithJp2InContactImages();
  }
}

function replaceWebpWithJp2InContactImages() {
  let images = Array.from(document.querySelectorAll("#contact-images-wrapper img"));
  let contactImagesBigImage = document.getElementById('contact-images-big-image');
  images.push(contactImagesBigImage);
  images.forEach(img => img.setAttribute("srcset", img.getAttribute("srcset").replace(new RegExp('webp', 'ig'), 'jp2')))
}

function setGlobal() {
  isMobile = getIsMobile();
  navContainerElement = getActiveStickyMenu();
  contactBigImageElement = document.getElementById("contact-images-big-image");
  isSafari = getIsSafari();
}

function getIsSafari() {
  return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
}

function addMobileEvents() {
  if (isMobile) {
    addOnClickHideNavBar();
  }
}

function addOnClickGoToSectionEvents() {
  addOnClickGoToSectionEventsNavbar();
  addOnClickGoToSectionEventsNavbarMobile();
  addOnClickGoToSectionEventsProductsContact();
}

function addOnClickGoToSectionEventsNavbar() {
  if (!isMobile) {
    addOnClickGoToSectionEventsNavbarGeneric("nav-buttons");
  }
}

function addOnClickGoToSectionEventsNavbarMobile() {
  if (isMobile) {
    addOnClickGoToSectionEventsNavbarGeneric("nav-buttons-mobile");
  }
}

function addOnClickGoToSectionEventsNavbarGeneric(navButtonsId) {
  let navBarElement = document.getElementById(navButtonsId);
  let aboutUsElement = document.getElementById("about-us");
  let newsElement = document.getElementById("news");
  let productsElement = document.getElementById("products");
  let contactElement = document.getElementById("contact");
  
  navBarElement.addEventListener("click", event => {
    event.preventDefault();
    let clickedElemenet = getClosestAncestorsWithAttributeFromPath('id', getEventPath(event));
    let clickedElementId = clickedElemenet.getAttribute('id');
    if (!clickedElementId) {
      return;
    }

    clickedElementId = clickedElementId.replace('-mobile', '');
    let sectionToScrollTo = null;
    switch (clickedElementId) {
      case 'nav-button-about-us':
        sectionToScrollTo = aboutUsElement;
        break;
      case 'nav-button-news':
        sectionToScrollTo = newsElement;
        break;
      case 'nav-button-products':
        sectionToScrollTo = productsElement;
        break;
      case 'nav-button-contact':
        sectionToScrollTo = contactElement;
        break;
      default:
        return;
    }
    scrollToElement(sectionToScrollTo);

    if (isMobile) {
      blink(clickedElemenet, "navbar-tapped");
    }
    event.stopPropagation();
  });
}

function getClosestAncestorsWithAttributeFromPath(attribute, path) {
  return path.find(x => x.getAttribute(attribute) != null);
}

function addOnClickGoToSectionEventsProductsContact() {
  let productsContactElement = document.getElementById("products-contact");
  let contactElement = document.getElementById("contact");
  productsContactElement.addEventListener("click", () => {
    scrollToElement(contactElement);
  });

}

function addOnClickEventToProductContent() {
  let productContentElement = document.getElementById("products-sections-wrapper");
  let productsElectrialListElement = document.getElementById("products-electrial-list");
  let productsMetalListElement = document.getElementById("products-metal-list");
  let productsBuildingListElement = document.getElementById("products-building-list"); 

  productContentElement.addEventListener("click", function(event) {
    let clickedElementId = event.target.getAttribute('id');
    let sectionToBeToggled = null;

    switch (clickedElementId) {
      case 'products-electrial-title':
        sectionToBeToggled = productsElectrialListElement;
        break;
      case 'products-metal-title':
        sectionToBeToggled = productsMetalListElement;
        break;
      case 'products-building-title':
        sectionToBeToggled = productsBuildingListElement;
        break;
      default:
        return;
    }

    if (sectionToBeToggled.style.maxHeight){
      sectionToBeToggled.style.maxHeight = null;
      sectionToBeToggled.style.margin = "";
    } else {
      sectionToBeToggled.style.maxHeight = sectionToBeToggled.scrollHeight + "px";
      sectionToBeToggled.style.margin = "0.5em 0";
    } 
  });
}

function addOnClickEventToContactImages() {
  let contactImagesWrapperElement = document.getElementById("contact-images-wrapper");
  contactImagesWrapperElement.addEventListener('click', event => {
    let path = getEventPath(event);
    let imageTopWrapper = path.find( x => x.classList && x.classList.contains('contact-image-border'));
    if (!imageTopWrapper) {
      event.stopPropagation();
      return;
    }

    let img = imageTopWrapper.querySelector('img');
    if (img) {
      if (img.getAttribute('src')) {
        contactBigImageElement.setAttribute('src', img.getAttribute('src'));
      }
      if (img.getAttribute('srcset')) {
        contactBigImageElement.setAttribute('srcset', img.getAttribute('srcset'));
      }
    }
    
    blink(imageTopWrapper, 'contact-image-border-tapped');
    if (!checkIfElementInViewport(contactBigImageElement)) {
      scrollToElement(contactBigImageElement);
    }
    event.stopPropagation();
  });
}