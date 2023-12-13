import styled from "styled-components";
import { InputProps } from "./types";
import { ReactComponent as ErrorIcon } from "../../assets/ErrorIcon.svg";
import { BaseInputProps } from "../listInput/types";
import { useState } from "react";
import { ReactComponent as ImageBox } from "../../assets/ImageBoxL.svg";
import { IMG_URL } from "../../pages/Root";

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
  svg {
    cursor: pointer;
  }
`;

const DefaultInput = styled.input<BaseInputProps>`
  box-sizing: border-box;
  width: 48rem;
  height: 7rem;
  border-radius: 1rem;
  border: 0.1rem solid ${(props) => (props.hasError ? "#fa00ff" : "#48519b")};
  background: ${(props) =>
    props.hasError ? "rgba(250, 0, 255, 0.1)" : "rgba(37, 57, 88, 0.35)"};
  padding: 2.6rem 0 2.6rem 2rem;
  font-family: Pretendard;
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

const DefaultInputError = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin: 0.4rem 0 0 1.8rem;
  color: #fa00ff;
`;

const ProfileInput = styled.label<BaseInputProps>`
  position: relative;
  width: 16rem;
  height: 16rem;
  svg {
    position: absolute;
    z-index: 2;
    path {
      stroke: ${(props) => (props.preview ? "white" : "#48519B")};
    }
  }
`;

const PreviewImage = styled.img`
  width: 16rem;
  height: 16rem;
  border-radius: 1rem;
  cursor: pointer;
`;

export default function Input({
  title,
  placeholder,
  name,
  register,
  rules,
  errors,
  type = "text",
  accept,
  setError,
  initialProfileImage,
}: InputProps) {
  const profileURL =
    initialProfileImage !== "flowbit-default-profile.png"
      ? IMG_URL + initialProfileImage
      : null;

  const error = errors[name];

  const [preview, setPreview] = useState<string | null>(profileURL || null);

  const ref = register(name, rules);

  // 이미지 미리보기 설정 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && !file.type.startsWith("image/")) {
        if (setError) {
          setError("profileFile", {
            type: "fileType",
            message: "올바른 형태가 아닙니다",
          });
        }
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <InputLayout>
      <span>{title}</span>
      {type === "file" ? (
        <ProfileInput preview={preview} hasError={!!error}>
          <DefaultInput
            {...ref}
            type={type}
            placeholder={placeholder}
            hasError={!!error}
            onChange={handleFileChange}
            hidden
            accept={accept}
          />
          <ImageBox />
          {preview && <PreviewImage src={preview} />}
        </ProfileInput>
      ) : (
        <DefaultInput
          {...ref}
          type={type}
          placeholder={placeholder}
          hasError={!!error}
        />
      )}
      {error && (
        <DefaultInputError>
          <ErrorIcon />
          {error?.message}
        </DefaultInputError>
      )}
    </InputLayout>
  );
}
