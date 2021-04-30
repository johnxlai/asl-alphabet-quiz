// Hey Maren - heres my idea
// I think i am going to to do a flashcard game
// How many questions can you solve in 1 min
// The game will have a counter, to show correct and incorrect amounts.
// It will have a timer counting down.
// It will show a question from an array of objects
// It will take a user input for them to answer.
// after timer it will show results.

//use init
// toDoApp.init();
const aslQuiz = {};

aslQuiz.listOfQuestions = ["a", "c", "i", "r", "y"];
aslQuiz.questionGoesHere = $(".questionGoesHere");
aslQuiz.formSubmit = $(".submitForm");
aslQuiz.userAnswer = $('input[id="userAnswer"]');
aslQuiz.correctOrNot = $(".correctOrNot");
aslQuiz.correctPercentage = $(".correctPercentage");
aslQuiz.iImageId = document.querySelector(".i-image");
aslQuiz.points = 0;

//Get a random question from the array
const randomizeQuestion = () => {
  //grab one of the item from the array randomly.
  const chosenAlphabet =
    aslQuiz.listOfQuestions[
      Math.floor(Math.random() * aslQuiz.listOfQuestions.length)
    ];

  const indexOfChosenAlphaBet = aslQuiz.listOfQuestions.indexOf(chosenAlphabet);
  //returns chosen question and its index number from the original array
  return { chosenAlphabet, indexOfChosenAlphaBet };
};

//function to update question
const updateQuestion = (selectedQuestion) => {
  console.log(selectedQuestion);
  aslQuiz.questionGoesHere.html(selectedQuestion);
  //updating image path with random number
  aslQuiz.iImageId.src = `img/${selectedQuestion}.svg`;
};

//Update correct number here
const updateCorrectNumber = (points) => {
  aslQuiz.correctPercentage.text(points);
};

// if answer match add to total coorect number
const checkIfCorrect = (userAnswerValue, selectedQuestion) => {
  // console.log(userAnswerValue, selectedQuestion);
  if (userAnswerValue.toLowerCase() === selectedQuestion) {
    aslQuiz.points += 1;
    console.log(aslQuiz.points);
    aslQuiz.correctOrNot.html("yes baby");
    updateCorrectNumber(aslQuiz.points);
  } else {
    aslQuiz.correctOrNot.html("Wrong Son");
    console.log("wrong");
  }
};

//on submit trigger update question
aslQuiz.formSubmit.on("submit", function (e) {
  e.preventDefault();
  const userAnswerValue = aslQuiz.userAnswer.val();

  if (aslQuiz.listOfQuestions.length) {
    if (!userAnswerValue) {
      alert("input something fam");
    } else {
      // get input answer
      console.log(userAnswerValue);
      checkIfCorrect(userAnswerValue, aslQuiz.selectedQuestion.chosenAlphabet);
      //getting next question here
      aslQuiz.selectedQuestion = randomizeQuestion();
      updateQuestion(aslQuiz.selectedQuestion.chosenAlphabet);

      removeQuestionFromArray(aslQuiz.selectedQuestion.indexOfChosenAlphaBet);

      // clearValues
      aslQuiz.userAnswer.val("");
    }
  } else {
    alert(`Congrats You're done!`);
  }
});

//Remove array clicked on
const removeQuestionFromArray = (indexOfSelectedQuuestion) => {
  //if array is not empty execute
  aslQuiz.listOfQuestions.splice(indexOfSelectedQuuestion, 1);
  console.log(aslQuiz.listOfQuestions);
};

aslQuiz.init = function () {
  // checkIfArrayIsEmpty();
  //check if array is empty

  aslQuiz.selectedQuestion = randomizeQuestion();
  randomizeQuestion();
  updateQuestion(
    aslQuiz.selectedQuestion.chosenAlphabet,
    aslQuiz.selectedQuestion.indexOfChosenAlphaBet
  );
  removeQuestionFromArray(aslQuiz.selectedQuestion.indexOfChosenAlphaBet);
}; //init

$(function () {
  aslQuiz.init();
});
