import styled from "styled-components";
import { InputProps } from "./types";

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  & > span {
    margin-left: 1.8rem;
    color: #5058a9;
    font-size: 2rem;
    font-weight: 600;
    line-height: normal;
  }
`;

const DefaultInput = styled.input`
  box-sizing: border-box;
  width: 48rem;
  height: 7rem;
  border-radius: 1rem;
  border: 0.1rem solid #48519b;
  background: rgba(37, 57, 88, 0.35);
  padding: 2.6rem 0 2.6rem 2rem;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  &::placeholder {
    color: #5b5f8a;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: normal;
  }
`;

export default function Input({
  title,
  placeholder,
  name,
  register,
  rules,
  errors,
  type = "text",
}: InputProps) {
  const error = errors[name];

  const ref = register(name, rules);

  return (
    <InputLayout>
      <span>{title}</span>
      <DefaultInput
        {...ref}
        type={type}
        placeholder={placeholder}
        hasError={!!error}
      />
    </InputLayout>
  );
}
