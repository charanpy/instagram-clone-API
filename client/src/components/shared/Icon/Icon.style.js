import styled from 'styled-components';
/* eslint-disable */
const Icon = styled.i`
  color: ${(props) =>
    props.active ? props.theme.iconActive : props.theme.icon};
  font-size: ${(props) => props.fontSize}rem;
  margin-right: ${(props) => props.marginRight}rem;
  cursor: pointer;
  position: relative;
  -webkit-text-stroke: 0px ${(props) => props.color || props.theme.Icon};
  &:hover {
    color: ${(props) => (props.theme.mode ? '#999' : '#212529')};
  }
`;

export default Icon;
