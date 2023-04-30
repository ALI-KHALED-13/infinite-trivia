import styled, {keyframes} from "styled-components";

const loopAnimation  = keyframes`
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px red;
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px violet;
  }
  75% {
    transform: rotate(270deg);
    box-shadow: 1px 5px 2px magenta;
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px red;
  }
`;

export const StyledLoaderOverlay = styled.div`
  min-height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const StyledLoader = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;

  animation: ${loopAnimation} 2s linear infinite;
  
  &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;

export const StyledLoaderText = styled.span`
  display: inline-block;
  color: white;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 2;
  max-width: 20rem;
`;