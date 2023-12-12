import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../QueryKey';
import axios from 'axios';
import { initialMemberInfo } from '../../context/authHook';

export const useGetAccessTokenByRefresh = () => {
  // TODO Error 처리 및 옵션 재설정
  const { data, isError, isSuccess } = useQuery({
    queryKey: [QueryKey.REFRESH],
    queryFn: () => {
      return axios.get(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/renew-access-token',
        {
          withCredentials: true,
        }
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    refetchInterval: 60 * 50 * 1000, // 50분마다 토큰 재발급
    refetchIntervalInBackground: true,
  });

  return { accessToken: data?.data.accessToken, isError, isSuccess };
};

export const useGetMemberByAccessToken = (accessToken: string) => {
  const { data, isError, isSuccess } = useQuery({
    queryKey: [QueryKey.MEMBER],
    queryFn: () => {
      return axios.get('/user-service/api/v1/member/info', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    enabled: !!accessToken,
  });

  return { memberInfo: data?.data.data, isError, isSuccess };
};

export const useGetMemberInfo = () => {
  let accessResponse = useGetAccessTokenByRefresh();
  let memberResponse = useGetMemberByAccessToken(accessResponse.accessToken);

  // return {
  //   accessToken: accessResponse.accessToken,
  //   memberInfo: memberResponse.memberInfo,
  //   isSucess: accessResponse.isSuccess && memberResponse.isSuccess,
  // };

  // Refresh만 성공하면 member 조회는 될 것이라고 예상하고 코드를 짠 형태
  return {
    accessToken: accessResponse.accessToken,
    memberInfo: memberResponse.memberInfo,
    isSucess: accessResponse.isSuccess,
  };
};
