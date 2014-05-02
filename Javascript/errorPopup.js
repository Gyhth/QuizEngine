$(function() {
    $("body").append('<div id="errorPopUp"></div>');
    $errorPopup = $("#errorPopUp");
    $errorPopup.hide();
    errorDisplayed = false;
    errorFirstDisplay = true;
});

function errorPopUp(errors, animationSpeed) {
     if (!errorDisplayed) {
          var errorCount = errors.length;
          $errorPopup.append("<h1>Errors</h1>");
          $errorPopup.append("<ul>");
          for (var i = 0; i < errorCount; i++) {
               $errorPopup.append("<li>"+errors[i]+"</li>");
          }
          $errorPopup.append("</ul>");
          $errorPopup.append('<input type="button" value="Ok" class="errorOkay js-styleButton" />');    
          $(".errorOkay").on("click", function(event) {
                $errorPopup.fadeToggle(animationSpeed, "swing", function() { $errorPopup.empty(); });   
                errorDisplayed = false;
          });
          $("body").keypress(function (e) {
               if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    if (errorDisplayed) {
                         $('.errorOkay').click();
                         return false;
                    }
               } 
               else {
                    return true;
               }
          });
          $errorPopup.fadeToggle(animationSpeed);
          errorDisplayed = true;
     }
}
