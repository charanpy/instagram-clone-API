import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderContainer,
  OptionsContainer,
  ImageContainer,
  User,
} from './Header.style';
import ProfileImage from '../shared/ProfileImage/ProfileImage';
import IconContainer from '../shared/Icon/Icon';
import GroupModal from '../CreateGroup/GroupModal/GroupModal.container';
import UseModalState from '../shared/Modal/Modal.state';

const Header = ({ iconName, image, name }) => {
  console.log('Message Header');
  const [modal, toggleModal] = UseModalState();
  return (
    <HeaderContainer>
      <ImageContainer>
        <ProfileImage chatProfile={image} />
      </ImageContainer>
      <div>
        <User>{name}</User>
      </div>
      {iconName ? (
        <OptionsContainer as='button' onClick={toggleModal}>
          <IconContainer className={iconName} />
        </OptionsContainer>
      ) : (
        <div />
      )}
      <GroupModal modal={modal} toggleModal={toggleModal} />
    </HeaderContainer>
  );
};

Header.propTypes = {
  iconName: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
};

Header.defaultProps = {
  image: null,
  name: null,
  iconName: null,
};

Header.defaultProps = {};

export default React.memo(Header);
