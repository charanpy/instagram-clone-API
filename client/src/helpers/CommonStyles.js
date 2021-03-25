import styled, { css } from 'styled-components';

export const SharedTheme = css`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  ${SharedTheme}
`;
