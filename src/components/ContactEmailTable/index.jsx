import React from 'react';
import { Table, Button, Row, Col } from 'reactstrap';

import Heade from './Head';



const ContactEmailTable = ({ emails, deleteEmail }) => (
  <Row form>
    <Col md={6}>      
      <Table>
        <Heade />
        <tbody className="border shadow">
        {           
          emails.map((email, index) => (
            <tr key={index = index+1}>
              <td>{email.email}</td>
              <td>{email.tipo}</td>
              <td>
                <Button onClick={ () => deleteEmail(index-1) } color="danger" size="sm" block>Deletar</Button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </Col>
  </Row>
)

export default ContactEmailTable;