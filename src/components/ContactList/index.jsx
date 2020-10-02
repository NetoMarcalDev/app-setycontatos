import React from 'react';
import { Table, Row, Col } from 'reactstrap';
import { useListContact } from '../../contexts/ListContacts';
import Heade from './Head';

const ContactList = (props) => {
  
  const { 
    list
  } = useListContact();

  return (
    <Table borderless size="sm" >
      <Heade />
      <tbody>
      {           
        list ? list.map((contact, index) => (
          <tr key={index = index+1}>
            <td>{contact.nome.toUpperCase()}</td>
            <td>{contact.numero}</td>
            <td>{contact.tipo.toUpperCase()}</td>
            <td>{contact.grupo.toUpperCase()}</td>
          </tr>
       )) : ''
      }
      </tbody>
    </Table>
  )
}

export default ContactList;