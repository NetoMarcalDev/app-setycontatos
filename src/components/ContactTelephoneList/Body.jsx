import React from 'react'

const Body = (props) => (
  <tbody>
    { 
      props.telefones.map((telefone, index) => (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{telefone}</td>
        </tr>
      ))
    }
  </tbody>
)

export default Body;