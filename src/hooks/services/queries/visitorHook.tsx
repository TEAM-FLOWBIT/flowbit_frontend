import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../QueryKey';
import axios from 'axios';

export function UseGetVisitorQuery() {
  return useQuery({
    queryKey: [QueryKey.VISITOR],
    queryFn: () => {
      return axios.get('/user-service/api/v1/visitor');
    },
    select(data) {
      return data.data.data;
    },
  });
}
