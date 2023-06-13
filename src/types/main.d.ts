

interface IQuestion {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
  userAnswer?: IOption;
  type: string;
  options?: IOption[];
}
interface IFetchError {
  message: string;
}
interface IResponseError {
  response: {
    data: IFetchError
  }
} 

interface IOption {
  value: string;
  display: string;
  isCorrect?: boolean;
}