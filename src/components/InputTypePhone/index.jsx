import React, { useState, useEffect } from 'react'

import { 
  FormGroup
} from 'reactstrap';
import Select from 'react-select';
import { getTypePhone } from '../../api/setyContacts';


const InputTypePhone = ({ onChangeTelefoneInput }) => {

  const [typesPhone, setTypesPhone] = useState(() => []);
  const options = [];

  useEffect(() => {
    
    getTypePhone()
    .then(data => setTypesPhone([...typesPhone, ...data.tipos_telefone]))
    .catch ((error) => {

      if (error.response) {
        if (error.response.status === 500) {

         alert('O Servidor Interno Mysql se encontra desabilitado.'); 
        }else
        {
          alert(error.response.data.mensagem);   
        }                   
      }else{
        alert('Não foi possível conexão com a API.');
      } 
    })        
    
  }, [], typesPhone.map(type => options.push({label: type.descricao, value: type.id_tipo_telefone})));

  
  return(
    <FormGroup>
      <Select options={options} id='tipo-telefone' onChange={onChangeTelefoneInput} />
    </FormGroup>
  );

}
export default InputTypePhone;