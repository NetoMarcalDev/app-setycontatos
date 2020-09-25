import React from 'react'
import { Button } from 'reactstrap';

const list = [];

const Body = () => (
  <tbody>
    { 
      list.groups.map((group, index) => (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{group.descricao}</td>
          <td className="text-right mb-4">                          
            <Button onClick={ () => handleDelete } color="danger" size="sm">Deletar</Button>
          </td>
        </tr>
      ))
    }
  </tbody>
)

export default Body;