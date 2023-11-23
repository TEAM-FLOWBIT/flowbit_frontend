import styled from "styled-components";

const FooterLayout = styled.footer`
  padding: 2.4rem 12.3rem 4.6rem;
  display: flex;
  justify-content: flex-end;
  border-top: 0.1rem solid #5058a9;
`;

const FooterMenu = styled.div`
  display: flex;
  gap: 7.7rem;
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
`;

export default function Footer() {
  return (
    <FooterLayout>
      <FooterMenu>
        <span>대표 FLOWBIT</span>
        <span>제작 FLOWBIT</span>
        <span>채널톡 copyright 2023 FLOW-BIT</span>
      </FooterMenu>
    </FooterLayout>
  );
}
