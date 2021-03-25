import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  height: 100vh !important;
  width: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.background};
`;

export const LoadingText = styled.p`
  margin-top: 1.4rem;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 2rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #25d366;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 3s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
