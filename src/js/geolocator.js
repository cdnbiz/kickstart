/*!

Script: Geolocator
Author: Graham F. Scott
License: MIT
Version: 1.0;

*/

// Self-invoking function
(function(){

  // only proceed if the target form exists
  if(document.getElementById("mc_embed_signup")){

    "use strict";

    // Self-invoking function to execute the AJAX call
    // http://youmightnotneedjquery.com/#json

    (function(){
      var request = new XMLHttpRequest();

      // Self-run GeoIP service run on an AWS Lambda instance
      request.open("GET", "https://v4wc54uz93.execute-api.us-east-1.amazonaws.com/prod/geoip", true);
      request.onload = function(){
        if(request.status >= 200 && request.status < 400 ){

          // if the AJAX request succeeds, call the formulator function
          formulator(request.responseText);

        } else {
          // Request failed. We can live without this information
          return false;
          // console.error("The server responded but it returned an error. The error code was " + request.status);
        }
      };
      request.onerror = function(){
        // Request failed. We can live without this information
        return false;
        // console.error("There was a connection error of some sort");
      };

      request.send();
    })();

    // Function to format the returned data and prepare it for insertion
    var formulator = function(data){

      // Parse the returned ajax text as JSON
      data = JSON.parse(data);

      inserter("LONGITUDE", data.data.Location.Longitude);
      inserter("LATITUDE", data.data.Location.Latitude);
      inserter("CITY", data.data.City.Names.en);
      inserter("REGION", data.data.Subdivisions[0].IsoCode);
      inserter("COUNTRY", data.data.Country.IsoCode);

      // Iterate over the data object to retrieve keys and values for each one
  /*
      for ( var entry in data ) {

        // for each, call the function to insert the input into the form
        inserter(entry, data[entry]);

      }
  */
    };

    // Function to insert the hidden inputs with the values
    var inserter = function(key, val){

      var el = document.createElement("input");
            el.setAttribute("type", "hidden");
            el.setAttribute("name", key);
            el.setAttribute("value", val);

      document.getElementById("mc-embedded-subscribe-form").appendChild(el);

    };

  };

})();
