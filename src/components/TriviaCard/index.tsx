import { StyledCategory, StyledTriviaCard } from "./styled";



interface TriviaCardProps {
  question: string;
  questionNum: number;
  category: string;
  value: string;
  disabled?: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  validateAnswer: Function;//(evt: React.KeyboardEventHandler<HTMLInputElement>)=> void;
}

function decodeHTMLEntities(str) {

  const txt = new DOMParser().parseFromString(str, "text/html");
  
  return txt.documentElement.textContent;
  
}

const TriviaCard =({
  question,
  questionNum,
  category,
  value,
  disabled,
  onChange,
  validateAnswer
}: TriviaCardProps)=> {
  return (
    <StyledTriviaCard>
      <StyledCategory>{category} </StyledCategory>

      <label htmlFor={"question " + questionNum}>
        {decodeHTMLEntities(question)}
      </label>
      <input
        id={"question " + questionNum}
        value={value}
        onChange={onChange}
        autoFocus={true}
        disabled={disabled}
        onKeyDown={(ev)=> !disabled && ev.key == "Enter" && validateAnswer()}
      />
    </StyledTriviaCard>
  );
}

export default TriviaCard;