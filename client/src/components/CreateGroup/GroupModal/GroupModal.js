/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../shared/Modal/Modal';
import { SearchUserContainer, Input, UsersContainer } from './GroupModal.style';
import Spinner from '../../shared/Spinner/SpinnerComponent';
import DisplayUser from '../../Groups/DisplayGroup/DisplayGroup';

const GroupModal = ({
  modal,
  toggleModal,
  handleChange,
  searchUser: { input, users },
  loading,
  createGroup,
  id,
}) => {
  console.log('Group Modal');
  return (
    <Modal visible={modal}>
      <SearchUserContainer>
        <Input
          value={input}
          type='search'
          placeholder='Search Users'
          required
          onChange={handleChange}
          autoFocus
        />
        {loading ? (
          <Spinner />
        ) : (
          <UsersContainer>
            {users.length &&
              users.map(({ photo, user, username, _id }) => (
                <DisplayUser
                  key={_id}
                  onClick={() => createGroup(_id, id)}
                  type='create'
                  group={{
                    _id,
                    groupType: 'private',
                    users: [
                      {
                        photo,
                        user,
                        username,
                      },
                    ],
                  }}
                />
              ))}
          </UsersContainer>
        )}
        <button type='button' onClick={toggleModal}>
          Close
        </button>
      </SearchUserContainer>
    </Modal>
  );
};

GroupModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  // searchUser: PropTypes.shape({
  //   input: PropTypes.string,
  //   users: PropTypes.arrayOf(),
  //   loading: PropTypes.bool.isRequired,
  // }).isRequired,
  id: PropTypes.string.isRequired,
};

export default GroupModal;
