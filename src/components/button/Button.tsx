import styled from "styled-components";
import { ButtonProps } from "./types";

const LoginButton = styled.button<ButtonProps>`
  width: 48rem;
  height: 7rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: ${(props) =>
    props.disabled
      ? "rgba(74, 92, 119, 0.35)"
      : "linear-gradient(91deg, rgba(240, 6, 255, 0.40) 0.43%, rgba(16, 124, 255, 0.40) 111.85%)"};
  color: ${(props) => (props.disabled ? "#5B5F8A" : "#fff")};
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  line-height: normal;
  border: none;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(
      91deg,
      rgba(240, 6, 255, 0.8) 0.43%,
      rgba(16, 124, 255, 0.8) 111.85%
    );
  }
`;

const BaseButton = styled.button<ButtonProps>`
  width: ${(props) => (props.size === "s" ? "8rem" : "16rem")};
  height: ${(props) => (props.size === "s" ? "3rem" : "5rem")};
  text-align: center;
  border-radius: ${(props) => (props.size === "s" ? "0.4rem" : "1rem")};
  font-family: Pretendard Variable;
  font-size: ${(props) => (props.size === "s" ? "1.2rem" : "1.5rem")};
  font-weight: 500;
  line-height: normal;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterButton = styled(BaseButton)`
  background: ${(props) =>
    props.disabled
      ? "rgba(74, 92, 119, 0.35)"
      : "linear-gradient(91deg, rgba(240, 6, 255, 0.40) 0.43%, rgba(16, 124, 255, 0.40) 111.85%)"};
  color: ${(props) => (props.disabled ? "#5B5F8A" : "#fff")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  &:hover {
    background: linear-gradient(
      91deg,
      rgba(240, 6, 255, 0.8) 0.43%,
      rgba(16, 124, 255, 0.8) 111.85%
    );
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled(BaseButton)`
  background: transparent;
  border: 0.1rem solid #b2b7ec;
  color: #b2b7ec;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Button({ children, ...props }: ButtonProps) {
  return <LoginButton {...props}>{children}</LoginButton>;
}

export function SizeButton({
  children,
  size,
  type,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <>
      {type === "submit" ? (
        <RegisterButton
          size={size}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {children}
        </RegisterButton>
      ) : (
        <DeleteButton size={size} type={type} onClick={onClick}>
          {children}
        </DeleteButton>
      )}
    </>
  );
}
