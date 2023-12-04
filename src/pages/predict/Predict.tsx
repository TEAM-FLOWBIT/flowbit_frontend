import styled from 'styled-components';
import Header from '../../components/header/Header';
import PredictMain from './PredictMain';
import PredictContent from './PredictContent';
import Footer from '../../components/footer/Footer';
import { ChartDataType } from '../../utils/Chart';
import { useState } from 'react';

const PredictLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
  min-height: 100vh;
`;

let testMax = 50000000;
let testMin = 30000000;
const testDataList: ChartDataType[] = [
  {
    label: '실제 BTC',
    color: '#fff',
    width: 3,
    data: [
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
    ],
    min: testMin,
    max: testMax,
  },
  {
    label: '예측 BTC',
    customColor: () => {
      let ns = 'http://www.w3.org/2000/svg';
      // line
      const linearGradientTag = document.createElementNS(ns, 'linearGradient');
      linearGradientTag.setAttribute('gradientTransform', 'rotate(90)');

      const linearStop1 = document.createElementNS(ns, 'stop');
      linearStop1.setAttribute('stop-color', '#FA00FF');

      const linearStop2 = document.createElementNS(ns, 'stop');
      linearStop2.setAttribute('offset', '1');
      linearStop2.setAttribute('stop-color', '#0085FF');
      linearGradientTag.appendChild(linearStop1);
      linearGradientTag.appendChild(linearStop2);

      // legend
      const LegendGradientTag = document.createElementNS(ns, 'linearGradient');

      const legendStop1 = document.createElementNS(ns, 'stop');
      legendStop1.setAttribute('stop-color', '#FA00FF');

      const legendStop2 = document.createElementNS(ns, 'stop');
      legendStop2.setAttribute('offset', '1');
      legendStop2.setAttribute('stop-color', '#0085FF');
      LegendGradientTag.appendChild(legendStop1);
      LegendGradientTag.appendChild(legendStop2);

      // circle
      const radialGradientTag = document.createElementNS(ns, 'radialGradient');

      const radialStop1 = document.createElementNS(ns, 'stop');
      radialStop1.setAttribute('offset', '.3');
      radialStop1.setAttribute('stop-color', '#FA00FF');

      const radialStop2 = document.createElementNS(ns, 'stop');
      radialStop2.setAttribute('offset', '1');
      radialStop2.setAttribute('stop-opacity', '0');
      radialStop2.setAttribute('stop-color', '#FA00FF');

      radialGradientTag.appendChild(radialStop1);
      radialGradientTag.appendChild(radialStop2);

      return {
        border: linearGradientTag,
        lastPoint: radialGradientTag,
        legend: LegendGradientTag,
      };
    },
    width: 7,
    data: [
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
      Math.floor(Math.random() * (testMax - testMin) + testMin),
    ],
    min: testMin,
    max: testMax,
  },
];
export default function Predict() {
  const [chartDatas, setChartDatas] = useState<ChartDataType[]>(testDataList);
  return (
    <PredictLayout>
      <Header />
      <PredictMain />
      <PredictContent chartDatas={chartDatas} />
      <Footer />
    </PredictLayout>
  );
}
