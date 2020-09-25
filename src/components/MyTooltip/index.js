import React from 'react';
import { Tooltip } from 'reactstrap';

const MyTootip = (props) => {
    
    return (
      <Tooltip 
          placement="right" 
          isOpen={props.tooltipOpen} 
          target={props.target} 
          toggle={props.toggle}
      >
        {props.text}
      </Tooltip>            
    );
  }

export default MyTootip;