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
aslQuiz.listOfQuestions;
aslQuiz.correctPoints;
aslQuiz.wrongPoints;
aslQuiz.totalAnswered;
aslQuiz.seconds;
aslQuiz.countDownInterval;
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
aslQuiz.beforeTimerFinished = $(".beforeTimerFinished");
aslQuiz.arrayCounter = true;

//focus input for ux, instead of mouse click
aslQuiz.setFocusToInput = () => {
  aslQuiz.userAnswer[0].focus();
};

//start timer
aslQuiz.startQuiz = () => {
  //reset values
  // aslQuiz.listOfQuestions = "abcdefghijklmnopqrstuvwxyz".split("");
  aslQuiz.listOfQuestions = ["a", "b", "c"];
  aslQuiz.correctPoints = 0;
  aslQuiz.wrongPoints = 0;
  aslQuiz.totalAnswered = 0;
  //set inital seconds here
  // aslQuiz.seconds = 30;
  aslQuiz.seconds = 10;

  // clear all text fields from last entry
  aslQuiz.totalAnsweredHtml.text(``);
  aslQuiz.totalCorrect.text(``);
  aslQuiz.totalWrong.text(``);
  aslQuiz.correctOrNot.text(``);
  aslQuiz.timer.text(``);
  aslQuiz.userAnswer.val("");

  //hide step one - instructions and step three - final results
  aslQuiz.stepOne.hide();
  aslQuiz.stepThree.hide();

  //show actual game page and focus input
  aslQuiz.stepTwo.show();
  aslQuiz.setFocusToInput();
  aslQuiz.startCountDown();

  //select a question to show first question on load
  aslQuiz.selectedQuestion = aslQuiz.randomizeQuestion();

  aslQuiz.updateQuestion(aslQuiz.selectedQuestion.chosenAlphabet);
  aslQuiz.removeQuestionFromArray(
    aslQuiz.selectedQuestion.indexOfChosenAlphaBet
  );
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
  //returns chosen question and its index number from the original array
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

//Update wrong number here
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
  if (aslQuiz.totalAnswered) {
    const finalMark = Math.round(
      (aslQuiz.correctPoints / aslQuiz.totalAnswered) * 100
    );

    //out of the array length
    const finalMarkOutOf26 = Math.round((aslQuiz.correctPoints / 26) * 100);
    // show results with perfectage
    aslQuiz.finalResults.html(
      `<h3>${finalMark}% of your answers were correct</h3>
     <h6>You got ${aslQuiz.correctPoints} out of 26 = ${finalMarkOutOf26}% overall</h6>`
    );
    //if user didn't answer a single question
  } else {
    aslQuiz.finalResults.html(`<h3>Did you fall asleep?</h3>`);
  }

  aslQuiz.stepTwo.hide();
  aslQuiz.stepThree.show();
};

//on submit trigger update question
aslQuiz.formSubmit.on("submit", function (e) {
  e.preventDefault();
  const userAnswerValue = aslQuiz.userAnswer.val();

  // if array is empty end Quiz and display result
  if (aslQuiz.listOfQuestions.length > 0) {
    // if input field is empty tell user to input something
    if (!userAnswerValue) {
      alert("input something fam");
      aslQuiz.setFocusToInput();
    } else {
      // get input answer

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
      aslQuiz.setFocusToInput();
    }
  } else {
    // finished before timer
    // aslQuiz.stepThree.prepend(
    //   `<h3 class="beforeTimerFinished">Wow, You finished in ${aslQuiz.seconds} secs! </h3>`
    // );
    // update check last submitted question
    aslQuiz.checkIfCorrect(
      userAnswerValue,
      aslQuiz.selectedQuestion.chosenAlphabet
    );
    aslQuiz.quizEnded();
  }
});

//Remove array clicked on
aslQuiz.removeQuestionFromArray = (indexOfSelectedQuuestion) => {
  aslQuiz.listOfQuestions.splice(indexOfSelectedQuuestion, 1);
};

//Restart App Function
aslQuiz.restartBtn.on("click", function () {
  aslQuiz.startQuiz();
});

///////////////////////INIT

aslQuiz.init = function () {
  aslQuiz.stepTwo.hide();
  aslQuiz.stepThree.hide();
}; //init

$(function () {
  aslQuiz.init();
});
