import React from 'react';
import { Container, ButtonWrapper, SendMessage } from './CreateGroup.style';
import Icon from '../shared/Icon/Icon';

const CreateGroup = () => {
  console.log('Create Group');
  return (
    <Container>
      <Icon className='fas fa-paper-plane' fontSize={5} />
      <ButtonWrapper>
        <SendMessage
          type='button'
          text='Send Messages'
          handleSubmit={() => {}}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default CreateGroup;
