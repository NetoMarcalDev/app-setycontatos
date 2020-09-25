import React, { useState, useEffect } from 'react';
import { 
  FormGroup
} from 'reactstrap';

import Select from 'react-select';
import { getTypeEmail } from '../../api/setyContacts';

const InputTypeMail = ({onChangeInput}) => {

  const [typeEmails, setTypeEmails] = useState(() => []);
  const options = [];

  useEffect(() => {
    getTypeEmail()
    .then(data => setTypeEmails([...typeEmails, ...data.tipos_email]))
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
  }, []);

  useEffect(() => {

    typeEmails.map(typeEmail => options.push({label: typeEmail.descricao, value: typeEmail.id_tipo_email}))
  }, [typeEmails]);



  return(
    <FormGroup>
      <Select options={options} id='tipo-email' onChange={onChangeInput} />
    </FormGroup>
  );

}
export default InputTypeMail;