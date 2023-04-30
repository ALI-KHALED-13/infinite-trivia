import { useEffect, useState } from "react";
import { StyledCategory, StyledInteractionArea, StyledTriviaCard, StyledTriviaWrapper, StyledUserInput } from "./styled";
import FeedbackMessage from "../FeedbackMessage";
import Button from "../Button";
import axios from "axios";
import { decodeHTMLEntities } from "./utils";


interface TriviaCardProps {sessionToken: string;}


const TriviaCard =({sessionToken}: TriviaCardProps)=> {

  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<IFetchError | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [activeQuestionNum, setActiveQuestionNum] = useState(0);

  useEffect(()=> {
    const fetchQuestions = async()=> {
      setIsFetching(true);
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=1&difficulty=easy&token=${sessionToken}`);
        setQuestions(questions.concat(response.data.results))

      } catch (error: any){
        setFetchError(error.response?.data || error);
      } finally {
        setIsFetching(false);
      }  
    }
    if (sessionToken.length && questions[activeQuestionNum] == undefined){
      fetchQuestions();
    }
    
  }, [activeQuestionNum, sessionToken, questions]);

  const recordAnswer =()=> {
    setQuestions(questions.map((q, idx: number)=> {
      if (idx=== activeQuestionNum){
        q.userAnswer = userInput;
      }
      return q;
    }))
    setUserInput("");
    setIsAnswerSubmitted(true);
  }

  const activeQuestion = questions[activeQuestionNum];

  

  return isFetching? <div>loading...</div>: fetchError? <div>{fetchError.message}</div>: activeQuestion && (
    <StyledTriviaWrapper>
      <StyledTriviaCard>
        <StyledCategory>{activeQuestion.category} </StyledCategory>

        <label htmlFor={"question " + activeQuestionNum}>
          {decodeHTMLEntities(activeQuestion.question)}
        </label>
        <StyledUserInput
          id={"question " + activeQuestionNum}
          value={activeQuestion.userAnswer || userInput}
          onChange={(ev)=> setUserInput(ev.target.value)}
          autoFocus={true}
          disabled={"userAnswer" in activeQuestion}
          onKeyDown={(ev)=> !("userAnswer" in activeQuestion) && ev.key == "Enter" && recordAnswer()}
        />
        
      </StyledTriviaCard>

      <StyledInteractionArea>
        
        {(isAnswerSubmitted || ("userAnswer" in activeQuestion)) && (
          <>
            <FeedbackMessage
              userAnswer={activeQuestion.userAnswer as string}
              correctAnswer={activeQuestion.correct_answer}
            />
            <Button 
              onClick={()=> {
                setActiveQuestionNum(activeQuestionNum + 1);
                setIsAnswerSubmitted(false);
              }}
              variant="secondary"
            >
              Next
            </Button>
          </>
        )}
        
        <Button
          onClick={recordAnswer}
          disabled={"userAnswer" in activeQuestion}
        >
          Check
        </Button>
        {questions[activeQuestionNum - 1] && (
          <Button 
            onClick={()=> {
              setActiveQuestionNum(activeQuestionNum - 1);
            }}
            variant="secondary"
          >
            prev
          </Button>
        )}
      </StyledInteractionArea>
    </StyledTriviaWrapper>
  );
}

export default TriviaCard;