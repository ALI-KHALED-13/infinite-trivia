

interface IQuestion {
  category: string;
  question: string;
  correct_answer: string;
  userAnswer?: string;
}
interface IFetchError {
  message: string;
}