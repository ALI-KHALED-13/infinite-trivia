import { StyledLoader, StyledLoaderOverlay, StyledLoaderText } from "./styled";

interface LoaderProps {
  text?: string;
}

const Loader =({text = "loading..."}: LoaderProps)=>{
  return (
    <StyledLoaderOverlay>
      <StyledLoader />
      <StyledLoaderText>{text}</StyledLoaderText>
    </StyledLoaderOverlay>
  );
}

export default Loader;