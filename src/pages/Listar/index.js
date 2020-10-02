import React from 'react';
import { 
  Col, Row, Button
} from 'reactstrap';
import { GrPrint } from 'react-icons/gr';
import ContactList from '../../components/ContactList';
import ListContactContext from '../../contexts/ListContacts';
import './style.css';

const Listar = () => {
 
  return(
    <div className="container">
      <div className="py-4">
        <h3>
          Lista de Contatos
          <Button 
            id="noprint"
            className="float-right" 
            outline color="secondary" 
            size="sm"
            onClick={ () => window.print() } 
          >
            <GrPrint /> Imprimir
          </Button>
        </h3>          
        <hr/>
        <ListContactContext>
          <Row form>
            <Col md={12}>
              <ContactList />              
            </Col>
          </Row>         
        </ListContactContext>
      </div>
    </div>
  );
}

export default Listar;