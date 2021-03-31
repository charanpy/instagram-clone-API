import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HeaderContainer, IconContainer, Notify } from './Header.style';
import Brand from '../Brand/Brand';
import Icon from '../Icon/Icon';

const Header = ({ history, notify }) => {
  if (history.location.pathname === '/auth') {
    return null;
  }

  return (
    <HeaderContainer>
      <Brand />
      <IconContainer>
        <Link to='/'>
          <Icon
            className='fas fa-home'
            active={history.location.pathname === '/'}
          />
        </Link>
        <Link to='/direct/message'>
          <Icon
            className='fas fa-paper-plane'
            active={history.location.pathname === '/direct/message'}
          />
          {notify ? <Notify>{notify}</Notify> : <div />}
        </Link>
      </IconContainer>
    </HeaderContainer>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  notify: PropTypes.number.isRequired,
};
export default withRouter(Header);
