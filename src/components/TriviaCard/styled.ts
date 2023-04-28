import styled from "styled-components";


export const StyledTriviaCard = styled.div`
  padding: 2rem;
  max-width: 50rem;
  margin: 5rem auto;
  border: 1px solid gray;
  position: relative;
  border-radius: 1rem;
`;

export const StyledCategory = styled.span`
  position: absolute;
  z-index: 4;
  top: -10px;
  left: 5px;
  border: 1px solid gray;
  background-color: #242424;
  font-size: 1.1rem;
  border-radius: 0.5rem;
`;