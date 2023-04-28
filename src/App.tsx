import { useEffect, useState } from "react"
import TriviaCard from "./components/TriviaCard";
import Button from "./components/Button";


function App() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestionNum, setActiveQuestionNum] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [userAnswers, setUswerAnswers] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(()=> {
    const fetchQuestions = async()=> {
      const response = await fetch(`https://opentdb.com/api.php?amount=${activeQuestionNum + 1}&difficulty=easy`);

      const questions = await response.json();
      if (response.ok){
        setQuestions(questions.results);
      }
    }
    fetchQuestions();
  }, [activeQuestionNum])


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
      {activeQuestion && (
        <TriviaCard
          question={activeQuestion.question}
          category={activeQuestion.category}
          value={userInput}
          disabled={!!userAnswers[activeQuestionNum]}
          onChange={(ev)=> setUserInput(ev.target.value)}
          questionNum={activeQuestionNum + 1}
          validateAnswer={validateAnswer}
        />
      )}
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
      
    </div>
  )
}

export default App
