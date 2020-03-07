const pageSize = 3;
const firebaseUrl = 'https://elmet-88207.firebaseio.com/news.json';
const smallDevicesWidth = '768';
const fbLikeIframe= `<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FElmetWalbrzyska&width=112&layout=button&action=like&size=small&show_faces=false&share=true&height=65&appId" 
width="112" height="25" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" 
allow="encrypted-media"></iframe>`;
const googleMapIframe = `<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.8307515175266!2d21.019682115834428!3d52.173770579750055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471932c38d6e13fb%3A0x4dbc4cf13094c2cc!2sEl-Met.%20Artyku%C5%82y%20elektryczne%20i%20metalowe!5e0!3m2!1spl!2spl!4v1572109463099!5m2!1spl!2spl"
width="100%" title="Google map" allowfullscreen=""></iframe>`;
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

  addMobileEvents();
  addSafariActions();
  addIframes();
}, false);

function addIframes() {
  addIframe('social-section-container', fbLikeIframe);
  addIframe('contact-google-map', googleMapIframe);
}

function setHeightToContactImageBigImage() {
  const bigImageId = 'contact-images-big-image';
  const bigImageContainerId = 'contact-images-big-image-container';
  const bigImage = document.getElementById(bigImageId);
  const bigImageContainer = document.getElementById(bigImageContainerId);

  if (!bigImageContainer.style.minHeight) {
    bigImageContainer.style.minHeight = bigImage.offsetHeight + 'px';
  }
}

function addIframe(containerId, iframe) {
  document.getElementById(containerId).insertAdjacentHTML( 'beforeend', iframe);  
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
  productsContactElement.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement(contactElement);
    event.stopPropagation();
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
    let imageTopWrapper = path.find( x => x.classList && x.classList.contains('contact-image-gallery-border'));
    if (!imageTopWrapper) {
      event.stopPropagation();
      return;
    }

    setHeightToContactImageBigImage()

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