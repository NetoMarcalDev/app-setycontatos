import React from 'react';
import { Spinner } from 'reactstrap';
import { AiFillPhone } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { 
  Form, FormGroup, InputGroup, 
  InputGroupAddon, InputGroupText, 
  Input, Button
} from 'reactstrap';
import { useSearch } from '../../contexts/SearchContext';
import MyAlert from '../MyAlert';


const ContactSearch = () => {
  
  const { 
    info,
    handleSubmit,
    hendleInputChange,
    clearInfo,
    loading 
  } = useSearch();

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
       <InputGroup>
         <InputGroupAddon addonType="prepend">
          <InputGroupText><AiFillPhone /></InputGroupText>
         </InputGroupAddon>
         <Input 
          type="text" 
          name='number' 
          id="numero"
          max="11"
          onChange={ hendleInputChange } 
          placeholder="Digite o número a consultar" 
        />
        <Button 
          type="submit" 
          color="info" 
          size="mb" 
          id="TooltipSearch"
          disabled={loading}
        > 
          {loading && <Spinner size="sm" color="light" />}
          {!loading && <BsSearch/>}
        </Button>      
       </InputGroup>
       <MyAlert
        info={info}
        clearInfo={clearInfo} 
      />
      </FormGroup >
    </Form> 
  )
}

export default ContactSearch;