import styled from 'styled-components';

const MessageWrapper = styled.section`
  height: 80vh;
  margin-top: 3rem;
  width: 50vw;
  margin-bottom: 1.4rem;
  border: ${(props) =>
    props.theme.mode
      ? '.3px solid rgba(255,255,255,0.199)'
      : '.3px solid rgba(0,0,0,0.2)'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default MessageWrapper;
