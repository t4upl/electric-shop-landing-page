const pageSize = 3;
let news = null; 
let newsOnSiteCounter = 0;
let newsContentElement = null;
let newsLoadMoreElement = null;


document.addEventListener('DOMContentLoaded', function() {
  initializeNews();
  addOnClickEventToProductContent();
  
}, false);

function addOnClickEventToProductContent() {
  let productContentElement = document.getElementById("products-sections-wrapper");
  let productsElectrialListElement = document.getElementById("products-electrial-list");
  let productsMetalListElement = document.getElementById("products-metal-list");
  let productsBuildingListElement = document.getElementById("products-building-list"); 

  productContentElement.addEventListener("click", function(event) {
    console.log(event.target);

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

    if (sectionToBeToggled.classList.contains('hidden')) {
      sectionToBeToggled.classList.remove('hidden');
    } else {
      sectionToBeToggled.classList.add('hidden');
    }
  });
}

function initializeNews() {
  newsContentElement = document.getElementById("news-content");
  newsLoadMoreElement = document.getElementById("news-load-more");

  if (news == null) {
    let theUrl = 'https://elmet-8b418.firebaseio.com/news.json';
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
      console.log(req.response);
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

function News(date, content) {
  this.date = date;
  this.content = content;
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