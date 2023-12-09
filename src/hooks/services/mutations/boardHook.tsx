import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QueryKey } from '../QueryKey';

export function useDeleteBoardMutation() {
  const queryClient = useQueryClient();

  const deleteBoardMutation = useMutation({
    mutationFn: ({ auth, boardId }: { auth: string; boardId: number }) => {
      return axios.delete(`/user-service/api/v1/board/${boardId}`, {
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

  return { deleteBoardMutation };
}
