import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import ListInput from '../../components/listInput/ListInput';
import { useForm } from 'react-hook-form';
import { ListFormValues } from '../../components/listInput/types';
import { SizeButton } from '../../components/button/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListProps } from '../../components/list/types';
import { useMember } from '../../hooks/context/authHook';
import axios from 'axios';
import {
  CommunityBox,
  CommunityBtn,
  CommunityContainer,
  CommunityForm,
  CommunityLayout,
  CommunityListBox,
  CommunityListContainer,
  CommunityTitle,
} from './styled';
import { QueryKey } from '../../hooks/services/QueryKey';

export default function Community() {
  const { member } = useMember();

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
    queryKey: [QueryKey.COMMUNITY, currentPage],
    queryFn: () => CommunityQuery(currentPage),
  });

  const CommunityMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post('/user-service/api/v1/board', formData, {
        headers: {
          Authorization: `Bearer ${member?.auth}`,
        },
      });
    },
    onSuccess: () => {
      handleReset();
      // TODO refetching이 아닌 단순 데이터 추가로 로직 변경 예정
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMMUNITY],
      });

      alert('성공적으로 등록되었습니다.');
    },
    onError: (error) => {
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

  useEffect(() => {
    if (data && data.data.content.length < 6) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [data]);

  return (
    <CommunityLayout>
      <CommunityContainer>
        <CommunityBox>
          <CommunityTitle>커뮤니티</CommunityTitle>
          <CommunityListContainer>
            <CommunityListBox>
              {isSuccess &&
                data?.data.content.map((item: ListProps) => (
                  <List
                    key={item.boardId}
                    {...item}
                    mine={
                      member?.memberInfo?.id
                        ? item.memberId === member?.memberInfo.id
                        : false
                    }
                  />
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
              {isSuccess && (
                <>
                  <SizeButton size="m" type="reset" onClick={handleReset}>
                    취소
                  </SizeButton>
                  <SizeButton size="m" type="submit" disabled={!formIsValid}>
                    등록
                  </SizeButton>
                </>
              )}
            </CommunityBtn>
          </CommunityForm>
        </CommunityBox>
      </CommunityContainer>
    </CommunityLayout>
  );
}
