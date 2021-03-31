import styled from 'styled-components';

const Brand = styled.p`
  font-family: 'Billabong';
  font-size: 3.6rem;
  color: ${(props) => props.theme.text};
  @media (max-width: 720px) {
    font-family: 'Open Sans Condensed';
    font-size: 2.7rem;
  }
`;

export default Brand;
