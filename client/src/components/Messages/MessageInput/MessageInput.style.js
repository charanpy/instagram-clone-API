import styled from 'styled-components';
import { SharedInput } from '../../shared/Input/Input.style';
/* eslint-disable */
export const Message = styled.input`
  ${SharedInput}
  margin-top: 0 !important;
  border-radius: 25px;
  background: transparent;
  color: ${(props) => (props.theme.mode ? 'rgba(255,255,255,0.8)' : '#212529')};

  &::placeholder {
    color: ${(props) =>
      props.theme.mode ? 'rgba(255,255,255,0.8)' : '#212529'};
  }
  &:active,
  &:focus {
    border: ${(props) =>
      props.theme.mode
        ? '1px solid rgba(255,255,255,0.8)'
        : '1px solid #212529'};
  }
`;
export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 1.6rem;
  background: ${(props) => props.theme.header};
  width: calc(100% - 3.2rem);
  margin-top: auto;
  z-index: 100;
  border-top: 1px solid #999;
`;

export const SendMessage = styled.button`
  outline: none;
  border: none;
  margin-left: 1rem;
  background: transparent;
`;
