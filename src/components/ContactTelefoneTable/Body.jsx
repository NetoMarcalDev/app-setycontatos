import React from 'react'
import { Button } from 'reactstrap';

const Body = (list, handleDelete) => (
  <tbody>
    { 
      list.groups.map((group, index) => (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{group.descricao}</td>
          <td className="text-right mb-4">
            <Button color="primary mr-1" size="sm">Editar</Button>                            
            <Button onClick={ () => handleDelete } color="danger" size="sm">Deletar</Button>
          </td>
        </tr>
      ))
    }
  </tbody>
)

export default Body;