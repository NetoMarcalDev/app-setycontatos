import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MyModal = (props) => {
  const {
    modal,
    toggle,
    action
  } = props;


  return (
    <Modal isOpen={modal.isOpen} toggle={toggle} className={modal.className}>
      <ModalHeader toggle={toggle}>{modal.title}</ModalHeader>
      <ModalBody>
       {modal.text}
      </ModalBody>
      <ModalFooter>
        { modal.actionText1 && <Button color="primary" onClick={() => action() }>{modal.actionText1}</Button> }
        { modal.actionText2 && <Button color="secondary" onClick={toggle}>{modal.actionText2}</Button> }
      </ModalFooter>
    </Modal>
  );
}

export default MyModal;