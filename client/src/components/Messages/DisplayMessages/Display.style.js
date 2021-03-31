import styled from 'styled-components';

export const ChatContainer = styled.div`
  overflow-y: scroll;
  margin: 2rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 7%;
  margin-top: 5px;
  align-items: flex-end;

  ${(props) =>
    !props.position &&
    `
      align-items: flex-start;
    `}
`;
export const Message = styled.div`
  font-size: 1.42rem;
  line-height: 1.5rem;
  position: relative;
  min-width: 20%;
  padding: 1rem;
  background: #212529;
  border-radius: 25px;
  position: relative;
`;

export const SeenIcon = styled.div`
  position: absolute;
  bottom: -10px;
  right: 5px;
`;
export const Chat = styled.span`
  display: block;
  font-size: 1.8rem;
  color: ${(props) => props.theme.color};
  font-family: 'NimbusSanTW01Con';
  word-wrap: break-word;
  // text-transform: capitalize;
  margin-bottom: 1.3rem;
`;
