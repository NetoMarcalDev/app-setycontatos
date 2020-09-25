import React from 'react';
import { Table, Button, Row, Col } from 'reactstrap';

import Heade from './Head';


const ContactTelefoneTable = (props) => (
  <Row form>
    <Col md={6}>      
      <Table>
        <Heade />
        <tbody className="border shadow">
        {           
          props.telefones ? props.telefones.map((telefone, index) => (
            <tr key={index = index+1}>
              <td>{telefone.numero}</td>
              <td>{telefone.tipo}</td>
              <td>
                <Button onClick={ () => props.deleteTelefone(index-1) }  color="danger" size="sm" block>Deletar</Button>
              </td>
            </tr>
          )) : ''
        }
        </tbody>
      </Table>
    </Col>
  </Row>
)

export default ContactTelefoneTable;