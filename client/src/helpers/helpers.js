import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
/* eslint-disable */
export const setTheme = (theme = 'dark') =>
  window && localStorage.setItem('theme', JSON.stringify(theme));

export const getTheme = () =>
  window && JSON.parse(localStorage.getItem('theme'));

export const generateUniqueId = () => uuidv4();

export const ProfilePropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.string,
  photo: PropTypes.string,
});

export const Group = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  groupType: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
});

export const GroupPropTypes = PropTypes.objectOf(Group);

export const String = PropTypes.string;

export const historyProp = PropTypes.shape({
  push: PropTypes.func.isRequired,
});

export const currentGroup = PropTypes.shape({
  groupId: PropTypes.string.isRequired,
  name: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  photo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      public_id: PropTypes.string,
      secure_url: PropTypes.string,
    }),
  ]),
});

export const MessagePropType = PropTypes.arrayOf([
  PropTypes.shape({
    createdAt: PropTypes.string,
    groupId: PropTypes.string,
    message: PropTypes.string,
    to: PropTypes.string,
    sender: PropTypes.string,
    seen: PropTypes.any,
    _id: PropTypes.string,
  }),
]);
