import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../QueryKey';
import axios from 'axios';
import { ChartDataType, ChartType } from '../../../utils/Chart';

export interface IChartDataResponse {
  datas: {
    datas: number[]; // 차트에 들어가는 데이터 리스트
    label: string; // 데이터 리스트의 라벨 // 추후 legend로 이름 변경 필요
  }[];
  label: string[]; // x축에 들어가는 라벨
  max: number; // 차트의 최대 값
  min: number; // 차트의 최소 값
}

export function chartDataParser(
  chartDataResponse: IChartDataResponse
): ChartType {
  const chartData: ChartType = {
    targetId: 'flowbitChart',
    size: {
      width: 1500,
      height: 790,
      font: 15,
    },
    datas: [],
    labels: [],
  };
  const datas: ChartDataType[] = [];

  chartDataResponse.datas.forEach((element, i) => {
    let data: ChartDataType;

    if (i === 0) {
      // 흰색 차트 라인 생성
      data = {
        label: element.label,
        data: element.datas,
        width: 3,
        color: '#fff',
        min: chartDataResponse.min,
        max: chartDataResponse.max,
      };
    } else {
      // 그라데이션 차트 라인 생성
      data = {
        label: element.label,
        data: element.datas,
        width: 6,
        color: '#fff',
        min: chartDataResponse.min,
        max: chartDataResponse.max,
        customColor: () => {
          let ns = 'http://www.w3.org/2000/svg';
          // line
          const linearGradientTag = document.createElementNS(
            ns,
            'linearGradient'
          );
          linearGradientTag.setAttribute('gradientTransform', 'rotate(90)');

          const linearStop1 = document.createElementNS(ns, 'stop');
          linearStop1.setAttribute('stop-color', '#FA00FF');

          const linearStop2 = document.createElementNS(ns, 'stop');
          linearStop2.setAttribute('offset', '1');
          linearStop2.setAttribute('stop-color', '#0085FF');
          linearGradientTag.appendChild(linearStop1);
          linearGradientTag.appendChild(linearStop2);

          // legend
          const LegendGradientTag = document.createElementNS(
            ns,
            'linearGradient'
          );

          const legendStop1 = document.createElementNS(ns, 'stop');
          legendStop1.setAttribute('stop-color', '#FA00FF');

          const legendStop2 = document.createElementNS(ns, 'stop');
          legendStop2.setAttribute('offset', '1');
          legendStop2.setAttribute('stop-color', '#0085FF');
          LegendGradientTag.appendChild(legendStop1);
          LegendGradientTag.appendChild(legendStop2);

          // circle
          const radialGradientTag = document.createElementNS(
            ns,
            'radialGradient'
          );

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
      };
    }
    datas.push(data);
  });

  chartData.datas = datas;
  chartData.labels = chartDataResponse.label;

  return chartData;
}

export function useGetChartDataQuery() {
  const response = useQuery({
    queryKey: [QueryKey.CHART],
    queryFn: () => {
      return axios.get('/bitcoin-service/get_basic_chart');
    },
    select(data) {
      return chartDataParser(data.data);
    },
    staleTime: 60000 * 60 * 2, // 2시간
    gcTime: 60000 * 60 * 2, // 2시간
  });

  return response;
}

export function useGetPredictDataQuery() {
  const response = useQuery({
    queryKey: [QueryKey.PREDICT],
    queryFn: () => {
      return axios.get('/bitcoin-service/get_predict_value');
    },
    select(data) {
      return data.data;
    },
    staleTime: 60000 * 60 * 2, // 2시간
    gcTime: 60000 * 60 * 2, // 2시간
  });

  return response;
}

export function useGetAnalysisDataQuery() {
  const response = useQuery({
    queryKey: [QueryKey.ANALYSIS],
    queryFn: () => {
      return axios.get('/bitcoin-service/get_chart_analysis');
    },
    select(data) {
      return data.data;
    },
  });
  return response;
}
