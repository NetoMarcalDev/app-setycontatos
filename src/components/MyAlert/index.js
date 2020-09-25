import React from 'react';
import { Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../../styles.css';


const MyAlert = ({ info, clearInfo }) => {

  if(info) {
    switch (info.text) {
      case 'Telefone não cadastrado.':
        return (
          <Alert className="margin-top" color="danger" isOpen={info.visible} toggle={clearInfo}>
            { info.text + ' Deseja cadastrar?' } 
            <NavLink exact to="/contato"> Sim</NavLink> ou
            <NavLink onClick={ clearInfo }  exact to="#"> Não</NavLink>
          </Alert>);
    
      default:
        return (
          <Alert className="margin-top" color="danger" isOpen={info.visible} toggle={clearInfo}>
            { info.text  }
          </Alert>)
    }
  }else {
    return <></>
  }  
};

export default MyAlert;