let news = null; 
let newsOnSiteCounter = 0;


document.addEventListener('DOMContentLoaded', function() {

  initializeNews();

}, false);

function initializeNews() {

  if (news == null) {
    let theUrl = 'https://elmet-8b418.firebaseio.com/news.json';


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true);
    // xmlHttp.onreadystatechange = function(e) {console.log(e)};
    xmlHttp.onreadystatechange = onFirebaseResponse;
    xmlHttp.send(null);

  }
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
      debugger;

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

