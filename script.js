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

// if answer match add to total coorect number

const checkIfCorrect = (userAnswerValue, selectedQuestion) => {
  console.log(userAnswerValue, selectedQuestion);
  // if (userAnswerValue === selectedQuestion) {
  //   points += 1;
  //   console.log(points);
  //   correctOrNot.html("yes baby");
  // } else {
  //   correctOrNot.html("Wrong Son");
  //   console.log("wrong");

  // }
  userAnswer.val("");
};

//on submit trigger update question
submitBtn.on("click", function (e) {
  e.preventDefault();

  // get input answer
  const userAnswerValue = userAnswer.val();
  console.log(userAnswerValue);

  let selectedQuestion = randomizeQuestion();
  updateQuestion(selectedQuestion);
  checkIfCorrect(userAnswerValue, selectedQuestion);

  //clearValues
  // userAnswer.val();
});

// remove asked qusetion from array
