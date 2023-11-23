import {
  FieldValues,
  RegisterOptions,
  DeepMap,
  FieldError,
} from "react-hook-form";

export interface InputProps {
  title: string;
  placeholder: string;
  name: keyof FormValues;
  register: any;
  rules?: RegisterOptions;
  errors: DeepMap<FieldValues, FieldError>;
  type?: string;
}

export interface FormValues {
  id: string;
  password: string;
  name: string;
  number: string;
}
