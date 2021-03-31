import styled from 'styled-components';
/* eslint-disable */

const GroupContainer = styled.section`
  height: 100%;
  width: 30%;
  border: ${(props) =>
    props.theme.mode
      ? '.3px solid rgba(255,255,255,0.199)'
      : '.3px solid rgba(0,0,0,0.2)'};
`;

export default GroupContainer;
