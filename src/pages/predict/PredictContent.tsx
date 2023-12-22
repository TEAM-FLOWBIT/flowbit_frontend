import styled from 'styled-components';
import ProgressCircle from './ProgressCircle';
import Chart, { ChartType } from '../../utils/Chart';
import { useEffect } from 'react';
import {
  useGetAnalysisDataQuery,
  useGetChartDataQuery,
} from '../../hooks/services/queries/chartHook';

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
  overflow: hidden;
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

const PredictResult = styled.div`
  box-sizing: border-box;
  overflow-y: hidden;
  padding: 3rem 2rem 3rem 2rem;
  border-radius: 1.5rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
`;

const PredictText = styled.pre`
  white-space: pre-wrap;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
  height: 16.6rem;
  max-height: 16.6rem;
  width: 51rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.6rem;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    border: 0.1rem solid #48519b;
    background: linear-gradient(93deg, #fa00ff, #0085ff);
  }
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

const setChart = (chartData: ChartType) => {
  const chart = new Chart(chartData);

  chart.render();
};

export default function PredictContent({
  predictData,
  actualData,
}: {
  predictData: string;
  actualData: string;
}) {
  // 차트 데이터 가지고 오기
  const getChartDataResponse = useGetChartDataQuery();

  // 분석 결과 가지고 오기
  const getAnalysisDataResposne = useGetAnalysisDataQuery();

  useEffect(() => {
    if (getChartDataResponse.isSuccess) {
      setChart(getChartDataResponse.data);
    }
  }, [getChartDataResponse.data, getChartDataResponse.isSuccess]);

  return (
    <PredictContentLayout>
      <PredictContentWrapper>
        <PredictGraphContainer>
          <PredictContentTitle>BTC 예측 그래프</PredictContentTitle>
          <PredictGraphBox>
            <div id="flowbitChart"></div>
          </PredictGraphBox>
        </PredictGraphContainer>
        <PredictContentContainer>
          <PredictContentBox>
            <PredictContentTitle>Chat gpt의 분석결과</PredictContentTitle>
            <PredictResult>
              <PredictText>
                {getAnalysisDataResposne.isSuccess
                  ? getAnalysisDataResposne.data.gpt_response
                  : null}
              </PredictText>
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
                    <span>{predictData} </span>&nbsp;KRW
                  </PredictBTCTextBig>
                  <PredictBTCText>
                    오늘의 BTC&nbsp;<span>{actualData} </span>&nbsp;KRW
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
