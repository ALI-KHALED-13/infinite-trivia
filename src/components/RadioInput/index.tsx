import { CheckCircle, XCircle} from "@phosphor-icons/react";
import { StyledOption, StyledOptionLabel, StyledRadioInput, StyledRadioInputFill } from "./styled";
import { getMarkingCommand } from "./utils";


interface RadioInputProps {
  value?: IOption;
  option: IOption;
  onClick: (clickedOp:IOption)=> void;
  disabled: boolean;
  showMarking: boolean;
}

const RadioInput =({
  value,
  option,
  onClick,
  disabled,
  showMarking,
}:RadioInputProps)=>{

  const isSelected = option.value === value?.value;
  const markingCommand = getMarkingCommand(option, isSelected); // returns undefined if option isn't labeled as 'correct' nor selected
  

  return (
  <StyledOption
    {...{disabled, showMarking, isSelected}}
    onClick={()=> !showMarking && !disabled && onClick(option)}
  >
    {!showMarking || markingCommand === undefined?
        <StyledRadioInput className='btn' {...{isSelected, disabled}}>
          { isSelected && <StyledRadioInputFill /> }
        </StyledRadioInput>
        :
        ["markCorrect", "revealCorrect"].includes(markingCommand)?
        <CheckCircle
          size={26.5}
          color="green"
          weight="bold"
          style={{
            margin: '-5px -1.5px -5px -3px',
            flexShrink: 0
          }}
        />
        : // then wrong
        <XCircle
          size={26.5}
          color="red"
          style={{
            margin: '-5px -1.5px -5px -3px',
            flexShrink: 0
          }}
        /> 
      }
    <StyledOptionLabel {...{disabled, markingCommand, showMarking}}>
      {option.display}
    </StyledOptionLabel>

  </StyledOption>
 );
  
}

export default RadioInput;