import styled from 'styled-components';

export const DisplayGroupContainer = styled.div`
  display: flex;
  padding: 10px;
`;
export const ChatDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2.8rem;
`;
export const GroupName = styled.p`
  font-size: 1.8rem;
  font-family: 'Open Sans Condensed';
  color: ${(props) => props.theme.textLight};
  text-transform: capitalize;
  font-weight: 600;
`;

export const Notification = styled.p`
  font-size: 1.2rem;
  font-family: 'Open Sans Condensed';
  color: ${(props) => props.theme.textLight};
`;

export const CreateButton = styled.button`
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    background: #212529;
  }
`;
