import React from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Predict from './predict/Predict';
import styled from 'styled-components';

const RootLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
  min-height: 100vh;
`;

function Root() {
  const outlet = useOutlet();
  return (
    <>
      <RootLayout>
        <Header />
        {outlet || <Predict />}
        <Footer />
      </RootLayout>
    </>
  );
}

export default Root;
