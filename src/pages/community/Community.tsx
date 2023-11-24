import styled from "styled-components";
import Header from "../../components/header/Header";
import List from "../../components/list/List";
import { useState } from "react";
import { items } from "./data";
import Pagination from "./Pagination";
import ListInput from "../../components/listInput/ListInput";
import { useForm } from "react-hook-form";
import { ListFormValues } from "../../components/listInput/types";
import { SizeButton } from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

const CommunityLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
  min-height: 100vh;
`;

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.4rem 0 20rem;
  margin: 0 auto;
`;

const CommunityBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommunityListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommunityTitle = styled.h2`
  display: flex;
  color: #d9d9d9;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 3rem;
`;

const CommunityListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 6rem;
`;

const CommunityForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const CommunityBtn = styled.div`
  display: flex;
  gap: 1.4rem;
`;

export default function Community() {
  // 상태로 현재 페이지를 추적
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 항목 수

  const {
    register: formRegister,
    handleSubmit: formSubmit,
    formState: { errors: formErrors, isValid: formIsValid },
    watch: titleWatch,
    setError,
    reset,
  } = useForm<ListFormValues>();

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // 현재 페이지의 항목만 필터링
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 이동 함수
  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleRegister = (data: ListFormValues) => {
    const files = images.map((image) => image.file);
    data.images = files;
    alert(JSON.stringify(data, null, 2));
    handleReset();
  };

  const [images, setImages] = useState<
    { file: File | null; preview: string | null }[]
  >([
    { file: null, preview: null },
    { file: null, preview: null },
  ]);

  const handleReset = () => {
    setImages([
      { file: null, preview: null },
      { file: null, preview: null },
    ]);
    reset(); // 리액트 훅 폼 초기화
  };

  return (
    <CommunityLayout>
      <Header />
      <CommunityContainer>
        <CommunityBox>
          <CommunityTitle>커뮤니티</CommunityTitle>
          <CommunityListContainer>
            <CommunityListBox>
              {currentItems.map((item) => (
                <List key={item.rid} {...item} />
              ))}
            </CommunityListBox>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
            />
          </CommunityListContainer>
          <CommunityForm onSubmit={formSubmit(handleRegister)}>
            <ListInput
              register={formRegister}
              errors={formErrors}
              watch={titleWatch}
              setError={setError}
              images={images}
              setImages={setImages}
            />
            <CommunityBtn>
              <SizeButton size="m" type="reset" onClick={handleReset}>
                취소
              </SizeButton>
              <SizeButton size="m" type="submit" disabled={!formIsValid}>
                등록
              </SizeButton>
            </CommunityBtn>
          </CommunityForm>
        </CommunityBox>
      </CommunityContainer>
      <Footer />
    </CommunityLayout>
  );
}
