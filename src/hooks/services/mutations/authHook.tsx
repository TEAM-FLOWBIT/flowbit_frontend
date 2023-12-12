import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { initialMemberInfo, useMember } from '../../context/authHook';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { setMember } = useMember();

  const logoutMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/logout',
        {
          withCredentials: true,
        }
      );
    },
    onSuccess() {
      setMember(initialMemberInfo);
      alert('로그아웃 되었습니다.');
      navigate('/');
    },
    onError(error) {
      console.log(error);
      alert('예상치 못한 오류가 발생했습니다.');
    },
  });

  return { logoutMutation };
};
