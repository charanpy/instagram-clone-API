import { useState } from 'react';

const ModalState = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((visible) => !visible);
  };

  return [modal, toggleModal];
};

export default ModalState;
