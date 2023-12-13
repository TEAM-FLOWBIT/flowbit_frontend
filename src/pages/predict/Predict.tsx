import PredictMain from './PredictMain';
import PredictContent from './PredictContent';
import { useGetPredictDataQuery } from '../../hooks/services/queries/chartHook';

export default function Predict() {
  const { data, isSuccess } = useGetPredictDataQuery();

  return (
    <>
      <PredictMain
        predictKRW={data?.predictKRW ? data?.predictKRW : '000,000'}
        predictUSD={data?.predictUSD ? data?.predictUSD : '000,000'}
      />
      <PredictContent
        actualData={data?.actureKRW ? data.actureKRW : '000,000'}
        predictData={data?.predictKRW ? data?.predictKRW : '000,000'}
      />
    </>
  );
}
