import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IMember, MemberContext } from '../../pages/Root';

export function useMember() {
  return useContext(MemberContext);
}

export function useGetAccessTokenByRefreshToken(
  setMember: React.Dispatch<React.SetStateAction<IMember>>
) {
  // TODO refech 옵션들 추후 추가 예정
  const getAccessTokenMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/renew-access-token',
        null,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(response: any) {
      setMember((prev) => {
        return {
          ...prev,
          auth: response.data.accessToken,
        };
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  return { getAccessTokenMutation };
}

export function useGetMemberInfoByAccessToken(
  setMember: React.Dispatch<React.SetStateAction<IMember>>
) {
  const getMemberInfoMutation = useMutation({
    mutationFn: (auth: string) => {
      return axios.post('/user-service/api/v1/member/info', null, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
    },
    onSuccess(response) {
      console.log(response.data);
    },
    onError(error) {
      console.log(error);
    },
  });

  return { getMemberInfoMutation };
}
