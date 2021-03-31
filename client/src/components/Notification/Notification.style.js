import styled from 'styled-components';

const Notification = styled.p`
  font-size: 1.2rem;
  font-family: cursive;
  color: ${(props) => props.theme.text};
  font-weight: 500;
`;

export default Notification;
