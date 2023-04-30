import { StyledPrimaryButton, StyledSecondaryButton } from "./styled";

interface ButtonProps {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button =({
  children,
  disabled = false,
  onClick,
  style,
  variant = "primary"
}: ButtonProps)=> {
  
  const buttonVariants = {
    "primary": StyledPrimaryButton,
    "secondary": StyledSecondaryButton
  }
  const ButtonVariant = buttonVariants[variant as keyof (typeof buttonVariants)] ;

  return (
    <ButtonVariant
      disabled={disabled}
      onClick={(ev)=> !disabled && onClick(ev)}
      style={style}
    >
      {children}
    </ButtonVariant>
  );
}


export default Button;