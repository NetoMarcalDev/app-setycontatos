import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';

const ModalAction = ({modal, toggle, deleteGrupo}) => {

  return (
    <div>     
      <Modal isOpen={modal.modal} toggle={toggle} className={classnames}>
        <ModalHeader toggle={toggle}>{modal.titulo}</ModalHeader>
        <ModalBody>
          { modal.texto }
        </ModalBody>
        <ModalFooter>
          <Button id='acao1' color="info"  onClick={deleteGrupo}>{modal.acao1}</Button>{' '}
          <Button  color="danger"  onClick={toggle}>{modal.acao2}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAction;