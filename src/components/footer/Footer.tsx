import styled from 'styled-components';

const FooterLayout = styled.footer`
  padding: 2.4rem 12.3rem 4.6rem;
  border-top: 0.1rem solid #5058a9;
`;

const FooterMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 7.7rem;
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
`;

const FooterContent = styled.div`
  margin-top: 10rem;
  margin-bottom: 6rem;
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
`;

const FooterDesc = styled.div`
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
  display: grid;
  gap: 2.5rem;
`;

const FooterTitle = styled.div`
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;

  margin-bottom: 2.5rem;
`;

export default function Footer() {
  return (
    <FooterLayout>
      <FooterMenu>
        <span>대표 FLOWBIT</span>
        <span>제작 FLOWBIT</span>
        <span>채널톡 copyright 2023 FLOW-BIT</span>
      </FooterMenu>
      <FooterContent>
        <FooterTitle>FLOWBIT 법적 고지</FooterTitle>
        <FooterDesc>
          <span>
            * FLOW-BIT은 가상자산 투자를 위한 예측가격과 실시간 뉴스만을
            제공하며, 투자를 유도하지 않습니다.
          </span>
          <span>
            * FLOW-BIT은 전날까지의 종가를 사용해 예측을 진행합니다. 따라서
            당일에 일어난 급격한 시세 변동 상황은 적용되지 않을 수 있으니
            유의하시기 바랍니다.
          </span>
          <span>
            * FLOW-BIT은 어떠한 투자 손실에도 법적인 책임을 지지 않습니다.
          </span>
        </FooterDesc>
      </FooterContent>
    </FooterLayout>
  );
}
