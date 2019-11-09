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


document.addEventListener('DOMContentLoaded', function() {
  setGlobal();
  addOnScrollForStickyMenu();
  addOnClickGoToSectionEvents();
  
  initializeNews();
  addOnClickEventToProductContent();
  addOnClickEventToContactImages();

  addMobileEvents();
}, false);

function setGlobal() {
  isMobile = parseInt(document.documentElement.clientWidth, 10) <= smallDevicesWidth;
  navContainerElement = getActiveStickyMenu();
}

function addMobileEvents() {
  if (isMobile) {
    addOnClickHideNavBar();
  }
}

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
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      navArrowContainerElement.classList.remove('rotated');
      content.style.margin = "";
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
    
    let clickedElementId = event.target.getAttribute('id');
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
    event.stopPropagation();
  });
}

function addOnClickGoToSectionEventsProductsContact() {
  let productsContactElement = document.getElementById("products-contact");
  let contactElement = document.getElementById("contact");
  productsContactElement.addEventListener("click", () => {
    scrollToElement(contactElement);
  });

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
  window.scroll(window.scrollX, yScrollPosition);
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

function initializeNews() {
  newsContentElement = document.getElementById("news-content");
  newsLoadMoreElement = document.getElementById("news-load-more");

  if (news == null) {
    let theUrl = firebaseUrl;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true);
    xmlHttp.onreadystatechange = onFirebaseResponse;
    xmlHttp.send(null);
  }

  newsLoadMoreElement.addEventListener('click', addNewsToDom);
}

function onFirebaseResponse(e) {
  req = e.srcElement;
  if (req.readyState == 4) {
    if(req.status == 200) {
      response = req.response;
      
      if (response == null) {
        news  = [];
        return;
      }

      let newsArray =  JSON.parse(req.responseText);
      news = getOrderedNewsAsArray(newsArray);
      addNewsToDom();
    }
    else {
      console.log('Something went wrong with firebase');
      news = [];
      addNewsToDom();
    }
  }
};

function getOrderedNewsAsArray(newsArray) {
  let news = [];
  Object.keys(newsArray).forEach( key => 
    {
      let date = key;
      let content = newsArray[date];

      let split = date.split('-');

      if (split.length != 3 || content == null || content.length == 0) {
        return;
      }
      let dateObject = new Date(split[2] + '-' + split[1] + '-' + split[0]);

      if (dateObject == 'Invalid Date') {
        console.log('Date: ' + dateObject + ' is invalid');
        return;
      }
      news.push(new News(dateObject, content));
    });

    news = news.sort((a, b) => {
      return (a['date'].getTime() > b['date'].getTime()) ? 1 : -1;
    });
      
    return news;
}

class News {
  constructor(date, content) {
    this.date = date;
    this.content = content;
  }
}

function addNewsToDom() {
  if (news.length == 0) {
    const noNewsText = 'Brak wiadomości.';
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(noNewsText));
    newsContentElement.appendChild(div);
  } else {
    for (i = 0; i < pageSize; i++) {
      if (newsOnSiteCounter >= news.length) {
        break;
      }

      let newsEntry = news[newsOnSiteCounter];
      let date = getDateString(newsEntry['date']);
      let content = newsEntry['content'];


      let div = document.createElement("div");
      let divDate = document.createElement("div");
      let divContent = document.createElement("div");
      let hr = document.createElement("hr");

      div.appendChild(divDate);
      div.appendChild(divContent);
      div.appendChild(hr);
      divDate.appendChild(document.createTextNode(date));
      divContent.appendChild(document.createTextNode(content));

      div.className += 'news-item';
      divDate.className += ' news-date';

      newsContentElement.appendChild(div);
      newsOnSiteCounter++;
    }

    newsLoadMoreElement.classList.add("hidden");
    if (news.length > newsOnSiteCounter) {
      newsLoadMoreElement.classList.remove("hidden");
    }
  }
}

function getDateString(date) {
  let dd = date.getDate();
  if (dd < 10) {
    dd = '0' + dd;
  }

  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = '0' + mm;
  }

  return dd + '-' + mm + '-' + date.getFullYear();
}

function addOnClickEventToContactImages() {
  contactBigImageElement = document.getElementById("contact-images-big-image");
  let contactImagesWrapperElement = document.getElementById("contact-images-wrapper");
  contactImagesWrapperElement.addEventListener('click', event => {
    let target = event.target;
    if (target.getAttribute('id') == null) {
      contactBigImageElement.setAttribute('src', target.getAttribute('src'));
      event.stopPropagation();
    }
  });


}