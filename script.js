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

//making array from a - z
aslQuiz.listOfQuestions = "abcdefghijklmnopqrstuvwxyz".split("");
aslQuiz.startQuiz = $(".startQuiz");
aslQuiz.timer = $(".timer");
aslQuiz.questionGoesHere = $(".questionGoesHere");
aslQuiz.userAnswer = $('input[id="userAnswer"]');
aslQuiz.imageSrc = document.querySelector(".svg-image");

//btns
aslQuiz.startQuizBtn = $(".startQuiz");
aslQuiz.formSubmit = $(".submitForm");
aslQuiz.restartBtn = $(".restartBtn");

//step selectors
aslQuiz.stepOne = $(".stepOne");
aslQuiz.stepTwo = $(".stepTwo");
aslQuiz.stepThree = $(".stepThree");

//Updating Correct or Not Comments and points counter
aslQuiz.correctOrNot = $(".correctOrNot");
aslQuiz.totalCorrect = $(".totalCorrect");
aslQuiz.totalWrong = $(".totalWrong");
aslQuiz.totalAnsweredHtml = $(".totalAnswered");
aslQuiz.finalResults = $(".finalResults");
aslQuiz.correctPoints;
aslQuiz.wrongPoints;
aslQuiz.totalAnswered;
aslQuiz.seconds;
aslQuiz.countDownInterval;

//start timer
aslQuiz.startQuiz = () => {
  aslQuiz.correctPoints = 0;
  aslQuiz.wrongPoints = 0;
  aslQuiz.totalAnswered = 0;
  // aslQuiz.updateTotalQuestionsAnswer(0);
  aslQuiz.totalAnsweredHtml.text(``);
  aslQuiz.totalCorrect.text(``);
  aslQuiz.totalWrong.text(``);
  aslQuiz.correctOrNot.text(``);
  //set inital seconds here
  aslQuiz.seconds = 10;
  aslQuiz.stepOne.hide();
  aslQuiz.stepThree.hide();

  aslQuiz.stepTwo.show();
  aslQuiz.startCountDown();
};

aslQuiz.startQuizBtn.on("click", aslQuiz.startQuiz);

//count Down every 1 sec

aslQuiz.startCountDown = () => {
  aslQuiz.countDownInterval = setInterval(() => {
    aslQuiz.seconds--;
    aslQuiz.timer.text(aslQuiz.seconds);

    if (aslQuiz.seconds <= 10) {
      aslQuiz.timer.css("color", "yellow");
    }

    if (aslQuiz.seconds <= 5) {
      aslQuiz.timer.css("color", "red");
    }

    if (aslQuiz.seconds <= 0) {
      clearInterval(aslQuiz.countDownInterval);
      aslQuiz.quizEnded();
    }
  }, 1000);
};

//Get a random question from the array
aslQuiz.randomizeQuestion = () => {
  //grab one of the item from the array randomly.
  const chosenAlphabet =
    aslQuiz.listOfQuestions[
      Math.floor(Math.random() * aslQuiz.listOfQuestions.length)
    ];

  //gets the index of the chosen alphabet from the original array
  const indexOfChosenAlphaBet = aslQuiz.listOfQuestions.indexOf(chosenAlphabet);
  //returns chosen question and its index number from the original array sd s
  return { chosenAlphabet, indexOfChosenAlphaBet };
};

//function to update question
aslQuiz.updateQuestion = (selectedQuestion) => {
  //IF YOU WANT TO CHEAT UNCOMMENT LINE BELOW
  // aslQuiz.questionGoesHere.html(selectedQuestion);

  //updating image path with random number
  aslQuiz.imageSrc.src = `img/${selectedQuestion}.svg`;
};

//Update correct number here
aslQuiz.updateCorrectNumber = (correctPoints) => {
  aslQuiz.totalCorrect.text(`Correct: ${correctPoints}`);
  aslQuiz.updateTotalQuestionsAnswer();
};

//Update correct number here
aslQuiz.updateWrongNumber = (wrongPoints) => {
  aslQuiz.totalWrong.text(`Wrong: ${wrongPoints}`);
  aslQuiz.updateTotalQuestionsAnswer();
};

//Update Total of questions Answer
aslQuiz.updateTotalQuestionsAnswer = () => {
  //add 1 to totalAnswered
  aslQuiz.totalAnswered++;
  aslQuiz.totalAnsweredHtml.text(`Total Answered: ${aslQuiz.totalAnswered}`);
};

// if answer match add to total coorect number
aslQuiz.checkIfCorrect = (userAnswerValue, selectedQuestion) => {
  // console.log(userAnswerValue, selectedQuestion);
  if (userAnswerValue.toLowerCase() === selectedQuestion) {
    aslQuiz.correctPoints += 1;
    aslQuiz.correctOrNot.html("Yes baby!");
    aslQuiz.updateCorrectNumber(aslQuiz.correctPoints);
  } else {
    aslQuiz.wrongPoints += 1;
    aslQuiz.correctOrNot.html("Wrong Son");
    aslQuiz.updateWrongNumber(aslQuiz.wrongPoints);
  }
};

aslQuiz.quizEnded = () => {
  const finalMark = Math.round(
    (aslQuiz.correctPoints / aslQuiz.totalAnswered) * 100
  );
  // show results with perfectage
  aslQuiz.finalResults.html(`<h3>You Scored ${finalMark}% </h3>`);
  aslQuiz.stepTwo.hide();
  aslQuiz.stepThree.show();
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
      aslQuiz.checkIfCorrect(
        userAnswerValue,
        aslQuiz.selectedQuestion.chosenAlphabet
      );
      //getting next question here
      aslQuiz.selectedQuestion = aslQuiz.randomizeQuestion();
      aslQuiz.updateQuestion(aslQuiz.selectedQuestion.chosenAlphabet);

      aslQuiz.removeQuestionFromArray(
        aslQuiz.selectedQuestion.indexOfChosenAlphaBet
      );

      // clearValues
      aslQuiz.userAnswer.val("");
    }
  } else {
    aslQuiz.quizEnded();
  }
});

//Remove array clicked on
aslQuiz.removeQuestionFromArray = (indexOfSelectedQuuestion) => {
  //if array is not empty execute
  aslQuiz.listOfQuestions.splice(indexOfSelectedQuuestion, 1);
  console.log(aslQuiz.listOfQuestions);
};

//Restart App Function

aslQuiz.restartBtn.on("click", function () {
  aslQuiz.startQuiz();
  // aslQuiz.stepThree.hide();
  aslQuiz.randomizeQuestion();
  //select a question
  aslQuiz.selectedQuestion = aslQuiz.randomizeQuestion();

  aslQuiz.updateQuestion(aslQuiz.selectedQuestion.chosenAlphabet);
  aslQuiz.removeQuestionFromArray(
    aslQuiz.selectedQuestion.indexOfChosenAlphaBet
  );
});

///////////////////////INIT

aslQuiz.init = function () {
  aslQuiz.stepTwo.hide();
  aslQuiz.stepThree.hide();
  aslQuiz.randomizeQuestion();

  //select a question
  aslQuiz.selectedQuestion = aslQuiz.randomizeQuestion();

  aslQuiz.updateQuestion(aslQuiz.selectedQuestion.chosenAlphabet);
  aslQuiz.removeQuestionFromArray(
    aslQuiz.selectedQuestion.indexOfChosenAlphaBet
  );
}; //init

$(function () {
  aslQuiz.init();
});
