import styled from "styled-components";
import { BaseInputProps, ListInputItemProps } from "./types";
import { ReactComponent as ErrorIcon } from "../../assets/ErrorIcon.svg";
import { ReactComponent as ImageBox } from "../../assets/ImageBox.svg";

const BaseInputLayout = styled.div`
  position: relative;
`;

const BaseInput = styled.input<BaseInputProps>`
  width: 84.6rem;
  height: 6rem;
  border: none;
  outline: none;
  border-bottom: 0.1rem solid
    ${(props) => (props.hasError ? "#FA00FF" : "#48519b")};
  font-family: Pretendard;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  background-color: transparent;
  box-sizing: border-box;
  padding-left: 15.1rem;
  padding-right: ${(props) => (props.withNumber ? "12.4rem" : "4rem")};
  &::placeholder {
    color: #5b5f8a;
  }
  &:focus {
    outline: none;
  }
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const LargeInput = styled.textarea<BaseInputProps>`
  width: 84.6rem;
  height: 12rem;
  max-height: 12rem;
  border: none;
  outline: none;
  border-bottom: 0.1rem solid
    ${(props) => (props.hasError ? "#FA00FF" : "#48519b")};
  color: #fff;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  background-color: transparent;
  box-sizing: border-box;
  padding-top: 2rem;
  padding-bottom: 2.8rem;
  padding-left: 15.1rem;
  padding-right: ${(props) => (props.withNumber ? "12.4rem" : "4rem")};
  resize: none;
  overflow: auto;
  &::placeholder {
    color: #5b5f8a;
  }
  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 0.6rem;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    border: 0.1rem solid #48519b;
    background: linear-gradient(93deg, #fa00ff, #0085ff);
  }

  &[type="file"] {
    color: transparent;
    pointer-events: none;
  }
`;

const BaseInputName = styled.h4<BaseInputProps>`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  color: ${(props) => (props.hasError ? "#FA00FF" : "#5b5f8a")};
  position: absolute;
  top: 2.1rem;
  left: 4rem;
`;

const BaseInputValueLength = styled.h4<BaseInputProps>`
  color: ${(props) => (props.hasError ? "#FA00FF" : "#5b5f8a")};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 2.1rem;
  right: 4rem;
`;

const BaseInputError = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin: 0.4rem 0 0 4rem;
  color: #fa00ff;
`;

const BaseInputImageBox = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 2rem;
  left: 15.2rem;
  input {
    display: none;
  }
  img,
  svg {
    width: 8rem;
    height: 8rem;
    border-radius: 0.6rem;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 1.6rem;
  height: 1.6rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function ListInputItem({
  images,
  setImages,
  ...props
}: ListInputItemProps) {
  const watchedValue = props.watch?.(props.name);

  const error = props.errors[props.name];
  const hasError = !!error;

  const ref = props.register(props.name, props.rules);

  // 이미지를 선택하고 미리보기를 생성하는 함수
  const handleImageChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        // 이미지 파일 검증을 추가
        if (file && !file.type.startsWith("image/")) {
          // setError 함수가 있는지 확인
          if (props.setError) {
            props.setError("images", {
              type: "fileType",
              message: "올바른 형태가 아닙니다",
            });
          }
          return;
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setImages?.((images) => {
            const newImages = [...images];
            newImages[index] = { file, preview: reader.result as string };
            return newImages;
          });
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    };

  const renderImageInput = (index: number) => {
    return (
      <label>
        {images?.[index]?.preview ? (
          <div style={{ position: "relative" }}>
            <img
              src={images?.[index]?.preview || undefined}
              alt="preview"
              tabIndex={0}
            />
            <DeleteButton
              onClick={(e) => {
                e.preventDefault();
                setImages?.((images) => {
                  const newImages = [...images];
                  newImages[index] = { file: null, preview: null };
                  return newImages;
                });
              }}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </DeleteButton>
          </div>
        ) : (
          <ImageBox style={{ cursor: "pointer" }} />
        )}
        <input
          key={images?.[index]?.preview}
          type="file"
          accept="image/*"
          onChange={handleImageChange(index)}
        />
      </label>
    );
  };

  return (
    <BaseInputLayout>
      <BaseInputName hasError={hasError}>{props.title}</BaseInputName>
      {props.size === "l" ? (
        <>
          <LargeInput
            {...ref}
            placeholder={props.placeholder}
            hasError={hasError}
            maxLength={props.maxLength}
            withNumber={props.withNumber}
            type={props.type}
          />
          {props.type === "file" && (
            <BaseInputImageBox>
              {renderImageInput(0)}
              {renderImageInput(1)}
            </BaseInputImageBox>
          )}
        </>
      ) : (
        <BaseInput
          {...ref}
          placeholder={props.placeholder}
          hasError={hasError}
          maxLength={props.maxLength}
          withNumber={props.withNumber}
          type={props.type}
        />
      )}
      {props.withNumber && (
        <BaseInputValueLength hasError={hasError}>
          ({watchedValue?.length || 0}/40)
        </BaseInputValueLength>
      )}
      {error && (
        <BaseInputError>
          <ErrorIcon />
          {error?.message}
        </BaseInputError>
      )}
    </BaseInputLayout>
  );
}
