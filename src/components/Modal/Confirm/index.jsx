import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalConfirm = ({modal, toggle}) => {

  return (
    <div>     
      <Modal isOpen={modal.modal} toggle={toggle} className=''>
        <ModalHeader toggle={toggle}>{modal.titulo}</ModalHeader>
        <ModalBody>
          { modal.texto }
        </ModalBody>
        <ModalFooter>
          <Button id='acao1' color="info"  onClick={toggle}>{modal.acao1}</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalConfirm;