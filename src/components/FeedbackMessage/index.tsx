


const FeedbackMessage =({correctAnswer, userAnswer})=>{

  const isUserCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();

  return (
    <h2>{isUserCorrect? "correct! well done": `wrong :(, the correct answer is: ${correctAnswer}`}</h2>
  );
}

export default FeedbackMessage;