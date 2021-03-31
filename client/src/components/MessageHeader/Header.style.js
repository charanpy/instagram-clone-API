/* eslint-disable */
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  padding: 1rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  border-bottom: ${(props) =>
    props.theme.mode
      ? '.3px solid rgba(255,255,255,0.199)'
      : '.3px solid rgba(0,0,0,0.2)'};
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background: transparent;
`;

export const Menu = styled.button`
  background: transparent;
  border: none;
  outline: none;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const User = styled.p`
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 2.3rem;
  color: ${(props) => props.theme.text};
  text-transform: capitalize;
`;
