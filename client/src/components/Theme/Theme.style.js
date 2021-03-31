import styled from 'styled-components';
/* eslint-disable */

export const Wrapper = styled.div`
  display: flex;
`;
export const RadioButton = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
`;

export const Selection = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border: ${(props) =>
    props.theme.mode ? '2px solid #d8e4e2' : '2px solid #212529'};
  border-radius: 50%;
  margin-right: 1rem;
  box-sizing: border-box;
  padding: 0.3rem;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    background: #009879;
    border-radius: 50%;
    transform: scale(0);

    transition: all 500ms linear;
  }
`;

export const Input = styled.input`
  &:checked + ${Selection}::after {
    transform: scale(1);
  }
`;

export const Label = styled.label`
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 1.5rem;
  color: ${(props) => props.theme.text};
`;
