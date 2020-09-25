import React from 'react';
import { 
  Col, Row
} from 'reactstrap';
import GroupAdd from '../../components/GroupAdd';
import GroupList from '../../components/GroupList';
import GroupProvider from '../../contexts/GroupContext';

export default function Group() {

  return(
    <div className="container">
      <div className="py-4">
        <h3>Grupo</h3><hr/>
        <GroupProvider>
          <Row form>
            <Col md={4}>
              <GroupAdd />
            </Col>
            <Col md={8}>
              <div>Lista</div>
              <GroupList />         
            </Col>
          </Row>         
        </GroupProvider> 
      </div>
    </div>
  );
}