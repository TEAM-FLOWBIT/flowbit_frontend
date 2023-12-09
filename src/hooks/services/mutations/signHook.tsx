import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useMember } from '../../context/authHook';
import axios from 'axios';

export function UseSignMutation() {
  const navigate = useNavigate();
  const { setMember } = useMember();

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
    onSuccess(response: any) {
      setMember &&
        setMember((prev) => {
          return { ...prev, auth: response.data.accessToken };
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
      return fetch(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            throw new Error('이메일 인증번호가 유효하지 않습니다.');
          } else if (response.status === 409) {
            throw new Error('이미 존재하는 아이디입니다.');
          } else {
            throw new Error('서버 에러입니다.');
          }
        })
        .then(() => {
          navigate('/login');
        });
    },
  });

  return {
    signInMutation,
    signUpMutaion,
  };
}
export function signIn() {}
