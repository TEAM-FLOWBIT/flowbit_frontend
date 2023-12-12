import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { QueryKey } from '../QueryKey';

export function UseSignMutation() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/login',
        JSON.stringify(formData),
        {
          withCredentials: true,
        }
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.REFRESH],
      });
      alert('로그인 성공');
      navigate('/');
    },
    onError(error) {
      console.log(error);
    },
  });

  const signUpMutaion = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member',
        formData
      );
    },
    onSuccess: () => {
      alert('회원가입에 성공했습니다.');
      navigate('/');
    },
    onError: (error) => {
      alert('서버에 문제가 생겼습니다.');
      console.log(error);
    },
  });

  return {
    signInMutation,
    signUpMutaion,
  };
}
export function signIn() {}
