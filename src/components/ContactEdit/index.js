import React, { useEffect } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Col, 
  Row, Form,  FormGroup, Label, 
  Input, InputGroup, InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillPhone } from 'react-icons/ai';
import Select from 'react-select';


const ContactEdit = (props) => {
  const {
    modal,
    toggle,
    action,
    contact,
    groups,
    typesPhone,
    contactEdit,
    setContactEdit,
    hendleInputChangeNumberEdit,
    hendleInputChangeNameEdit,
    hendleInputChangeObsEdit
  } = props;


  const options = [];
  groups.map(group => options.push({label: group.descricao, value: group.id_grupo}));

  const optionsTypesPhone = [];
  typesPhone.map(type => optionsTypesPhone.push({label: type.descricao, value: type.id_tipo_telefone}));


  useEffect(() => {
    
    return () => setContactEdit({});
  }, []);

  return (
    <Modal isOpen={modal.isOpen} toggle={toggle} className={modal.className}>
      <ModalHeader toggle={toggle}>Editar Contato</ModalHeader>
      <ModalBody>
        <Form className="margin-top margin-left">
          <Row form>
            <Col md={7}> 
              <FormGroup>
                <Label for="nome">Nome{/*<TootipsRequiredField />*/}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><BsFillPersonFill /></InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    defaultValue={ contact.nome } 
                    onChange={ hendleInputChangeNameEdit } 
                    placeholder="Digite o nome do contato" 
                  />              
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="grupo">Grupo</Label>
                <Select 
                  options={ options } 
                  blurInputOnSelect={true}
                  defaultValue={{ label: contact.grupo, value: contact.id_grupo }}
                  onChange={e => 
                    setContactEdit({
                      ...contactEdit,  
                      grupo: e.label,
                      id_grupo: e.value
                   })
                  }
                />
              </FormGroup>
            </Col>
          </Row>        
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for="nome">Número{/*<TootipsRequiredField />*/}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><AiFillPhone /></InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    type="text" 
                    name="numero" 
                    id="numero" 
                    defaultValue={contact.numero}
                    onChange={ hendleInputChangeNumberEdit } 
                    placeholder="Digite o número do contato" 
                  />              
                </InputGroup>
              </FormGroup>    
            </Col>
            <Col md={7}>
              <FormGroup>
                <Label for="typeNumber">Tipo</Label>
                <Select 
                  options={ optionsTypesPhone } 
                  blurInputOnSelect={true}
                  defaultValue={{ label: contact.descricao, value: contact.id_tipo_telefone }}
                  onChange={e => 
                    setContactEdit({ 
                      ...contactEdit,
                      descricao: e.label,
                      id_tipo_telefone: e.value
                   })}
                />
              </FormGroup>   
            </Col>               
          </Row>
            
          <FormGroup>		      
		      	<Label for="obs">Observações</Label>
            <Input 
              type="textarea" 
              name="observacao" 
              id="observacao" 
              defaultValue={ contact.observacao } 
              onChange={ hendleInputChangeObsEdit } 
            />		         
		      </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        { modal.actionText1 && <Button color="primary" onClick={() => action() }>{modal.actionText1}</Button> }
        { modal.actionText2 && <Button color="secondary" onClick={toggle}>{modal.actionText2}</Button> }
      </ModalFooter>
    </Modal>
  );
}

export default ContactEdit;