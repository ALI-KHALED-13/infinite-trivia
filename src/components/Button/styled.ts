import styled from "styled-components";



export const StyledButton = styled.button`
  border: 1px solid transparent;
  border-radius: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;
  transition: border-color 0.2s linear;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

`;

interface StyledButtonProps {
  disabled: boolean;
}

export const StyledPrimaryButton = styled(StyledButton)<StyledButtonProps>`
  background-color: #646cff;
  color: white;
  font-weight: bold;
  &:hover {
    border-color: ${({disabled})=> disabled? "transparent": "#cbaff5"};
  }
`;

export  const StyledSecondaryButton = styled(StyledButton)<StyledButtonProps>`
  background-color: #000000;
  color: white;
  &:hover {
    border-color:  ${({disabled})=> disabled? "transparent":"#646cff"};
  }
`;