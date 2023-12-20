import PredictMain from './PredictMain';
import PredictContent from './PredictContent';
import { useGetPredictDataQuery } from '../../hooks/services/queries/chartHook';

export default function Predict() {
  const { data } = useGetPredictDataQuery();

  return (
    <>
      <PredictMain
        predictKRW={data?.predictKRW ? data?.predictKRW : '58,417,908'}
        predictUSD={data?.predictUSD ? data?.predictUSD : '44,306.33'}
        // predictKRW="58,417,908"
      />
      <PredictContent
        actualData={data?.actureKRW ? data.actureKRW : '58,235,000'}
        predictData={data?.predictKRW ? data?.predictKRW : '58,417,908'}
        // actualData="58,235,000"
        // predictData="58,417,908"
      />
    </>
  );
}
