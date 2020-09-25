import React from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, 
  Form, FormGroup, Label, 
  Input, InputGroup, InputGroupAddon, 
  InputGroupText 
} from 'reactstrap';

import { GrObjectUngroup } from 'react-icons/gr';
import { useGroup } from '../../contexts/GroupContext';

const GroupUpdate = () => {

  const { 
    groupUpdate,
    toggleUpdate,
    modalUpdate,
    nestedModal,
    toggleNested,
    closeAll,
    toggleAll, 
    handleGroupUpdate,
    infoNestedModal,
    hendleInputChangeUpdate,
  } = useGroup();
  

  return (
    <>
      <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
        <ModalHeader toggle={toggleUpdate}>Alterar Grupo</ModalHeader>
        <ModalBody>
        <Form onSubmit={handleGroupUpdate}>
          <FormGroup>      
            <Label for="description">Descrição</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
              <InputGroupText><GrObjectUngroup /></InputGroupText>
              </InputGroupAddon>       
              <Input 
                type="text" 
                name="descriptionUpdate" 
                id='groupUpdate'
                placeholder={groupUpdate.descricao}       
                onChange={hendleInputChangeUpdate}
              />
            </InputGroup>
          </FormGroup>
          <ModalFooter>
            <Button color="success" >Alterar</Button>
            <Button color="secondary" onClick={toggleUpdate}>Cancelar</Button>
        </ModalFooter>
        </Form>
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggleUpdate : undefined}>     
            <ModalHeader>{ infoNestedModal.title }</ModalHeader>
            <ModalBody>{ infoNestedModal.text }</ModalBody>
            <ModalFooter>
              {infoNestedModal.actionText1 && <Button color="secondary" onClick={toggleNested}>{ infoNestedModal.actionText1 }</Button> }
              {infoNestedModal.actionText2 && <Button color="primary" onClick={toggleAll}>{ infoNestedModal.actionText2 }</Button> }
            </ModalFooter>
          </Modal>
        </ModalBody>       
      </Modal>
    </>
  );
}

export default GroupUpdate;