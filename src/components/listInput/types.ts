import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormSetValue,
  UseFormSetError,
} from "react-hook-form";

export interface BaseInputProps {
  hasError?: boolean;
  withNumber?: boolean;
}

export interface ListInputProps {
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
  watch?: (name?: string) => any;
  setValue?: UseFormSetValue<ListFormValues>;
  setError?: UseFormSetError<ListFormValues>;
  images?: (string | null)[];
  setImages?: Dispatch<SetStateAction<(string | null)[]>>;
}

export interface ListInputItemProps extends ListInputProps {
  withNumber?: boolean;
  title: string;
  placeholder: string;
  name: keyof ListFormValues;
  rules?: RegisterOptions;
  type?: string;
  maxLength?: number;
  size?: "s" | "l";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ListFormValues {
  title: string;
  content: string;
  images: (string | null)[];
  price: number;
}
