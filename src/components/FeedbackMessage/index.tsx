import { StyledMessage } from "./styled";

interface FeedbackMessagesProps {
  correctAnswer: string;
  userAnswer: string;
}

const FeedbackMessage =({correctAnswer, userAnswer}: FeedbackMessagesProps)=>{

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