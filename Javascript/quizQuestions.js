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

$question = $("#question");
$content = $("#content");

$(function() {
  var quizEngine = new quizEngineClass(true, 500, questions);
});
