import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Predict from './predict/Predict';
import styled from 'styled-components';
import { useGetMemberInfo } from '../hooks/services/queries/auth';

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

interface IMemberContext {
  member?: IMember;
  setMember?: React.Dispatch<React.SetStateAction<IMember>>;
}

export const MemberContext = createContext<IMemberContext>({});

function Root() {
  const [member, setMember] = useState<IMember>({
    memberInfo: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      nickname: '',
      profile: '',
    },
    auth: '',
  });

  const outlet = useOutlet();

  const getMemberInfo = useCallback(useGetMemberInfo, []);

  const { accessToken, memberInfo } = getMemberInfo();

  useEffect(() => {
    setMember({
      auth: accessToken,
      memberInfo,
    });
  }, [accessToken, memberInfo]);

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
