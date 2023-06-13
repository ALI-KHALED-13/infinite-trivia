import styled, { css } from "styled-components";


interface StyledOptionProps {
  showMarking: boolean;
  disabled: boolean;
  isSelected: boolean;
}

export const StyledOption = styled.li<StyledOptionProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  cursor: ${( {showMarking, disabled} )=> disabled? 'not-allowed' :
    showMarking? 'initial': 'pointer'
  };
  

  &:hover .btn {
    ${({ isSelected, showMarking, disabled,})=> !isSelected &&  !showMarking && !disabled &&
     css`
      background: #606060;
    `}
  }

`;

interface StyledRadioProps {
  disabled: boolean;
  isSelected: boolean;
}

export const StyledRadioInput = styled.button<StyledRadioProps>`
  border-radius: 50%;
  width: 2rem;
  height:  2rem;
  border: 2px solid ${({ disabled})=> disabled? '#afafaf' :'#addbff'};
  background-color: none;
  flex: 0 0 auto;
  cursor: inherit;
  transition: background-color 0.2s ease-in-out;


  ${({ isSelected, disabled})=> isSelected && css`
      background-color: ${disabled? '#afafaf' :'#addbff'};
      display: flex;
      align-items: center;
      justify-content: center;
  `}

`;

export const StyledRadioInputFill = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: '#383838';
`;


interface StyledLabelProps {
  markingCommand?: string;
  disabled: boolean;
  showMarking: boolean;
}

export const StyledOptionLabel = styled.p<StyledLabelProps>`
  color: ${( {disabled, markingCommand} )=> disabled && !markingCommand?.includes("Correct") && "gray"};

  ${( {markingCommand, showMarking} )=> showMarking && (markingCommand === "markCorrect"?
    css`
      font-weight: bold;
      color: green;
    `
    : markingCommand === "markWrong"?
      css`
        color: tomato;
      `
      :''
  )};
`;