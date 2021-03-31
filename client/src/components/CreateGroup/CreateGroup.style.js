import styled from 'styled-components';
import Button from '../shared/Button/Button';

/* eslint-disable */
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 100%;
  border: ${(props) =>
    props.theme.mode
      ? '.3px solid rgba(255,255,255,0.199)'
      : '.3px solid rgba(0,0,0,0.2)'};
`;

export const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const SendMessage = styled(Button)`
  width: 10rem;
`;
