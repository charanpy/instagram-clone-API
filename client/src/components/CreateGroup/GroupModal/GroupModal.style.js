import styled from 'styled-components';

export const Input = styled.input`
  padding: 8px;
  outline: none;
  border: none;
  width: 100%;
  border-bottom: 1px solid #ccc;
  color: white;
  background: transparent;

  &::placeholder {
    color: #666;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.4rem;
  }
`;

export const SearchUserContainer = styled.div`
  height: 40%;
  width: 25%;
  background: #000;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
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

export const UsersContainer = styled.div`
  overflow-y: hidden;
`;
