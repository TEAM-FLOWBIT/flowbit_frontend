import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormSetError,
} from "react-hook-form";

export interface BaseInputProps {
  hasError?: boolean;
  withNumber?: boolean;
  preview?: string | null;
}

export interface ListInputProps {
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
  watch?: (name?: string) => any;
  setError?: UseFormSetError<ListFormValues>;
  images?: { file: File | null; preview: string | null }[];
  setImages?: Dispatch<
    SetStateAction<{ file: File | null; preview: string | null }[]>
  >;
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
  pictures: (File | null)[];
  price: number;
}
