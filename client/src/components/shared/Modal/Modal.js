import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import ModalContainer from './Modal.style';

const Modal = ({ visible, children }) => (
  <CSSTransition in={visible} timeout={500} classNames='fade' unmountOnExit>
    <ModalContainer>{children}</ModalContainer>
  </CSSTransition>
);

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
