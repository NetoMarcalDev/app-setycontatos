import React from 'react';
import { Table, Button } from 'reactstrap';
import Head from './Head';
import { useGroup } from '../../contexts/GroupContext';
import MyModal from '../MyModal';
import GroupUpdate from '../GroupUpdate';

const GroupList = () => {
  
  const { 
    groups,
    handledeleteGroup,
    deleteGroup,
    modal,
    toggle,
    handleUpdateGroup
  } = useGroup();

  return (
    <Table className="border shadow">    
      <Head />
      <tbody>
        { 
          groups.map((group, index) => (
            <tr key={group.id_grupo}>
              <th scope="row">{index + 1}</th>
              <td>{group.descricao}</td>
              <td className="text-right mb-4">    
                <Button onClick={ () => { handleUpdateGroup(index, group) } }color="primary mr-1" size="sm">Alterar</Button>
                <Button onClick={ () => handledeleteGroup(index+1, group.id_grupo, group.descricao) } color="danger" size="sm">Deletar</Button>                              
              </td>
            </tr>
          ))
        }
      </tbody>
      <MyModal 
        modal={modal}
        toggle={toggle}
        action={deleteGroup}
      />      
      <GroupUpdate />
    </Table>
  )
}

export default GroupList