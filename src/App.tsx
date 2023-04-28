import { useEffect, useState } from "react"
import TriviaCard from "./components/TriviaCard";
import Button from "./components/Button";


function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [activeQuestionNum, setActiveQuestionNum] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [userAnswers, setUswerAnswers] = useState([]);
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
        const response = await fetch(`https://opentdb.com/api.php?amount=${activeQuestionNum + 1}&difficulty=easy&token=${sessionToken}`);
        const jsonResp = await response.json();

        if (jsonResp.response_code === 0){
          setQuestions(jsonResp.results);
        } else {
          throw new Error("some error happened, try refreshing the page")
        }
      } catch (err){
        setFetchError(err);
      } finally {
        setIsFetching(false);
      }
      
    }
    if (sessionToken){
      fetchQuestions();
    }
    
  }, [activeQuestionNum, sessionToken])


  const activeQuestion = questions[activeQuestionNum];

  const validateAnswer =()=> {
    const isUserCorrect = userInput.trim().toLowerCase() === activeQuestion.correct_answer.toLowerCase();

    alert(`You answer is ${isUserCorrect? "correct": "wrong"}`);

    if (!isUserCorrect){
      alert("correct answer is " + activeQuestion.correct_answer)
    }
    setUswerAnswers(userAnswers.concat(userInput));
    
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
            value={userInput}
            disabled={!!userAnswers[activeQuestionNum]}
            onChange={(ev)=> setUserInput(ev.target.value)}
            questionNum={activeQuestionNum + 1}
            validateAnswer={validateAnswer}
          />
          <Button
            onClick={validateAnswer}
            disabled={!!userAnswers[activeQuestionNum]}
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
