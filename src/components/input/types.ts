import {
  FieldValues,
  RegisterOptions,
  DeepMap,
  FieldError,
} from 'react-hook-form';

export interface InputProps {
  title: string;
  placeholder: string;
  name: string;
  register: any;
  rules?: RegisterOptions;
  errors: DeepMap<FieldValues, FieldError>;
  type?: string;
}

export interface FormValues {
  userId: string;
  password: string;
  name: string;
  phone: string;
  profileFile: FileList;
}
