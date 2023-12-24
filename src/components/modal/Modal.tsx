import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ModalLayout = styled.div<{ height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height + 'px'};
  z-index: 998;

  display: flex;
  justify-content: center;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: #000;
  opacity: 0.5;
  cursor: pointer;
`;

interface IModalProps {
  children: React.ReactNode;
  onClickCloseModal: () => void;
}

function Modal({ children, onClickCloseModal }: IModalProps) {
  const [modalHeight, setModalHeight] = useState<number>(0);

  useEffect(() => {
    setModalHeight(document.body.scrollHeight);
  }, []);

  return (
    <>
      <ModalLayout height={modalHeight}>
        {children}
        <ModalBackground onClick={onClickCloseModal}></ModalBackground>
      </ModalLayout>
    </>
  );
}

export default Modal;
