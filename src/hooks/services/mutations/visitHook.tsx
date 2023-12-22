import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useUpdateVisitorMutation() {
  const updateVisitorMutation = useMutation({
    mutationFn: () => {
      return axios.post('/user-service/api/v1/visitor', null, {
        withCredentials: true,
      });
    },
  });

  return { updateVisitorMutation };
}
