import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';
import ContactFormAdd from '../ContactFormAdd';
import ContactFormTelefoneAdd from '../ContactFormTelefoneAdd';
import ContactFormTelefoneTable from '../ContactTelefoneTable';
//import ContactFormEmailAdd from '../ContactFormEmailAdd';
//import ContactEmailTable from '../ContactEmailTable';
import AlertMessage from '../../components/Alert';

const ContactTab = (
  {    
    contato, 
    telefone,
    //email,
    handleSubmit, 
    hendleInputChange, 
    onChangeInput, 
    onChangeInputObs, 
    //addEmail, 
    addTelefone,
    //addItem,
    hendleInputTelefoneChange,
    //hendleInputEmailChange, 
    onChangeTelefoneInput,
    //onChangeEmailInput,
    telefones,
    deleteTelefone,
    //emails,
    //deleteEmail,
    clearInfo,
    visible,
    setInfo,
    activeTab,
    setActiveTab,

  }) => {
   

  
  
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Contato
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Telefone(s)
          </NavLink>
        </NavItem>
        {/*<NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            E-mail(s)
          </NavLink>
        </NavItem>*/}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
            <ContactFormAdd 
              contato={contato}
              handleSubmit={handleSubmit}
              hendleInputChange={hendleInputChange}
              onChangeInput={onChangeInput} 
              onChangeInputObs={onChangeInputObs}
              setInfo={setInfo}
              clearInfo={clearInfo}
              visible={visible}          
            />
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col cm={6}>
              <ContactFormTelefoneAdd 
                contato={contato}
                telefone={telefone}
                hendleInputTelefoneChange={hendleInputTelefoneChange}
                onChangeTelefoneInput={onChangeTelefoneInput}
                addTelefone={addTelefone}
                setInfo={setInfo}
                clearInfo={clearInfo}
                visible={visible}  
              />
              <ContactFormTelefoneTable 
                telefones={telefones}
                deleteTelefone = {deleteTelefone}
               />                          
            </Col>                   
          </Row>
        </TabPane>
        {/*<TabPane tabId="3">
          <Row>
            <Col cm={6}>
              <ContactFormEmailAdd 
                contato={contato}   
                email={email}             
                hendleInputEmailChange={hendleInputEmailChange}
                addItem={addItem}
                onChangeEmailInput={onChangeEmailInput}
                addEmail={addEmail}
                visible={visible}
                clearInfo={clearInfo}
              />
              <ContactEmailTable 
                emails={ emails }
                deleteEmail={deleteEmail} 
              />
            </Col>            
          </Row>          
      </TabPane>*/}
        <Row>
          <Col cm={6}>
            <AlertMessage 
              text={ contato.info } 
              visible={ visible }
              clearInfo={ clearInfo } 
            />	
            <Button className="margin-top" color="info" onClick={handleSubmit}>Cadastrar</Button> 
          </Col>
        </Row>
      </TabContent>      
    </div>
  );
}

export default ContactTab;
