import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Predict from './predict/Predict';
import styled from 'styled-components';
import { useGetMemberInfo } from '../hooks/services/queries/authHook';
import { initialMemberInfo } from '../hooks/context/authHook';
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

  // TODO Google Analytics 연동
  // useEffect(() => {
  //   InitializeGoogleAnalytics();
  // }, []);

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
