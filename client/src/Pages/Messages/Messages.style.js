import styled from 'styled-components';

const MessageContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  align-items: center;
`;

export default MessageContainer;
