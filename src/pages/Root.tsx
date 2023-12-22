import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Predict from './predict/Predict';
import styled from 'styled-components';
import { useGetMemberInfo } from '../hooks/services/queries/authHook';
import { initialMemberInfo } from '../hooks/context/authHook';
import { useUpdateVisitorMutation } from '../hooks/services/mutations/visitorHook';
import { getCookie, setCookie } from '../utils/Cookies';
// import { InitializeGoogleAnalytics } from '../hooks/services/google/analytices';

const RootLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
  min-height: 100vh;
`;

export interface IMember {
  auth: string;
  memberInfo: {
    id: number;
    name: string;
    phone: string;
    email: string;
    nickname: string;
    profile: string;
  };
}

export const IMG_URL = 'https://likelionvideo.s3.ap-northeast-2.amazonaws.com/';

interface IMemberContext {
  member: IMember;
  setMember: React.Dispatch<React.SetStateAction<IMember>>;
}

export const MemberContext = createContext<IMemberContext>({
  member: {
    auth: '',
    memberInfo: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      nickname: '',
      profile: '',
    },
  },
  setMember: function (value: React.SetStateAction<IMember>): void {
    throw new Error('Function not implemented.');
  },
});

function Root() {
  const [member, setMember] = useState<IMember>(initialMemberInfo);

  const outlet = useOutlet();

  const getMemberInfo = useCallback(useGetMemberInfo, []);

  const { accessToken, memberInfo, isSucess } = getMemberInfo();

  const { updateVisitorMutation } = useUpdateVisitorMutation();

  // TODO Google Analytics 연동
  // useEffect(() => {
  //   InitializeGoogleAnalytics();
  // }, []);

  // TODO 방문자 수 업데이트
  useEffect(() => {
    const isVisited = getCookie('isVisited');
    // isVisited 쿠키 값이 없을 경우
    if (!isVisited) {
      // 현재 날짜와 시간을 가져옵니다.
      const now = new Date();

      // 다음 날의 날짜와 시간을 계산합니다.
      const nextDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      nextDate.setHours(0);
      nextDate.setMinutes(0);

      updateVisitorMutation.mutate();

      setCookie('isVisited', true, {
        expires: nextDate,
      });
    }
  }, [updateVisitorMutation]);

  useEffect(() => {
    isSucess &&
      setMember({
        auth: accessToken,
        memberInfo,
      });
  }, [accessToken, memberInfo, isSucess]);

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      <RootLayout>
        <Header />
        {outlet || <Predict />}
        <Footer />
      </RootLayout>
    </MemberContext.Provider>
  );
}

export default Root;
