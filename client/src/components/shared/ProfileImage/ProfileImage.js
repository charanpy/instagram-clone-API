import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import UserImage from '../../../assets/user1.jpg';
import { selectUserPhoto } from '../../../redux-sagas/profile/profile.selector';
import { ImageContainer } from './ProfileImage.style';

const ProfileImage = ({ profilePic, chatProfile = null, height = 4 }) => {
  const checkImage = (image) => image && !image.includes('cdninsta');
  const chatImage =
    chatProfile && checkImage(chatProfile) ? chatProfile : UserImage;
  const profileImage = checkImage(profilePic) ? profilePic : UserImage;
  return (
    <ImageContainer
      src={chatImage || profileImage}
      alt='user-photo'
      loading='lazy'
      height={height}
    />
  );
};

ProfileImage.propTypes = {
  profilePic: PropTypes.string.isRequired,
  chatProfile: PropTypes.string,
  height: PropTypes.number,
};

ProfileImage.defaultProps = {
  chatProfile: null,
  height: 4,
};

const mapStateToProps = createStructuredSelector({
  profilePic: selectUserPhoto,
});

export default connect(mapStateToProps)(ProfileImage);
