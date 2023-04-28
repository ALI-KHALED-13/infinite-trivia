import styled from "styled-components";


export const StyledTriviaCard = styled.div`
  padding: 2rem;
  max-width: 50rem;
  margin: 5rem auto;
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
  padding: 2px;
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
  font-size: 2rem;
  text-align: center;
  &:hover {
    outline: none;
  }
`;