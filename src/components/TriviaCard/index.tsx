


interface TriviaCardProps {
  question: string;
  questionNum: number;
  category: string;
  value: string;
  disabled?: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  validateAnswer: Function;//(evt: React.KeyboardEventHandler<HTMLInputElement>)=> void;
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
    <div>
      <span>{category} </span>
      <label htmlFor={"question " + questionNum}>
        {question}
      </label>
      <input
        id={"question " + questionNum}
        value={value}
        onChange={onChange}
        autoFocus={true}
        disabled={disabled}
        onKeyDown={(ev)=> !disabled && ev.key == "Enter" && validateAnswer()}
      />
    </div>
  );
}

export default TriviaCard;