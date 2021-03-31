import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0.5px 0.5px 0.5px rgb(49, 46, 46);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`;

export default ModalContainer;
