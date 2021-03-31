import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  border: none;
  background: rgba(66, 133, 244, 1);
  color: white;
  text-align: center;
  width: 22rem;
  outline: none;
  transition: all 500ms ease-in-out;
  margin-top: 1.24rem;
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-weight: 600;

  &:hover {
    background: rgba(66, 133, 244, 0.6);
  }
`;

export default Button;
