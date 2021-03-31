import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectNotificationNumber } from '../../../redux-sagas/group/group.selector';
import Header from './Header';

const HeaderContainer = ({ notify }) => {
  console.log(notify);
  return <Header notify={notify} />;
};

HeaderContainer.propTypes = {
  notify: PropTypes.number.isRequired,
};
const mapStateToProps = createStructuredSelector({
  notify: selectNotificationNumber,
});

export default connect(mapStateToProps)(HeaderContainer);
