import styled from 'styled-components';
import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import ListInput from '../../components/listInput/ListInput';
import { useForm } from 'react-hook-form';
import { ListFormValues } from '../../components/listInput/types';
import { SizeButton } from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListProps } from '../../components/list/types';
import { useAuth } from '../../hooks/context/auth';
import axios from 'axios';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const {
    register: formRegister,
    handleSubmit: formSubmit,
    formState: { errors: formErrors, isValid: formIsValid },
    watch: titleWatch,
    setError,
    reset,
  } = useForm<ListFormValues>();

  const [images, setImages] = useState<
    { file: File | null; preview: string | null }[]
  >([
    { file: null, preview: null },
    { file: null, preview: null },
  ]);

  // 페이지 이동 함수
  const goToNextPage = async () => {
    const nextPage = currentPage + 1;
    const nextPageData = await CommunityQuery(nextPage);
    if (nextPageData && nextPageData.data.content.length > 0) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage !== 0) {
      setCurrentPage((page) => Math.max(page - 1, 0));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setImages([
      { file: null, preview: null },
      { file: null, preview: null },
    ]);
    reset(); // 리액트 훅 폼 초기화
  };

  const queryClient = useQueryClient();

  const CommunityQuery = async (page: number) => {
    const response = await fetch(
      `https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/board?page=${page}&size=6`
    );
    const data = await response.json();
    return data;
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['community', currentPage],
    queryFn: () => CommunityQuery(currentPage),
  });

  useEffect(() => {
    if (data && data.data.content.length < 6) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [data]);

  const { auth } = useAuth();

  const CommunityMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post('/user-service/api/v1/board', formData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
    },
    onSuccess: () => {
      handleReset();
      // TODO Tag Community 데이터 추가
      queryClient.invalidateQueries({
        queryKey: ['community'],
      });

      alert('성공적으로 등록되었습니다.');
    },
    onError: (error) => {
      console.log(auth);
      console.log(error);

      alert('현재 서버에 문제가 있습니다.');
    },
  });

  const handleRegister = (data: ListFormValues) => {
    let formData = new FormData();

    const files = images.map((image) => image.file);
    data.pictures = files;

    formData.append('title', data.title);
    formData.append('content', data.content);
    data.pictures[0] && formData.append('pictures', data.pictures[0]);
    data.pictures[1] && formData.append('pictures', data.pictures[1]);
    CommunityMutation.mutate(formData);
  };

  return (
    <CommunityLayout>
      <CommunityContainer>
        <CommunityBox>
          <CommunityTitle>커뮤니티</CommunityTitle>
          <CommunityListContainer>
            <CommunityListBox>
              {isSuccess &&
                data?.data.content.map((item: ListProps) => (
                  <List key={item.boardId} {...item} />
                ))}
            </CommunityListBox>
            <Pagination
              isFirstPage={currentPage === 0}
              isLastPage={isLastPage}
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
    </CommunityLayout>
  );
}
