import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter,
  Col, Row, Form, FormGroup, 
  Label, Input, InputGroup,
  InputGroupAddon, InputGroupText 
} from 'reactstrap';

import { AiFillPhone } from 'react-icons/ai';
import TootipsRequiredField from '../TootipsRequiredField';
import InputTypePhone from '../InputTypePhone';


const PhoneAdd = (props) => {
  
  const {
    className,
    modal,
    toggle
  } = props;

  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);


  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  return (
    <div>
      <Modal isOpen={modal.isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Adicionar número</ModalHeader>
        <ModalBody>
        <Form onSubmit={ /*addTelefone*/ () => {} }>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="telefone">Telefone<TootipsRequiredField /></Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><AiFillPhone /></InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    type="text" 
                    name="numero" 
                    id="numero"                     
                    placeholder="Digite o número" 
                    onChange={ /*hendleInputTelefoneChange*/ () => {} }
                  />
                </InputGroup>          
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="tipo-telefone">Tipo<TootipsRequiredField /></Label>
                <InputTypePhone 
                  onChangeTelefoneInput={ /*onChangeTelefoneInput*/ () => {} } 
                  //setInfo={setInfo}
                  //clearInfo={clearInfo}
                />          
              </FormGroup>
            </Col>          
          </Row>          
        </Form>
          <br />          
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
              <Button color="secondary" onClick={toggleAll}>All Done</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggleNested}>Adicionar</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PhoneAdd;