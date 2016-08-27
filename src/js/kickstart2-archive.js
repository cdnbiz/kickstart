// get modern!
"use strict";

// Declaring global variables off the top just for the hell of it
var init,
    query,
    fetch,
    prepare,
    layout,
    dateFormat;

// Mailchimp provides an RSS feed of recent campaign mailings:
// http://us10.campaign-archive2.com/feed?u=ebf3e41c7fc04417e82e6e1d2&id=34bbc0b261
// If've found that rss feed to be unreliable so we mirror it with Feedburner:
// http://feeds.feedburner.com/VxwpSGUxm83oMeiSlUusI7FpGUrXzUeIQ6H9tVc182Y73OdGApGcIljn3AIiDoJ
// We use a YQL query to fetch that RSS feed as JSON:
// It fetches the one most recently sent campaign, and passes us the subject line, the URL, and the pubDate
// http://developer.yahoo.com/yql/console/?q=select%20title%2Clink%2CpubDate%20from%20rss%20where%20url%3D%22http%3A%2F%2Fus10.campaign-archive1.com%2Ffeed%3Fu%3Debf3e41c7fc04417e82e6e1d2%26id%3D34bbc0b261%22%20limit%201

query = "https://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20link%2C%20pubDate%20from%20rss%20where%20url%3D%22http%3A%2F%2Ffeeds.feedburner.com%2FVxwpSGUxm83oMeiSlUusI7FpGUrXzUeIQ6H9tVc182Y73OdGApGcIljn3AIiDoJ%22%20limit%201&format=json&callback=";

// FUNCTION: fetch
// Ajax function to get the data
fetch = function(){


  var request = new XMLHttpRequest();
  request.open("GET", query, true);

  request.onload = function(){
    if ( request.status >= 200 && request.status < 400 ) {
      var data = JSON.parse(request.responseText);

      // pass newsletter data to the prepare function
      prepare(data);

    } else {
      // Server responded but something else went wrong
    }
  };

  request.onerror = function(){
    // there was a connection error of some sort
    console.error("YQL server failed to respond");
  }

  request.send();

};


// FUNCTION: prepare
// Accepts the newsletter data and performs actions on it to prepare it for output
prepare = function(data){

  var newsletter = data.query.results.item;
  newsletter.date = dateFormat(newsletter.pubDate);

  layout(newsletter);

};

// FUNCTION dateFormat
// accepts an incoming date and outputs a nicely formatted string.
dateFormat = function(date){

  var epoch = new Date(date);
  var formatted = {};
  var day = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  formatted.day = day[epoch.getDay()];
  formatted.month = month[epoch.getMonth()];
  formatted.date = epoch.getDate();
  formatted.year = epoch.getFullYear();

  return formatted.day + ", " + formatted.month + " " + formatted.date + ", " + formatted.year;

};

// FUNCTION layout
// Takes the prepped newsletter data and injects it into the page.
layout = function( data ){

  var newsletter = data;
  var wrap = document.querySelector(".Wrap-latest");

  var linkEl = document.createElement("a");
  var hedEl = document.createElement("h1");
  var dateEl = document.createElement("p");
  var buttonEl = document.createElement("a");

  linkEl.setAttribute("href", newsletter.link);
  linkEl.setAttribute("title", newsletter.title);
  linkEl.setAttribute("target", "_blank");
  linkEl.classList.add("Latest-link");

  buttonEl.setAttribute("href", newsletter.link);
  buttonEl.setAttribute("title", newsletter.title);
  buttonEl.setAttribute("target", "_blank");
  buttonEl.classList.add("Latest-button");
  buttonEl.innerHTML = "Read the latest edition »";

  hedEl.innerHTML = newsletter.title;
  hedEl.classList.add("Latest-hed");

  linkEl.appendChild(hedEl);

  dateEl.innerHTML = newsletter.date;
  dateEl.classList.add("Latest-date");

  wrap.appendChild(dateEl);
  wrap.appendChild(linkEl);
  wrap.appendChild(buttonEl);

  wrap.classList.remove("do-not-show");


}



// FUCNTION: init
// Init function
init = (function(){

  fetch(query);

})();
