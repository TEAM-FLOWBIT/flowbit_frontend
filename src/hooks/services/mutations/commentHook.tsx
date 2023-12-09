import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QueryKey } from '../QueryKey';

export function useInsertCommentMutation() {
  const queryClient = useQueryClient();

  const insertCommentMutation = useMutation({
    mutationFn: ({
      auth,
      formData,
    }: {
      auth: string;
      formData: { boardId: number; content: string };
    }) => {
      return axios.post('/user-service/api/v1/board/comment', formData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
    },
    onSuccess: () => {
      // TODO refetching이 아닌 단순 데이터 삭제로 로직 변경 예정
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

  return { insertCommentMutation };
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId, auth }: { commentId: number; auth: string }) => {
      return axios.delete(`/user-service/api/v1/board/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
    },
    onSuccess: () => {
      // TODO refetching이 아닌 단순 데이터 삭제로 로직 변경 예정
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMMUNITY],
      });

      alert('성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error);

      alert('현재 서버에 문제가 있습니다.');
    },
  });

  return { deleteCommentMutation };
}
