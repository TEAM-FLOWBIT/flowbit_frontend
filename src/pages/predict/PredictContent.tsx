import styled from 'styled-components';
import ProgressCircle from './ProgressCircle';
import Chart, { ChartDataType, ChartType } from '../../utils/Chart';
import { useEffect, useState } from 'react';
import {
  IChartDataResponse,
  chartDataParser,
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.1rem;
  width: 51rem;
  height: 23rem;
  max-height: 23rem;
  overflow-y: auto;
  padding: 3.2rem 2.21rem 3.2rem 4.85rem;
  border-radius: 1.5rem;
  border: 1px solid #48519b;
  background: rgba(37, 57, 88, 0.35);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;
  box-sizing: border-box;
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

const PredictResultData = styled.div`
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

const setChart = (chartData: ChartType) => {
  const chart = new Chart(chartData);

  chart.render();
};

export default function PredictContent({
  chartDatas,
}: {
  chartDatas: ChartDataType[];
}) {
  const [isFirst, setIsFirst] = useState<boolean>(true);

  useEffect(() => {
    if (isFirst) {
      const testData: IChartDataResponse = {
        datas: [
          {
            datas: [
              49576000, 49075000, 48238000, 49212000, 48683000, 49128000,
              48992000, 49788000, 49218000, 49025000, 49779000, 50595000,
              50429000, 50021000, 49536000, 50064000, 50692000, 50479000,
              51383000, 51755000, 53087000, 56354000, 57666000, 60630000,
              59464000, 59884000, 60102000, 59892000, 57392000, 56939000,
            ],
            label: '실제 BTC',
          },
          {
            datas: [
              49302412.0, 49465652.0, 48999032.0, 48144672.0, 49256452.0,
              48782848.0, 49157744.0, 49030872.0, 49830016.0, 49196528.0,
              48943784.0, 49777376.0, 50630756.0, 50456228.0, 49921932.0,
              49423996.0, 50072140.0, 50767156.0, 50486940.0, 51387336.0,
              51794688.0, 53107272.0, 56234128.0, 57903556.0, 60789600.0,
              59547000.0, 59491428.0, 59781540.0, 59603888.0, 56965148.0,
              56722248.0,
            ],
            label: '예측 BTC',
          },
        ],
        label: [
          '11-15',
          '11-17',
          '11-19',
          '11-21',
          '11-23',
          '11-25',
          '11-27',
          '11-29',
          '12-01',
          '12-03',
          '12-05',
          '12-07',
          '12-09',
          '12-11',
          '12-13',
        ],
        max: 64420742.4,
        min: 44513529.6,
      };
      setChart(chartDataParser(testData));
      setIsFirst(false);
    }
  }, [chartDatas, isFirst]);

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
