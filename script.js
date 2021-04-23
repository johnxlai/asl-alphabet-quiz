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

const questions = ["a", "c", "i", "r", "y"];
console.log(questions);

//grab one of the item from the array randomly.

//remove the item grabed

//function to update question
const updateQuestion = () => {
  let randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  console.log(randomQuestion);

  questionGoesHere.html(randomQuestion);

  //updating image path with random number
  iImageId.src = `img/${randomQuestion}.svg`;
  console.log(iImageId);

  // if (randomQuestion === iImageId.getAttribute("data-id")) {
  //   iImageId.classList.remove("hide");
  // }
};

updateQuestion();

console.log(questionGoesHere);

//loop thru all the images and get dataAttrible if match show
