import React from 'react';
import { Button, Form } from 'reactstrap';
import { useGroup } from '../../contexts/GroupContext';
import MyAlert from '../MyAlert';
import GroupInput from '../GrouoInput';

const GroupAdd = () => {
  
  const {     
    info, 
    clearInfo,
    handleSubmit
  } = useGroup();

  return (
  <Form onSubmit={ handleSubmit } >
    <GroupInput />
    <MyAlert
      info={info}
      clearInfo={clearInfo} 
    />
    <Button color="info" block >Cadastrar</Button>
  </Form>     
)};

export default GroupAdd;