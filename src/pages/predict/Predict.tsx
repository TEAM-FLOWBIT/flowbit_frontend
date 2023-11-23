import styled from "styled-components";
import Header from "../../components/header/Header";
import PredictMain from "./PredictMain";
import PredictContent from "./PredictContent";
import Footer from "../../components/footer/Footer";

const PredictLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
  min-height: 100vh;
`;

export default function Predict() {
  return (
    <PredictLayout>
      <Header />
      <PredictMain />
      <PredictContent />
      <Footer />
    </PredictLayout>
  );
}
