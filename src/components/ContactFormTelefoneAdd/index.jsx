import React from 'react'
import { AiFillPhone } from 'react-icons/ai';
import { 
  Col, Row, Button, Form, 
  FormGroup, Label, Input,
  InputGroup, InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import InputTypePhone from '../InputTypePhone';
import TootipsRequiredField from '../TootipsRequiredField';

const ContactFormTelefoneAdd = ({ telefone, clearInfo, hendleInputTelefoneChange, addTelefone, onChangeTelefoneInput, setInfo}) => (

  <Form onSubmit={ addTelefone }>
    <Row form>
      <Col md={3}>
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
              value={telefone.numero}
              placeholder="Digite o número" 
              onChange={ hendleInputTelefoneChange }
            />
          </InputGroup>          
        </FormGroup>
      </Col>
      <Col md={3}>
        <FormGroup>
          <Label for="tipo-telefone">Tipo<TootipsRequiredField /></Label>
          <InputTypePhone 
            onChangeTelefoneInput={ onChangeTelefoneInput } 
            setInfo={setInfo}
            clearInfo={clearInfo}
          />          
        </FormGroup>
      </Col>          
    </Row>
    <Row form>
      <Col md={6}>
        <Button type="submit" outline color="info" block>Adicionar</Button>
      </Col>
    </Row>
  </Form>
  
)

export default ContactFormTelefoneAdd;