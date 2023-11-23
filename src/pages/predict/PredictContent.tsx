import styled from "styled-components";
import ProgressCircle from "./ProgressCircle";

const PredictContentLayout = styled.div`
  padding: 18.4rem 0 19rem 0;
  display: flex;
  justify-content: center;
`;

const PredictContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.2rem;
  align-items: center;
`;

const PredictContentTitle = styled.h2`
  color: #d9d9d9;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: normal;
`;

const PredictGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  width: 100%;
`;

const PredictGraphBox = styled.article`
  width: 100%;
  height: 65.8636rem;
  border-radius: 1.5rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
`;

const PredictContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3.1rem;
`;

const PredictContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const PredictResult = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.1rem;
  width: 51rem;
  height: 23rem;
  padding: 0 2.21rem 0 4.85rem;
  border-radius: 1.5rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
`;

const PredictResultData = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

const DateValuePairGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const PredictBTC = styled.div`
  width: 65.7rem;
  height: 23rem;
  border-radius: 1.5rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
  display: flex;
  align-items: center;
`;

const PredictBTCGraphBox = styled.div`
  height: 18.5935rem;
  display: flex;
  margin: 0 auto;
  gap: 5.1rem;
`;

const PredictBTCGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  padding-right: 5.13rem;
  border-right: 0.1rem solid #48519b;
`;

const PredictBTCValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 2.6rem;
`;

const PredictBTCTextBig = styled.p`
  color: #fa00ff;
  font-size: 2rem;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  & > span {
    font-size: 4.5rem;
    font-weight: 600;
  }
`;

const PredictBTCText = styled.p`
  color: #fff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 200;
  display: flex;
  align-items: center;
  & > span {
    font-size: 3.5rem;
  }
`;

export default function PredictContent() {
  return (
    <PredictContentLayout>
      <PredictContentWrapper>
        <PredictGraphContainer>
          <PredictContentTitle>BTC 예측 그래프</PredictContentTitle>
          <PredictGraphBox />
        </PredictGraphContainer>
        <PredictContentContainer>
          <PredictContentBox>
            <PredictContentTitle>Chat gpt의 분석결과</PredictContentTitle>
            <PredictResult>
              <p>예측률을 계산해보겠습니다</p>
              <PredictResultData>
                <DateValuePairGroup>
                  <p>| 2014-01-12 | 3.15% |</p>
                  <p>| 2014-01-13 | 4.18% |</p>
                  <p>| 2014-01-14 | 0.31% |</p>
                  <p>| 2014-01-15 | 0.17% |</p>
                  <p>| 2014-01-16 | 1.65% |</p>
                </DateValuePairGroup>
                <DateValuePairGroup>
                  <p>| 2014-01-17 | 3.42%</p>
                  <p>| 2014-01-18 | 0.53%</p>
                  <p>| 2014-01-19 | 1.08%</p>
                  <p>| 2014-01-20 | 0.48%</p>
                  <p>| 2014-01-21 | 0.00%</p>
                </DateValuePairGroup>
              </PredictResultData>
              <span>
                예측률은 각 날짜별로 계산되며, 0%에 가까울수록 예측이 정확하다
                는 의미입니다. 더 높은 예측률은 더 부정확한 예측을 나타냅니다
              </span>
            </PredictResult>
          </PredictContentBox>
          <PredictContentBox>
            <PredictContentTitle>내일의 BTC</PredictContentTitle>
            <PredictBTC>
              <PredictBTCGraphBox>
                <PredictBTCGraph>
                  <ProgressCircle percentage={94} />
                  모델 적합도
                </PredictBTCGraph>
                <PredictBTCValue>
                  <PredictBTCTextBig>
                    <span>37,900,000 </span>&nbsp;KRW
                  </PredictBTCTextBig>
                  <PredictBTCText>
                    오늘의 BTC&nbsp;<span>37,900,000 </span>&nbsp;KRW
                  </PredictBTCText>
                </PredictBTCValue>
              </PredictBTCGraphBox>
            </PredictBTC>
          </PredictContentBox>
        </PredictContentContainer>
      </PredictContentWrapper>
    </PredictContentLayout>
  );
}
