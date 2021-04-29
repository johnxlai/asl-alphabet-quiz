// Hey Maren - heres my idea
// I think i am going to to do a flashcard game
// How many questions can you solve in 1 min
// The game will have a counter, to show correct and incorrect amounts.
// It will have a timer counting down.
// It will show a question from an array of objects
// It will take a user input for them to answer.
// after timer it will show results.

const questionGoesHere = $(".questionGoesHere");
const iImageId = document.querySelector(".i-image");

const submitBtn = $('input[type="submit"]');
const userAnswer = $('input[id="userAnswer"]');
const correctOrNot = $(".correctOrNot");

const questions = ["a", "c", "i", "r", "y"];
let points = 0;
const correctPercentage = $(".correctPercentage");

//remove the item grabed

//Get a random question from the array
const randomizeQuestion = () => {
  //grab one of the item from the array randomly.
  return questions[Math.floor(Math.random() * questions.length)];
};

//function to update question
const updateQuestion = (selectedQuestion) => {
  // let randomQuestion = randomizeQuestion;
  questionGoesHere.html(selectedQuestion);
  //updating image path with random number
  iImageId.src = `img/${selectedQuestion}.svg`;
};

//Update correct number here
const updateCorrectNumber = (points) => {
  correctPercentage.text(points);
};

// if answer match add to total coorect number
const checkIfCorrect = (userAnswerValue, selectedQuestion) => {
  console.log(userAnswerValue, selectedQuestion);
  if (userAnswerValue === selectedQuestion) {
    points += 1;
    console.log(points);
    correctOrNot.html("yes baby");
    updateCorrectNumber(points);
  } else {
    correctOrNot.html("Wrong Son");
    console.log("wrong");
  }
};

//on submit trigger update question
submitBtn.on("click", function (e) {
  e.preventDefault();
  const userAnswerValue = userAnswer.val();

  if (!userAnswerValue) {
    alert("input something man");
  } else {
    // get input answer
    console.log(userAnswerValue);

    checkIfCorrect(userAnswerValue, selectedQuestion);

    //getting next question here
    selectedQuestion = randomizeQuestion();
    updateQuestion(selectedQuestion);

    // clearValues
    userAnswer.val("");
  }
});

// remove asked qusetion from array
// const removeQuestionFromArray = (questions) => {
//   const index = questions.indexOf(selectedQuestion);
//   questions.splice(index, 1);
//   console.log(questions);
// };
// removeQuestionFromArray();

//on load we want to trigger a random question and update the question, and userAnswerInput will check to see if it is a correct value;
let selectedQuestion = randomizeQuestion();
randomizeQuestion();
updateQuestion(selectedQuestion);
console.log(selectedQuestion);
