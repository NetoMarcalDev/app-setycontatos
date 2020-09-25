import React from 'react';
import { GrObjectUngroup } from 'react-icons/gr';
import { 
  FormGroup, 
  Label, Input, InputGroup,
  InputGroupAddon, InputGroupText
} from 'reactstrap';
import { useGroup } from '../../contexts/GroupContext';

const GroupInput = () => {

  const { 
    hendleInputChangeAdd
  } = useGroup();

  return (
    <FormGroup>      
      <Label for="description">Descrição</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
        <InputGroupText><GrObjectUngroup /></InputGroupText>
        </InputGroupAddon>       
        <Input 
          type="text" 
          name="description" 
          id='group' 
          placeholder="Digite o grupo." 
          onChange={ hendleInputChangeAdd }
        />
      </InputGroup>
    </FormGroup>
  );
}

export default GroupInput;