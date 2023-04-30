import { useEffect, useState } from "react";
import axios from "axios";
import FeedbackMessage from "../FeedbackMessage";
import Button from "../Button";
import {
  StyledCategory,
  StyledInteractionArea,
  StyledTriviaCard,
  StyledTriviaSection,
  StyledUserInput
} from "./styled";
import { decodeHTMLEntities } from "./utils";
import Loader from "../Loader";

interface TriviaCardProps {sessionToken: string;}


const TriviaSection =({sessionToken}: TriviaCardProps)=> {

  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<IFetchError | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
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
        return idx === activeQuestionNum ? {...q, userAnswer: userInput} : q;
    }))
    setUserInput("");
  }

  const activeQuestion = questions[activeQuestionNum];
  const isAnswerSubmitted = activeQuestion && "userAnswer" in activeQuestion;
  
  return isFetching? <Loader />:
    fetchError? <div>{fetchError.message}</div>: 
    activeQuestion && (
    <StyledTriviaSection>
      <StyledTriviaCard>

        <StyledCategory>{activeQuestion.category} </StyledCategory>

        <label htmlFor={"question " + activeQuestionNum}>
          {decodeHTMLEntities(activeQuestion.question)}
        </label>
        <StyledUserInput
          id={"question " + activeQuestionNum}
          value={activeQuestion.userAnswer || userInput}
          onChange={(ev)=> setUserInput(ev.target.value)}
          disabled={isAnswerSubmitted}
          // next 2 are added so the player can play the trivia using only the keyboard, Enter after adding an answer to check, tabs to navigate to prev and next buttons 
          autoFocus={true}
          onKeyDown={(ev)=> !(isAnswerSubmitted) && ev.key == "Enter" && recordAnswer()}
        />
        
      </StyledTriviaCard>

      <StyledInteractionArea>

        {isAnswerSubmitted  && (
          <>
            <FeedbackMessage
              userAnswer={activeQuestion.userAnswer as string}
              correctAnswer={activeQuestion.correct_answer}
            />
            <Button 
              onClick={()=> setActiveQuestionNum(activeQuestionNum + 1)}
              variant="secondary"
            >
              Next
            </Button>
          </>
        )}
        
        <Button
          onClick={recordAnswer}
          disabled={isAnswerSubmitted}
        >
          Check
        </Button>
        {questions[activeQuestionNum - 1] && (
          <Button 
            onClick={()=> setActiveQuestionNum(activeQuestionNum - 1)}
            variant="secondary"
          >
            prev
          </Button>
        )}
      </StyledInteractionArea>
    </StyledTriviaSection>
  );
}

export default TriviaSection;