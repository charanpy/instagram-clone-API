import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  justify-content: center;
  height: 90vh;
  background: ${(props) => props.theme.background};
`;

export const Wrap = styled.div`
  margin-top: 5rem;
`;
