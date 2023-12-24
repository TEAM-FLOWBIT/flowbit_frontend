import { Suspense, useState } from 'react';
import ListInput from '../../components/listInput/ListInput';
import { useForm } from 'react-hook-form';
import { ListFormValues } from '../../components/listInput/types';
import { SizeButton } from '../../components/button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMember } from '../../hooks/context/authHook';
import axios from 'axios';
import {
  CommunityBox,
  CommunityBtn,
  CommunityContainer,
  CommunityForm,
  CommunityLayout,
  CommunityListContainer,
  CommunityTitle,
} from './styled';
import { QueryKey } from '../../hooks/services/QueryKey';
import CommunityList from '../../components/community/CommunityList';
import CommunityListSkeleton from '../../components/community/CommunityListSkeleton';

export default function Community() {
  const { member } = useMember();

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

  const handleReset = () => {
    setImages([
      { file: null, preview: null },
      { file: null, preview: null },
    ]);
    reset(); // 리액트 훅 폼 초기화
  };

  const queryClient = useQueryClient();

  const useInsertCommunityMutation = useMutation({
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
    if (member.auth === '') {
      alert('로그인를 먼저 진행해주세요.');
      return;
    }
    let formData = new FormData();

    const files = images.map((image) => image.file);
    data.pictures = files;

    formData.append('title', data.title);
    formData.append('content', data.content);
    data.pictures[0] && formData.append('pictures', data.pictures[0]);
    data.pictures[1] && formData.append('pictures', data.pictures[1]);
    useInsertCommunityMutation.mutate(formData);
  };

  return (
    <CommunityLayout>
      <CommunityContainer>
        <CommunityBox>
          <CommunityTitle>커뮤니티</CommunityTitle>
          <CommunityListContainer>
            <Suspense fallback={<CommunityListSkeleton />}>
              <CommunityList />
            </Suspense>
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
