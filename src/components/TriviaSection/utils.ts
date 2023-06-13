

const decodeHTMLEntities =(str : string)=> {

  const txt = new DOMParser().parseFromString(str, "text/html");
  
  return txt.documentElement.textContent;
  
}

const appendQuestionOptions =(question:IQuestion)=>{
  const questionAnswers = question.incorrect_answers.concat(question.correct_answer);
  questionAnswers.sort();

  const questionOps = questionAnswers.map(answerStr=> {
    return {
      display: answerStr,
      value: answerStr,
      isCorrect: answerStr === question.correct_answer
    }
  })

  question.options = questionOps;
}

export {
  decodeHTMLEntities,
  appendQuestionOptions
}