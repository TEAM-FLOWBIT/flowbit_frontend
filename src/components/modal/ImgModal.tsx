import styled from 'styled-components';
import Modal from './Modal';
import { useEffect, useState } from 'react';

const ImgModalLayout = styled.div<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top + 'px'};
  z-index: 999;
  margin: 0 auto;
`;

const ImgModalContent = styled.div<{ maxwidth: number }>`
  max-width: ${(props) => props.maxwidth + 'px'};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  & img {
    width: 100%;
  }
`;

const ImgModalCloseBtn = styled.div`
  display: block;
  float: right;
  width: 30px;
  height: 30px;
  background: url(/close.png) top right no-repeat;
  text-align: right;
  outline: 0;
  filter: alpha(Opacity=70);
  opacity: 0.7;
  -webkit-transition: opacity 0.2s;
  -moz-transition: opacity 0.2s;
  -o-transition: opacity 0.2s;
  transition: opacity 0.2s;

  cursor: pointer;
`;

interface IImageModal {
  url: string;
  onClickCloseModal: () => void;
}

function ImgModal({ url, onClickCloseModal }: IImageModal) {
  const [topOfPosition, setTopOfPosition] = useState<number>(0);
  const [maxImgWidth, setMaxImgWidth] = useState<number>(0);
  useEffect(() => {
    setTopOfPosition(window.scrollY + 40);
    setMaxImgWidth(window.innerWidth * 0.5);
  }, []);

  return (
    <Modal onClickCloseModal={onClickCloseModal}>
      <ImgModalLayout top={topOfPosition}>
        <ImgModalContent maxwidth={maxImgWidth}>
          <img src={url} alt="" />
          <ImgModalCloseBtn onClick={onClickCloseModal}></ImgModalCloseBtn>
        </ImgModalContent>
      </ImgModalLayout>
    </Modal>
  );
}

export default ImgModal;
