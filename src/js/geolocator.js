/*!

Script: Geolocator
Author: Graham F. Scott
License: MIT
Version: 1.0;

*/

// Self-invoking function
(function(){
  
  "use strict";
  
  // Self-invoking function to execute the AJAX call
  // http://youmightnotneedjquery.com/#json
  
  (function(){
    var request = new XMLHttpRequest();
    
    // Free GeoIP server. See Telize.com for details
    request.open("GET", "https://telize.com/geoip", true);
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
    
    inserter("LONGITUDE", data.longitude);
    inserter("LATITUDE", data.latitude);
    inserter("CITY", data.city);
    inserter("REGION", data.region);
    inserter("COUNTRY", data.country_code);
    
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
      
    document.getElementById("theform").appendChild(el);
    
  };
  
})();