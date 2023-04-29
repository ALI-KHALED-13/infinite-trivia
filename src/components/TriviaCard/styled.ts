import styled from "styled-components";
import { mediaQuery } from "../../utils/mediaQuery";


export const StyledTriviaWrapper = styled.div`
  max-width: 90rem;
  margin: 5rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${mediaQuery("md")}{
    flex-direction: row; 
    align-items: center;
  }
`;

export const StyledInteractionArea = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  min-width: 45%;
`;

export const StyledTriviaCard = styled.div`
  padding: 2rem;
  max-width: 50rem;
  border: 1px solid gray;
  position: relative;
  border-radius: 1rem;
  text-align: center;
  & > label {
    font-size: 2rem;
  } 
`;

export const StyledCategory = styled.span`
  position: absolute;
  z-index: 4;
  padding: 2px 4px;
  top: -10px;
  left: 5px;
  border: 1px solid gray;
  background-color: #242424;
  font-size: 1.2rem;
  border-radius: 0.5rem;
`;

export const StyledUserInput = styled.input`
  width: 95%;
  border: none;
  color: gold;
  padding: 0.5rem;
  margin: 1rem;
  font-size: 2rem;
  text-align: center;
  &:focus {
    outline: none;
  }
`;