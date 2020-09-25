import React, { useState, useEffect } from 'react'
import { 
  FormGroup, Label
} from 'reactstrap';

import Select from 'react-select';

import { getGroups } from '../../api/setyContacts';
import TootipsRequiredField from '../TootipsRequiredField';

const InpuGrupo = ({onChangeInput}) => {

  const [grupos, setGrupo] = useState([]);

  const options = [];

  useEffect(() => {
    
    getGroups()
    .then(data => setGrupo([...grupos, ...data.grupos]))
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
  }, [], grupos.map(grupo => options.push({label: grupo.descricao, value: grupo.id_grupo})));


  return(
    <FormGroup>
      <Label for="grupo">Grupo <TootipsRequiredField /></Label>
      <Select id="inputGroup" options={options} onChange={onChangeInput} />
  </FormGroup>
  );

}
export default InpuGrupo;