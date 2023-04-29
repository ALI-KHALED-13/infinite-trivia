import { useEffect, useState } from "react"
import TriviaCard from "./components/TriviaCard";
import Button from "./components/Button";
import FeedbackMessage from "./components/FeedbackMessage";


function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [sessionToken, setSessionToken] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeQuestionNum, setActiveQuestionNum] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  
  useEffect(()=> {
    const getSessiontoken = async()=> {
      setIsFetching(true);
      try {
        const response = await fetch(`https://opentdb.com/api_token.php?command=request`);
        const jsonResp = await response.json();

        if (jsonResp.response_code === 0){
          setSessionToken(jsonResp.token);
        } else {
          throw new Error("some error happened, try refreshing the page")
        }
      } catch (err){
        setFetchError(err);
      } finally {
        setIsFetching(false);
      }
    }
    getSessiontoken()
  }, [])

  useEffect(()=> {
    const fetchQuestions = async()=> {
      setIsFetching(true);
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=easy&token=${sessionToken}`);
        const jsonResp = await response.json();

        if (jsonResp.response_code === 0){
          setQuestions(questions.concat(jsonResp.results));
        } else {
          throw new Error("some error happened, try refreshing the page")
        }
      } catch (err){
        setFetchError(err);
      } finally {
        setIsFetching(false);
      }  
    }
    if (sessionToken.length && questions[activeQuestionNum] == undefined){
      fetchQuestions();
    }
    
  }, [activeQuestionNum, sessionToken])


  const activeQuestion = questions[activeQuestionNum];

  const recordAnswer =()=> {
    setQuestions(questions.map((q, idx)=> {
      if (idx=== activeQuestionNum){
        q.userAnswer = userInput;
      }
      return q;
    }))
    
    setShowNextButton(true);
  }
  
  return (
    <div>
      <h2>welcome to this fun Trivia Game</h2>
      {isFetching? <div>Loading...</div>: 
        fetchError? <div>{fetchError.message}</div>:
        activeQuestion && (
        <>
          <TriviaCard
            question={activeQuestion.question}
            category={activeQuestion.category}
            value={activeQuestion.userAnswer || userInput}
            disabled={"userAnswer" in activeQuestion}
            onChange={(ev)=> setUserInput(ev.target.value)}
            questionNum={activeQuestionNum + 1}
            recordAnswer={recordAnswer}
          />
          {showNextButton && (
            <FeedbackMessage
              userAnswer={activeQuestion.userAnswer}
              correctAnswer={activeQuestion.correct_answer}
            />
          )}
          <Button
            onClick={recordAnswer}
            disabled={"userAnswer" in activeQuestion}
          >
            Check
          </Button>
          {showNextButton && (
            <Button 
              onClick={()=> {
                setActiveQuestionNum(activeQuestionNum + 1);
                setUserInput("");
                setShowNextButton(false);
              }}
              variant="secondary"
            >
              Next
            </Button>
          )}
        </>
      )}
      
      
    </div>
  )
}

export default App
