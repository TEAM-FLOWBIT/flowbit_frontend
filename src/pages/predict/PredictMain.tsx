import styled, { keyframes } from 'styled-components';
import { useGetPredictDataQuery } from '../../hooks/services/queries/chartHook';

const PredictMainBanner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100vh - 9.2rem);
  align-items: center;
  justify-content: center;
`;

const PredictGradationTop = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 14.2rem;
  background: linear-gradient(
    180deg,
    rgba(100, 80, 255, 0.42) 0%,
    rgba(7, 2, 15, 0) 70.46%
  );
`;

const PredictGradationBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14.2rem;
  background: linear-gradient(
    0deg,
    rgba(100, 80, 255, 0.42) 0%,
    rgba(7, 2, 15, 0) 70.46%
  );
`;

const PredictMainLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6.7rem;
  justify-content: center;
  align-items: center;
`;

const PredictMainTitle = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  color: #fff;
  font-size: 5.4rem;
  font-weight: 600;
  line-height: normal;
`;

const PredictSubTitle = styled.h3`
  color: #fff;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: normal;
`;

const PredictMainContent = styled.div`
  width: 53.8rem;
  height: 53.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingPath = styled.path`
  transform-origin: center;
  animation: ${rotate} 10s linear infinite;
`;

const RotatingCircle = styled.circle`
  transform-origin: center;
  animation: ${rotate} 10s linear infinite;
`;

export default function PredictMain() {
  const { data, isSuccess } = useGetPredictDataQuery();

  return (
    <PredictMainBanner>
      <PredictGradationTop />
      <PredictMainLayout>
        <PredictMainTitle>
          <PredictSubTitle>유일한 비트코인 예측 서비스</PredictSubTitle>
          <span>FLOWBIT</span>
        </PredictMainTitle>
        <PredictMainContent>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 538 538"
            fill="none"
            style={{ overflow: 'visible' }}
          >
            <RotatingPath
              d="M357.642 20.3076C358.981 17.9888 357.897 15.0216 355.361 14.1625C328.254 4.97951 299.209 0 269 0C120.435 0 0 120.435 0 269C0 417.565 120.435 538 269 538C417.565 538 538 417.565 538 269C538 205.422 515.943 146.995 479.064 100.954C477.194 98.619 473.579 98.9339 472.083 101.525C471.186 103.078 471.347 105.022 472.467 106.422C508.116 150.979 529.433 207.5 529.433 269C529.433 412.833 412.833 529.433 269 529.433C125.167 529.433 8.56688 412.833 8.56688 269C8.56688 125.167 125.167 8.56688 269 8.56688C298.198 8.56688 326.274 13.3718 352.479 22.2339C354.441 22.8973 356.607 22.101 357.642 20.3076Z"
              fill="url(#paint0_linear_457_727)"
            />
            <RotatingCircle cx="85%" cy="15%" r="7" fill="#664FFF" />
            <text
              x="50%"
              y="40%"
              fontSize="3.5rem"
              fontWeight="400"
              fill="#ffffff"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              내일의 비트코인{' '}
              <tspan dy="0.25em" fontWeight="600">
                예측가격
              </tspan>
            </text>
            <text
              x="50%"
              y="50%"
              fontSize="4.5rem"
              fontWeight="700"
              fill="#FA00FF"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              {isSuccess
                ? Math.floor(data.predicted_price)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '0000,0000'}{' '}
              KRW
            </text>
            <text
              x="50%"
              y="60%"
              fontSize="2.5rem"
              fontWeight="400"
              fill="#737AC0"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              28,191.96 USD
            </text>
            <defs>
              <linearGradient
                id="paint0_linear_457_727"
                x1="-45.3735"
                y1="113.434"
                x2="538"
                y2="538"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA00FF" />
                <stop offset="1" stop-color="#0085FF" />
              </linearGradient>
            </defs>
          </svg>
        </PredictMainContent>
      </PredictMainLayout>
      <PredictGradationBottom />
    </PredictMainBanner>
  );
}
