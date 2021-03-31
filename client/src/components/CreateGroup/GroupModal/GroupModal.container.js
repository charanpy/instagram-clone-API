import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfileId } from '../../../redux-sagas/profile/profile.selector';
import { createGroupStart } from '../../../redux-sagas/group/group.action';
import GroupModal from './GroupModal';
// eslint-disable-next-line
const CancelToken = axios.CancelToken;
let cancel;

const GroupModalContainer = ({
  modal,
  toggleModal,
  createGroupStart: createGroup,
  id,
}) => {
  console.log(id, 5555);
  const [searchUser, setSearchUser] = useState({
    input: '',
    loading: false,
    users: [],
  });
  const { input, loading } = searchUser;
  useEffect(() => {
    if (cancel !== undefined) {
      cancel();
    }

    if (input) {
      setSearchUser((data) => ({
        ...data,
        loading: true,
      }));
      axios
        .get('http://localhost:3001/api/v1/profile/search/', {
          cancelToken: new CancelToken((c) => {
            cancel = c;
          }),
          params: {
            find: input,
          },
        })
        .then((response) => {
          setSearchUser((data) => ({
            ...data,
            loading: false,
            users: response.data.users,
          }));
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
          setSearchUser((data) => ({
            ...data,
            loading: false,
            users: [],
          }));
        });
    }
    return () => {
      if (cancel !== undefined) cancel();
    };
  }, [input]);
  const onHandleChange = (e) => {
    setSearchUser({
      ...searchUser,
      input: e.target.value,
    });
  };

  const closeModal = (profileId, userId) => {
    toggleModal();
    createGroup(profileId, userId);
  };
  return (
    <GroupModal
      modal={modal}
      toggleModal={toggleModal}
      searchUser={searchUser}
      handleChange={onHandleChange}
      loading={loading}
      createGroup={closeModal}
      id={id}
    />
  );
};

GroupModalContainer.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  createGroupStart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  id: selectProfileId,
});
const mapDispatchToProps = (dispatch) => ({
  createGroupStart: (userId, id) => dispatch(createGroupStart(userId, id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupModalContainer);
