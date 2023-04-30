import styled from "styled-components";

interface StyledMessageProps {
  isCorrect: boolean;
}

export const StyledMessage = styled.p<StyledMessageProps>`
  width: 100%;
  font-size: 1.5rem;
  flex-shrink: 0;
  font-weight: 600;
  letter-spacing: 1px;
  color ${({isCorrect})=> isCorrect? "green": "red"};
`;