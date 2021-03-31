import styled from 'styled-components';
/* eslint-disable */
export const HeaderContainer = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${(props) => props.theme.background};
  border-bottom: ${(props) =>
    props.theme.mode
      ? '.3px solid rgba(255,255,255,0.3)'
      : '.3px solid rgba(0,0,0,0.2)'};
`;

export const IconContainer = styled.div`
  display: flex;
  position: relative;
`;

export const Notify = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  color: white;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: 10px;
  background: #e95950;
`;
