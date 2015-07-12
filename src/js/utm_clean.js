/*!

Script: UTM Scrubber
Author: Graham F. Scott
License: MIT
Version: 1.1;

*/

(function(){ 
  
  // use strict
  "use strict";
  
  // do it as soon as possible
  window.onload = function(){
    
    // vars
    var url, path, params;
        
        // get various URL components
        url = window.location;
        
        // if there are no UTM tags present, return false
        if ( url.search.search(/utm_/) !== -1) {
        
          path = url.pathname; // pathname includes everything after the domain, but without params
          params = url.search.split("&"); // get the params and immediately split into an array
            
          // remove the leading "?" from the params string, which will be on the first array pair
          // Split, discard the first item, which will always be "?", then re-set the first params item to the remaining string
          var tmp = params[0].split("?");
          params[0] = tmp[1];
          
          // iterate over the params array, fetching the key:value pairs for each          
  
          
          for ( var i = 0; i < params.length; i++ ) {
          	
            var param = params[i];
                param = param.split("="); // split at the "=" to get a two-item array
            
            // that two-item array always maps to key:val
            var key = param[0],
                val = param[1];    
            
            // find the hidden input named for the UTM tags we want, and change the value
            var field = document.getElementById(key);
                field.setAttribute("value", val);
          
          	
        	}
               
        // Once finished that loop, use history.replaceState to remove the UTM tags from the URL so they don't look all ugly to civilians
        // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
        // replaceState takes three arguments; the first two are unnecessary in this situation.
        window.history.replaceState(null, "", path);
        
        }
        
	};
  
})();