import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';

import { 
  Col, Row, Form, 
  FormGroup, Label, Input,
  InputGroup, InputGroupAddon,
  InputGroupText

} from 'reactstrap';

import InputGrupo from '../InputGroup';
import TootipsRequiredField from '../TootipsRequiredField';

const ContactForAdd = ({contato, hendleInputChange, onChangeInput, onChangeInputObs, optionsGrupos, setInfo }) => (
  <Form className="margin-top margin-left">        
    <Row form>
      <Col md={3}>              
        <FormGroup>
          <Label for="nome">Nome<TootipsRequiredField /></Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
             <InputGroupText><BsFillPersonFill /></InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="nome" id="nome" value={ contato.nome } onChange={ hendleInputChange } placeholder="Digite o nome do contato" />
          </InputGroup>
        </FormGroup>
      </Col>
      <Col md={3}>
        <InputGrupo 
          onChangeInput={ onChangeInput  } 
          optionsGrupos={optionsGrupos}
          setInfo={setInfo}
          clearInfo={setInfo}
        />        
      </Col>            
    </Row>

    <FormGroup row>
			<Col sm={6}>
			  <Label for="obs">Observações</Label>
			  <Input type="textarea" name="observacao" id="observacao" value={ contato.observacao } onChange={ onChangeInputObs } />
			</Col>      
		</FormGroup>

  </Form>
);

export default ContactForAdd;