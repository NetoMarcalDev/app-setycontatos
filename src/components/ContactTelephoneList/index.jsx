import React, { memo } from 'react';
import { Table, Button, Badge } from 'reactstrap';
import { RiDeleteBin6Line} from 'react-icons/ri';
import { FiEdit} from 'react-icons/fi';
import Heade from './Head';
import '../../styles.css';

const ContactTelephoneList = (props) => (
  <>
    { props.id_contato ? props.telefoneList(props.id_contato) : ''}
    <div className="border shadow margin-full">
      <h5 className="margin-full">Telefone(s) <Button className="float-right margin-bottom color-green" size="sm" outline color="info"><strong>Adicoionar</strong></Button></h5>
      <Table className="margin-left margin-left" size="sm">
        <Heade />
          <tbody>
          {           
            props.telefones ? props.telefones.map((telefone, index) => (
              <tr key={index = index+1}>
                <td>{telefone.numero}</td>
                <td>
                  {telefone.tipo}                  
                  <Button className="float-right" color=''><RiDeleteBin6Line/></Button>
                  <Button className="float-right" color=''><FiEdit/></Button>                  
                </td>                               
              </tr>
            )) : ''
          }
          </tbody>
      </Table>
    </div>
  </>
)

export default memo(ContactTelephoneList);