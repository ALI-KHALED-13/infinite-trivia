import { StyledCategory, StyledTriviaCard, StyledUserInput } from "./styled";



interface TriviaCardProps {
  question: string;
  questionNum: number;
  category: string;
  value: string;
  disabled?: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  recordAnswer: Function;//(evt: React.KeyboardEventHandler<HTMLInputElement>)=> void;
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
  recordAnswer
}: TriviaCardProps)=> {
  return (
    <StyledTriviaCard>
      <StyledCategory>{category} </StyledCategory>

      <label htmlFor={"question " + questionNum}>
        {decodeHTMLEntities(question)}
      </label>
      <StyledUserInput
        id={"question " + questionNum}
        value={value}
        onChange={onChange}
        autoFocus={true}
        disabled={disabled}
        onKeyDown={(ev)=> !disabled && ev.key == "Enter" && recordAnswer()}
      />
    </StyledTriviaCard>
  );
}

export default TriviaCard;