import styled from "styled-components";
import ListInputItem from "./ListInputItem";
import { ListFormValues, ListInputProps } from "./types";
import { UseFormSetError } from "react-hook-form";

const ListInputLayout = styled.div`
  border-radius: 1.5rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
  overflow-x: hidden;
`;

export default function ListInput({
  register,
  errors,
  watch,
  setError,
  images, // 이미지 상태 받아옴
  setImages,
}: ListInputProps & { setError: UseFormSetError<ListFormValues> }) {
  return (
    <ListInputLayout>
      <ListInputItem
        withNumber
        title="제목"
        placeholder="제목을 입력하세요"
        name="title"
        register={register}
        errors={errors}
        maxLength={40}
        watch={watch}
        size="s"
        rules={{
          required: "제목을 입력해주세요!",
          maxLength: {
            value: 40,
            message: "제목은 40글자 이하 입력해주세요! ",
          },
        }}
      />
      <ListInputItem
        withNumber={false}
        title="내용"
        placeholder="내용을 입력하세요"
        name="content"
        register={register}
        errors={errors}
        size="l"
        rules={{
          required: "내용을 입력해주세요!",
        }}
      />
      <ListInputItem
        withNumber={false}
        title="사진"
        placeholder=""
        name="images"
        register={register}
        errors={errors}
        size="l"
        type="file"
        setError={setError}
        images={images}
        setImages={setImages}
      />
      <ListInputItem
        withNumber={false}
        title="매수가"
        placeholder="매수가를 입력하시면 수익률을 계산해드려요"
        name="price"
        register={register}
        errors={errors}
        size="s"
        type="number"
        rules={{
          pattern: {
            value: /^\d+$/,
            message: "올바른 형태가 아닙니다",
          },
        }}
      />
    </ListInputLayout>
  );
}
