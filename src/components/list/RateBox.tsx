import styled from "styled-components";
import { RateBoxProps } from "./types";

const RateBoxLayout = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
  width: 23rem;
  height: 12rem;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
`;

const RateBoxPrice = styled.hgroup`
  color: #5b5f8a;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: normal;
  display: flex;
  flex-direction: column;
`;

const RateBoxRate = styled.h2`
  color: #fa00ff;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: normal;
`;

export default function RateBox({ price, rate }: RateBoxProps) {
  return (
    <RateBoxLayout>
      <RateBoxPrice>
        <span>매수가</span>
        <span>{price} KRW</span>
      </RateBoxPrice>
      <RateBoxRate>수익률 {rate}%</RateBoxRate>
    </RateBoxLayout>
  );
}
