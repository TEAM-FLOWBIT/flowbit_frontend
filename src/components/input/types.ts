import {
  FieldValues,
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormSetError,
} from "react-hook-form";

export interface InputProps {
  title: string;
  placeholder: string;
  name: string;
  register: any;
  rules?: RegisterOptions;
  errors: DeepMap<FieldValues, FieldError>;
  type?: string;
  accept?: string;
  setError?: UseFormSetError<FormValues>;
}

export interface FormValues {
  userId: string;
  randomNumber: string;
  password: string;
  name: string;
  phone: string;
  profileFile: FileList;
}
