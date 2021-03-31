import React from 'react';
import { HomeContainer, Wrap } from './Home.style';
import Theme from '../../components/Theme/Theme';
import Logout from '../../components/shared/Logout/Logout';

const Home = () => {
  console.log('Home');
  return (
    <HomeContainer>
      <Wrap>
        <Theme />
        <Logout />
      </Wrap>
    </HomeContainer>
  );
};

export default Home;
