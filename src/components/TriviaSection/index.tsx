import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import {
  StyledCategory,
  StyledInteractionArea,
  StyledOptionsList,
  StyledTriviaCard,
  StyledTriviaSection,
} from "./styled";
import { appendQuestionOptions, decodeHTMLEntities } from "./utils";
import Loader from "../Loader";
import RadioInput from "../RadioInput";

interface TriviaCardProps {sessionToken: string;}


const TriviaSection =({sessionToken}: TriviaCardProps)=> {

  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<IFetchError | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [userChoice, setUserChoice] = useState<IOption | undefined>(undefined);
  const [activeQuestionNum, setActiveQuestionNum] = useState(0);

  useEffect(()=> {
    const fetchQuestions = async()=> {
      setIsFetching(true);
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=1&difficulty=easy&token=${sessionToken}`);
        
        const fetchedQuestion = response.data.results[0];

        appendQuestionOptions(fetchedQuestion)

        setQuestions(questions.concat(fetchedQuestion))
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
        return idx === activeQuestionNum ? {...q, userAnswer: userChoice} : q;
    }))
    setUserChoice(undefined)
  }

  const activeQuestion = questions[activeQuestionNum];
  const isAnswerSubmitted = activeQuestion && "userAnswer" in activeQuestion;
  
  return isFetching? <Loader />:
    fetchError? <div>{fetchError.message}</div>: 
    activeQuestion && (
    <StyledTriviaSection>
      <StyledTriviaCard>

        <StyledCategory>{activeQuestion.category} </StyledCategory>

        <label>
          {decodeHTMLEntities(activeQuestion.question)}
        </label>
        
        <StyledOptionsList>
          {activeQuestion.options?.map(op=> (
            <RadioInput
              key={'question no.' + activeQuestionNum + " " + op.value}
              value={activeQuestion.userAnswer || userChoice}
              option={op}
              disabled={isAnswerSubmitted}
              showMarking={isAnswerSubmitted}
              onClick={(clickedOp)=> setUserChoice(clickedOp)}
            />
          ))}
        </StyledOptionsList>
        
      </StyledTriviaCard>

      <StyledInteractionArea>

        {questions[activeQuestionNum - 1] && (
          <Button 
            onClick={()=> setActiveQuestionNum(activeQuestionNum - 1)}
            variant="secondary"
          >
            prev
          </Button>
        )}
        
        <Button
          onClick={recordAnswer}
          disabled={isAnswerSubmitted || !userChoice}
        >
          Check
        </Button>

        {isAnswerSubmitted  && (
          <Button 
            onClick={()=> setActiveQuestionNum(activeQuestionNum + 1)}
            variant="secondary"
          >
            Next
          </Button>
        )}
        
      </StyledInteractionArea>
    </StyledTriviaSection>
  );
}

export default TriviaSection;