import { StyledMessage } from "./styled";



const FeedbackMessage =({correctAnswer, userAnswer})=>{

  const isUserCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();

  return (
    <StyledMessage isCorrect={isUserCorrect}>
      { isUserCorrect?
        "correct! well done":
        `wrong!, the correct answer is: ${correctAnswer}`
      }
    </StyledMessage>
  );
}

export default FeedbackMessage;