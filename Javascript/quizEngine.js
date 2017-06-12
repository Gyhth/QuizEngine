function question(tickall, question, answers, answerText, picture, backenabled) {
     this.tickall = tickall;
     this.question = question;
     this.answers = answers;
     this.answerText = answerText;
     this.picture = picture;
	 this.backbutton = backenabled;
}

function answer(answerText, correct) {
     this.answerText = answerText;
     this.correct = correct;
}

questions = new Array();
answersOne = new Array();
answersOne.push(new answer("Yes", true));
answersOne.push(new answer("No", false));
questions.push(new question(false, "The application is working?", answersOne, "Yes, the application is working.", null, false));

answersTwo = new Array();
answersTwo.push(new answer("Checkbox One", true));
answersTwo.push(new answer("Checkbox Two", true));
answersTwo.push(new answer("Checkbox Three", true));
questions.push(new question(true, "Example of Checkboxes.", answersTwo, "To get this correct, you needed to select all the values.", null, false));

correctAnswers = 0;
$question = $("#question");
$content = $("#content");
animationSpeed = 500;

$(function() {
  var quizEngine = new quizEngineClass();
     $("body").append('<div id="PopUp"></div>');
     $Popup = $("#PopUp");
     $Popup.hide();
     questionNumber = 0;
     quizEngine.displayIntro();
     jsKeyboard.init("virtualKeyboard");
});

var quizEngineClass = function(){};

quizEngineClass.prototype = {

displayQuestion: function(number) {
     $content.empty();
     $content.append("<div id='question'>"+questions[number].question+"</div>");
     $question.text(questions[number].question);
     if (!questions[number].tickall) {
          for (i=0; i < questions[number].answers.length; i++) {
               answerNumber = i+1;
               if (answerNumber % 2 && answerNumber < questions[number].answers.length) {
                    floatClass = "css-clsFloatLeft";
               }
               else if (answerNumber % 2 && answerNumber == questions[number].answers.length) {
                    floatClass = "css-clsCenter";
               }
               else {
                    floatClass = "css-clsFloatRight";
               }
               buttonAnswer = "btnAnswer" + i;
               $content.append("<div id='answer"+i+"' class='"+floatClass+"'><input type='button' id='"+buttonAnswer+"' value='"+questions[number].answers[i].answerText+"' class='js-styleButton css-answerbtn' /></div>");
               $("#"+buttonAnswer).click(function() { checkAnswer(this.id) });
          }
     }
     else {
       $content.append("<div id='tickAll'></div>");
       $tickAllDiv = $("#tickAll");
       for (i=0; i < questions[number].answers.length; i++) {
            tickAnswer = "chkAnswer" + i;
            $tickAllDiv.append("<label class='css-checkboxLabel'><input type='checkbox' id='"+tickAnswer+"' value='"+questions[number].answers[i].answerText+"'/>"+questions[number].answers[i].answerText+"</label>");
       }
       $tickAllDiv.append("<input type='button' id='btnSubmit' value='Submit Answer' class='js-styleButton css-tickSubmit' />");
       $("#btnSubmit").click(function () { checkTickAnswers(); });
     }
},

displayIntro: function() {
     correctAnswers = 0;
     $firstName = null;
     $lastName = null;
     $email = null;
     $optIn = null;
     $content.empty();
     $content.append("<div id='question' class='css-introDivision'><input type='button' id='btnStart' class='js-styleButton css-startQuizBtn' value='Start The Quiz!' /></div>");
     $("#btnStart").click(function() { displayQuestion(0); });
},

checkAnswer: function(selectedInput) {
          index = selectedInput.replace("btnAnswer", "");
          $("#content input").prop('disabled', 'disabled');
          Popup(questions[questionNumber].answers[index].correct, questions[questionNumber].answerText, animationSpeed);
},

checkTickAnswers: function() {
     var selected = new Array();
     var answers = new Array();
     var missedAnswers = new Array();
     var correct = true;
     $("#content input").prop('disabled', 'disabled');
     $("input:checked").each(function() {
          var id = parseInt(this.id.replace("chkAnswer", ""));
          selected.push(id);
     });
     for (i = 0; i < questions[questionNumber].answers.length; i++) {
          if (questions[questionNumber].answers[i].correct) {
               answers.push(i);
          }
     }
     missedAnswers = $.grep(answers, function(el){return $.inArray(el, selected) == -1});
     if (missedAnswers.length > 0) {
          correct = false;
     }
     Popup(correct, questions[questionNumber].answerText, animationSpeed);
},

Popup: function (correct, text, animationSpeed) {
     if (correct) {
          $Popup.append("<h1 class='css-correctHeader'>Correct</h1>");
          correctAnswers++;
     }
     else {
          $Popup.append("<h1 class='css-incorrectHeader'>Incorrect...</h1>");
     }
          if (questions[questionNumber].picture !== null) {
               $Popup.append("<p class='css-pictureParagraph'>");
               $Popup.append("<img src='"+questions[questionNumber].picture+"' class='css-answerImage' />");
               $Popup.append("</p>");
          }
          if (!correct) {
               $Popup.append("<p>");
               $Popup.append(text);
               $Popup.append("</p>");
          }
          $Popup.append('<input type="button" value="Next Question" class="css-nextQuestion js-styleButton js-nextQuestion" />');
          $(".js-nextQuestion").on("click", function(event) {
                $(this).siblings().andSelf().prop('disabled', 'disabled');
                $Popup.fadeToggle(animationSpeed, "swing", function() { $Popup.empty(); });
                questionNumber++;
                if (questionNumber < questions.length) {
                     displayQuestion(questionNumber);
                }
                else {
                     displayEndingPage();
                }
          });
		  if (questions[questionNumber].backbutton) {
               $Popup.append('<input type="button" value="Retry" class="css-nextQuestion js-styleButton js-retry" />');
               $(".js-retry").on("click", function(event) {
					$(this).siblings().andSelf().prop('disabled', 'disabled');
                    $Popup.fadeToggle(animationSpeed, "swing", function() { $Popup.empty(); });
					if (correct) {
					     correctAnswers--;
					}
                         displayQuestion(questionNumber);
                });
		  }
          $Popup.fadeToggle(animationSpeed);
},


displayEndingPage: function() {
     $content.empty();
     $content.append("<div id='score'>"+correctAnswers+"/"+questions.length+"</div>");
     if (correctAnswers == questions.length) {
          $content.append("<div id='infoRequestHeader'>Text Goes Here</div>");
          $content.append("<p /><form id='contactInfo' name='contactInfo' action=''></form><p />");
          $form = $("#contactInfo");
          $form.append("<label for='firstname'>First Name: </label><input type='textbox' name='firstname' id='txtfirstname' onfocus='jsKeyboard.focus(this)' class='css-name' /><br />");
          $form.append("<label for='lastname'>Last Name: </label><input type='textbox' name='lastname' id='txtlastname' onfocus='jsKeyboard.focus(this)' class='css-name' /><br />");
          $form.append("<label for='email'>Email: </label><input type='textbox' name='email' id='txtemail' onfocus='jsKeyboard.focus(this)' class='css-email' /><br />");
          $form.append("<label for='opt-in' class='css-optInLabel'>Opt-In To Win:</label><input type='checkbox' name='opt-in' id='chkOptIn' value='true' checked='checked' class='css-optInCheckbox' /><br />");
          $form.append("<input type='submit' class='css-submitContact js-styleButton' id='submitContact' value='Submit!' />");

          $submitContact = $("#contactInfo");
          $submitContact.submit(function() { return verifySubmission() });
          $content.append("</div>");
     }
          $content.append("<input type='button' value='Start Over!' id='btnStartOver' class='js-styleButton css-startOverBtn' />");
          $("#btnStartOver").on("click", function() {
               displayIntro();
          });
},

verifySubmission: function() {
     var errors = Array();
     var error = false;
     $firstName = $("#txtfirstname");
     $lastName = $("#txtlastname");
     $email = $("#txtemail");
     $optIn = $("#chkOptIn");
     if ($firstName.val().length == 0)  {
          error = true;
          errors.push("You didn't enter a first name.");
     }
     if ($lastName.val().length == 0) {
          error = true;
          errors.push("You didn't enter a last name.");
     }
     if ($email.val().length == 0 || !IsEmail($email.val())) {
          error = true;
          errors.push("You didn't enter a valid email address.");
     }
     if (!$optIn.is(':checked')) {
          error = true;
          errors.push("You didn't opt in for us to contact you.");
     }
     $("#submitContact").prop('disabled', 'disabled');
     if (error) {
         errorPopUp(errors, animationSpeed);
     }
     else {
          submitForm();
     }
     return false;
},


IsEmail: function(email) {
     var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     return regex.test(email);
},

errorPopUp: function(errors, animationSpeed) {
     var errorCount = errors.length;
     $Popup.append("<h1>Errors</h1>");
     $Popup.append("<ul>");
     for (var i = 0; i < errorCount; i++) {
          $Popup.append("<li>"+errors[i]+"</li>");
     }
     $Popup.append("</ul>");
     $Popup.append('<input type="button" value="Fix" class="css-errorFix js-styleButton" />');
     $Popup.append('<input type="button" value="Continue" class="css-errorOkay js-styleButton" />');
     $(".errorOkay").click(function(event) {
           $("#Popup input").attr('disabled', 'disabled');
           $Popup.empty();
           submitForm();
     });
     $(".errorFix").click(function(event) {
          $("#submitContact").removeAttr('disabled');
          $("#Popup input").attr('disabled', 'disabled');
          $Popup.fadeToggle(animationSpeed);
     });
     $Popup.fadeToggle(animationSpeed);
},


submitForm: function() {
    request = $.ajax({
      url:"/Quiz/insertToDB.php",
      type:"POST",
      data:{firstname: $firstName.val(), lastname: $lastName.val(), email: $email.val(), optin: $optIn.is(':checked') },
      cache:false,
     });
     request.done(function() {
        if ($optIn.is(':checked')) {
             $Popup.append("<h1>Good luck!</h1>")
               .append("<p>We will be in touch soon.</p>")
        }
        else {
             $Popup.append("<h1>Thanks for Playing!</h1>");
        }
        $Popup.append("<input type='button' value='Okay' class='css-btnStartOver' />");
        $(".btnStartOver").click(function() {
             location.reload(false);
             $Popup.fadeToggle(animationSpeed, "swing", function() { $Popup.empty(); });
        });
        if (!$Popup.is(':visible')) {
             $Popup.fadeToggle(animationSpeed);
        }
      });
      request.fail(function (xmlHttpRequest, textStatus, errorThrown) {
         console.log(xmlHttpRequest.responseText);
         console.log(errorThrown);
      });
}
};
