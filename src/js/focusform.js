/*
  
  On page load, focus the cursor on the email input so user can type instantly
  
*/

var emailInput = document.getElementById("mce-EMAIL");

// Had to be wrapped in an if statement to prevent failure when form not present
if(emailInput){
  emailInput.focus();
}