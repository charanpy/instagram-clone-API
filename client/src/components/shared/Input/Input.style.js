import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  width: 20rem;
  outline: none;
  transition: all 500ms ease-in-out;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  &:active,
  &:focus {
    border: 1px solid green;
  }
  &::placeholder {
    text-transform: capitalize;
    font-family: 'Open Sans Condensed';
    font-weight: 400;
    font-size: 1.4rem;
    color: #212529;
  }
`;

export default Input;
