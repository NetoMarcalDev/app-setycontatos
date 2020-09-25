import React from 'react'
import { AiOutlineMail } from 'react-icons/ai';

import { 
  Col, Row, Button, Form, 
  FormGroup, Label, Input,
  InputGroup, InputGroupAddon,
  InputGroupText

} from 'reactstrap';

import InputTypeEmail from '../InputTypeMail';
import AlertMessage from '../../components/Alert';

const ContactFormEmailAdd = ({ contato, email, visible, clearInfo, hendleInputEmailChange, addItem, onChangeEmailInput, setInfo}) => (
   <Form onSubmit={ addItem }>
     <Row form>
       <Col md={3}>
         <FormGroup>
           <Label for="email">Email</Label>
           <InputGroup>
             <InputGroupAddon addonType="prepend">
               <InputGroupText><AiOutlineMail /></InputGroupText>
             </InputGroupAddon>
             <Input 
               type="email" 
               name="email" 
               id="email"
               value={email.email} 
               placeholder="Digite o e-mail" 
               onChange={ hendleInputEmailChange }
             />
           </InputGroup>          
         </FormGroup>
       </Col>
       <Col md={3}>
         <FormGroup>
           <Label for="tipo-email">Tipo</Label>
           <InputTypeEmail 
            onChangeInput={ onChangeEmailInput } 
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


export default ContactFormEmailAdd;