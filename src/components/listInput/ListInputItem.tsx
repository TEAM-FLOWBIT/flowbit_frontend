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
    width: 0.5rem;
    margin: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: blue;
    border-color: #48519b;
    border-radius: 1rem;
  }
  &[type="file"] {
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
    cursor: pointer;
    border-radius: 0.6rem;
  }
`;

export default function ListInputItem({
  images, // 이미지 상태 받아옴
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
            newImages[index] = reader.result as string;
            return newImages;
          });
          // 이미지 파일 자체를 Form 상태에 반영
          if (props.setValue) {
            const newImages = [...(props.watch?.("images") || [])];
            newImages[index] = file;
            props.setValue("images", newImages);
          }
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
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
              <label>
                {images?.[0] ? (
                  <img
                    src={images[0]}
                    alt="preview"
                    onClick={(e) => {
                      e.preventDefault();
                      setImages?.((images) => {
                        const newImages = [...images];
                        newImages[0] = null;
                        return newImages;
                      });
                      if (props.setValue && props.watch) {
                        const newImages = [...props.watch("images")];
                        newImages[0] = null;
                        props.setValue("images", newImages);
                      }
                    }}
                    tabIndex={0}
                  />
                ) : (
                  <ImageBox />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange(0)}
                />
              </label>
              <label>
                {images?.[1] ? (
                  <img
                    src={images[1]}
                    alt="preview"
                    onClick={(e) => {
                      e.preventDefault();
                      setImages?.((images) => {
                        const newImages = [...images];
                        newImages[1] = null;
                        return newImages;
                      });
                      if (props.setValue && props.watch) {
                        const newImages = [...props.watch("images")];
                        newImages[1] = null;
                        props.setValue("images", newImages);
                      }
                    }}
                    tabIndex={0}
                  />
                ) : (
                  <ImageBox />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange(1)}
                />
              </label>
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
