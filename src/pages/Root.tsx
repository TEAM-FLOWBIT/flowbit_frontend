import React, { createContext, useEffect, useState } from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Predict from './predict/Predict';
import styled from 'styled-components';
import { UseGetAccessTokenByRefreshToken } from '../hooks/context/auth';

const RootLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
  min-height: 100vh;
`;

interface IAuth {
  auth?: string;
  setAuth?: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<IAuth>({});

function Root() {
  const [auth, setAuth] = useState<string>('');
  const outlet = useOutlet();
  const { getAccessTokenMutation } = UseGetAccessTokenByRefreshToken({
    setAuth,
  });

  // accessToken 재발급
  useEffect(() => {
    // Todo Page를 리로드했거나 처음 들어왔을 때 실행
    if (auth === '') {
      getAccessTokenMutation.mutate();
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <RootLayout>
        <Header />
        {outlet || <Predict />}
        <Footer />
      </RootLayout>
    </AuthContext.Provider>
  );
}

export default Root;
