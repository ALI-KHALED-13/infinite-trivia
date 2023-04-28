import styled from "styled-components";



export const StyledButton = styled.button`
  border: none;
  border-radius: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

`;

export const StyledPrimaryButton = styled(StyledButton)`
  background-color: #646cff;
  color: white;
  font-weight: bold;
  &:hover {
    border-color: #cbaff5;
  }
`;

export  const StyledSecondaryButton = styled(StyledButton)`
  background-color: #000000;
  color: white;

  &:hover {
    border-color: #646cff;
  }
`;