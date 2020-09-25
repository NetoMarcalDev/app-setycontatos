import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const TootipsRequiredField = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <b style={{ color: "red" }} id="TooltipExample"> *</b>
      <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Campo obrigatório
      </Tooltip>
    </span>
  );
}

export default TootipsRequiredField;