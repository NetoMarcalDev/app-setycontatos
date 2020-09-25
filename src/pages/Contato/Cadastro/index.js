import React, { useState } from 'react';
import { postContact, postTelefone, getContacts } from '../../../api/setyContacts';
import ContactTab from '../../../components/ContactTab';
import { maskTelefone, noMaskTelefone } from '../../../components/masks';
import ModalConfirm from '../../../components/Modal/Confirm';
import { testValidPhone } from '../../../components/Utilities';


const Contato = () => {

  const [visible, setVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState('1');

  const modalDefault = { modal: false, titulo: '', texto: '', acao1: '', acao2: '' }
  const [modal, setModal] = useState(modalDefault);
  const toggle = () => setModal(!modal);

  const telefoneDefault = { numero: '', id_contato: '', id_tipo_telefone: '', tipo: '' };
  const contatoDefault = { id_contato: '', nome: '', id_grupo: '', descricao: '',  observacao: '', info: '' };
  const emailDefault = { email: '', id_contato: '', id_tipo_email: '', tipo: '' }

  const [contato, setContato] = useState(() => contatoDefault);
  const [telefones, setTelefones] = useState([]);
  const [telefone, setTelefone] = useState(() => telefoneDefault);

  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState(() => emailDefault);

  const addItem = (event) => {
    event.preventDefault();
    
    if(testeEmail() && testeTipoEmail()) {
      
      setEmails([...emails, {
        email: email.email,
        id_contato: email.id_contato,
        id_tipo_email: email.id_tipo_email,
        tipo: email.tipo
      }])

      setEmail({
        ...email,
        ...emailDefault
      });
    }
  }

  const setInfo = (text) => {
    
    setContato({ ...contato, info: text })
    setVisible(true);
  }

  const clearInfo = () => {

    setContato({ ...contato, info: '' });
    setVisible(false);
  }
  
  const addTelefone = async (event) => {

    event.preventDefault();
    
    if(testeTelefone() &&
      testeTipoTelefone()  &&
      await testPhoneExist()) {

      setTelefones([...telefones, {
        numero: telefone.numero,
        id_contato: telefone.id_contato,
        id_tipo_telefone: telefone.id_tipo_telefone,
        tipo: telefone.tipo
      }])
      
      setTelefone({
        ...telefone, 
        numero: '',
        id_contato: '',
        id_tipo_telefone: ''
      })
    }
  }

  const deleteTelefone = (index) => {

    telefones.splice(index, 1);
    updateTelefones();
  }

  const updateEmails = () => {
    setEmails([
      ...emails
    ]);
  }

  const updateTelefones = () => {
    setTelefones([
      ...telefones
    ]);
  }

  const hendleInputTelefoneChange  = (event) => {
    event.preventDefault();

    maskTelefone(event)
    clearInfo();
    setTelefone({
      ...telefone,
      [event.target.name]: event.target.value
    })  
  }

  const hendleInputEmailChange  = (event) => {
    event.preventDefault();
    
    clearInfo();
    setEmail({
      ...email,
      [event.target.name]: event.target.value
    })    
  }

  function onChangeEmailInput(param){


    clearInfo();
    setEmail({
      ...email,
      id_tipo_email: param.value,
      tipo: param.label
    });    
  }

  function onChangeTelefoneInput(param){

    clearInfo();
    setTelefone({
      ...telefone,
      id_tipo_telefone: param.value,
      tipo: param.label
    });
  }

  /*const addEmail = (mail) => {
   if(mail){
    postEmail(mail)
   }
  }*/

  const cadastrarTelefone = async (telefone) => {
    
    if(telefone.numero){
     await postTelefone(telefone)
    }
  }

  const deleteEmail = (index) => {
    emails.splice(index, 1);
    updateEmails();
  }

  const hendleInputChange  = (event) => {
    event.preventDefault();

    clearInfo();
    setContato({
      [event.target.name]: event.target.value
    })    
  }

  const handleSubmit = async (event) => {
    
    event.preventDefault();    

    try {
      
      if(testeCadastrar()){
        
        const resp = await postContact(contato);
        
        if (resp.status === 201) {

          telefones.map(fone => {

              fone.id_contato = resp.data.contatoCriado.id_contato;
              fone.numero = noMaskTelefone(fone.numero);     
              cadastrarTelefone(fone);
            }
          );

          setModal({
            ...modal,
            modal: true,
            titulo: 'Informação',
            texto: 'Contato cadastro com sucesso.',
            acao1: 'OK'
          })
          setActiveTab('1');
          document.getElementById('nome').focus();
          setContato({ ...contato, ...contatoDefault });
          setTelefone({ ...telefone, ...telefoneDefault });
          setTelefones([]);
          //setEmail({ ...email, emailDefault });
          //setEmails([]);          
        }
      }     

    } catch (error) {
      if (error.response) {        
        switch (error.response.data.error.errno) {
          case 1062:
            setModal({
              ...modal,
              modal: true,
              titulo: 'Atenção!',
              texto:  `O Contato ${contato.nome.toUpperCase()} já existe.`,
              acao1: 'OK'
            })
            setActiveTab('1');
            document.getElementById('nome').focus();
            break;
        
          default:
            break;
        }
      }else{
        setInfo(prevState => ({
          ...prevState,
           text: 'Não foi possível conexão com a API.',
           visible: true
        }))     
      }     
    }   
  }
  
  function onChangeInput(param){

    clearInfo();
    setContato({
      ...contato,
      id_grupo: param.value,
      descricao: param.label
    });
  }

  function onChangeInputObs(param){

    setContato({
      ...contato,
      observacao: param.target.value
    });
  }
 
  function testeCadastrar() {

    if(testeContatoNome() && 
      testeGrupo() &&
      testeTelefoneNumero() &&
      testeTipoTelefone()     
    ) {

      return true;
    }
    return false;
  }

  function testeContatoNome() {
    
    if(!document.getElementById('nome').value) {

      setInfo('Favor informar um nome para o Contato.');
      setActiveTab('1');
      document.getElementById('nome').focus();
      return false;
    }
    clearInfo();
    return true;
  }

  function testeGrupo() {

    if(!contato.descricao) {

      setInfo('Favor informar o Grupo.');
      setActiveTab('1');
      document.getElementById('inputGroup').focus();
      return false;
    }
    clearInfo();
    return true;
  }

  const testeTelefone = () => {

    if(!telefone.numero) {

      setInfo('Favor informar o número de telefone para o Contato.'); 
      setVisible(true);     
      return false;
    }
    else if (!testValidPhone(telefone.numero)) {
      
      setInfo('O Número informado inválido.'); 
      document.getElementById('numero').focus();
      setVisible(true);     
      return false;
    }
    else if(!testPhoneListed()) {

      setInfo('Atenção: Número já adicionado a lista.');
      document.getElementById('numero').focus(); 
      setVisible(true);     
      return false;
    }
    
    clearInfo();
    return true;
       
  }

  const testPhoneListed = () => {

    for (let index = 0; index < telefones.length; index++) {
      if (telefones[index].numero === telefone.numero) {
        
        setInfo('Atenção: Número já adicionado a lista.');
        document.getElementById('numero').focus(); 
        setVisible(true);     
        return false;
      } 
    }

    return true;
  }

  const testPhoneExist = async () => {

    try {

      const resp = await getContacts(noMaskTelefone(telefone.numero));

      if (resp.status === 200) {
        
        setInfo( `O número informado já existe no Contato: ${resp.data[0].nome}.`);
        document.getElementById('numero').focus(); 
        setVisible(true);        
        return false;
      }
    } catch (error) {

      return true;
    }
    
  }

  function testeTipoTelefone() {

    if(!telefone.tipo) {

      setInfo('Favor informar o Tipo de Telefone.');
      return false;
    }
    clearInfo();
    return true;
  }

  function testeEmail() {

    if(!document.getElementById('email').value) {

      setInfo('Favor informar o e-mail.'); 
      setVisible(true);     
      return false;
    }
    clearInfo();
    return true;
  }

  function testeTipoEmail() {

    if(document.getElementById('tipo-email').textContent === 'Select...') {

      setInfo('Favor informar o Tipo de E-mail.');
      return false;
    }
    clearInfo();
    return true;
  }

  function testeTelefoneNumero() {

    if(telefones.length <= 0) {

      setInfo('Favor informar e adicionar um telefone para o Contato.');
      setActiveTab('2');
      document.getElementById('numero').focus();
      return false;
    }
    clearInfo();
    return true;
  }

  return(
    <div className="container">
      <div className="py-4">
        <h3>Cadastrar</h3>           
        <ContactTab 
          contato={contato}
          email={email}
          telefone={telefone}
          handleSubmit={handleSubmit}
          hendleInputChange={hendleInputChange}
          onChangeInput={onChangeInput}
          onChangeInputObs={onChangeInputObs} 
          addTelefone={addTelefone}
          addItem={addItem}  
          hendleInputTelefoneChange={hendleInputTelefoneChange}
          hendleInputEmailChange={hendleInputEmailChange}
          onChangeTelefoneInput={onChangeTelefoneInput}
          onChangeEmailInput={onChangeEmailInput}
          telefones={telefones}
          deleteTelefone={deleteTelefone}
          emails={emails}
          deleteEmail={deleteEmail}
          visible={visible}
          setInfo={setInfo}
          clearInfo={clearInfo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />  
        <ModalConfirm modal={modal} toggle={toggle} />   
      </div>      
    </div>   
  );
}

export default Contato;