import React, { useState, useContext, createContext, useEffect } from 'react';
import { maskTelefone, noMaskTelefone } from '../../components/masks';
import { testValidPhone } from '../../components/Utilities';
import { 
  getContacts, deleteContacts, getGroups2, 
  getTypePhone2, updateContact, petchPhone 
} from '../../api/setyContacts';



const SearchContext = createContext();

export default function SearchProvider({ children }) {


  const [groups, setGroups] = useState([]); 
  const [typesPhone, setTypesPhone] = useState([]);



  //MyNodal ----------------------------------

  const modalDefault = {
    isOpen: false,
    className: '',
    title: '',
    text: '',
    actionText1: '',
    actionText2: '',
  };

  const [modal, setModal] = useState(() => modalDefault);
  const toggle = () => setModal(!modal);

  //MyNodal ----------------------------------

  const modalEditDefault = {
    isOpen: false,
    className: '',
    title: '',
    text: '',
    actionText1: '',
    actionText2: '',
  };

  const [modalEdit, setModalEdit] = useState(() => modalEditDefault);
  const toggleEdit = () => setModalEdit(!modalEdit);

  // ----------------------------------

  const [contactTyped, setContactTyped] = useState(() => {
    
    return {
     number: ''
    }
  }); 

  const contactDefault = {
    id_contato: '',
    id_telefone: '',
    id_tipo_telefone: '',
    id_grupo: '',
    nome: '',
    numero: '',
    descricao: '',
    grupo: '',
    observacao: '',
  }

  const [contact, setContact] = useState(() => contactDefault);
  const [contactEdit, setContactEdit] = useState(() => contactDefault);

  const [info, setInfo] = useState(() => {

    return {
      text: '',
      visible: false
    }
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    
    if(contact) {

      clearContactTyped();
      setContactEdit(() => ({
        ...contactEdit,
        ...contact
      }));
    }

  }, [contact]);

  
  useEffect(() => {

    listGrouos();
  }, []);

  useEffect(() => {

    listTypesPhone();
  }, []);

  const listGrouos = async () => {
    
    try {
      
      const resp = await getGroups2();
      if (resp.status === 200) {
        setGroups([
          ...resp.data.grupos
        ]);
      }

    } catch (error) {
      
      testError(error);
    }

  }

  const listTypesPhone = async () => {
    
    try {
      
      const resp = await getTypePhone2();
      if (resp.status === 200) {
        setTypesPhone([
          ...resp.data.tipos_telefone
        ]);
      }

    } catch (error) {

      testError(error);      
    }

  }

  async function handleSubmit (event) {
   
    event.preventDefault(); 
    
    
    if(testNumber()) {
    
      setLoading(true);

      getContacts(noMaskTelefone(contactTyped.number))
      .then(res => setContact(prevState => (
        {
          ...prevState, 
          ...res.data[0]
        }
      )))
      .catch ((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 500) {
            setInfo(prevState => ({
              ...prevState,
               text: 'O Servidor Interno Mysql se encontra desabilitado.',
               visible: true
            })) 
          }else
          {
            setInfo(prevState => ({
              ...prevState,
               text: error.response.data.mensagem,
               visible: true
            }))   
          }                   
        }else{
          setInfo(prevState => ({
            ...prevState,
             text: 'Não foi possível conexão com a API.',
             visible: true
          }))     
        } 
      })
    }    
  }

  const handleEdit = () => {

    setModalEdit({
      ...modalEdit,
      isOpen: true,
      className: '',
      title: 'Atenção!',
      text: `Olá!`,
      actionText1: 'Editar',
      actionText2: 'Cancelar'
    });
  }

  const EditContact = async () => {

    try {

      const resp = await updateContact(contactEdit);

      if (resp.status === 202) {

        const respPhone = await petchPhone(contactEdit);
        if (respPhone.status === 202) {

          setContact(contactEdit);
          setModalEdit(modalEditDefault);
        }
      }
    } catch (error) {

      testError(error);
    }
  }

  const handeldelete = (contact) => {


    setModal({
      ...modal,
      isOpen: true,
      className: '',
      title: 'Atenção!',
      text: `Deseja excluir o Contato: ${contact.nome.toUpperCase()}?`,
      actionText1: 'Sim',
      actionText2: 'Não'
    });
  } 

  const hendleInputChange  = (event) => {
    
    event.preventDefault();
    clearInfo();
    maskTelefone(event);

    setContactTyped({
      [event.target.name]: event.target.value
    })    
  }

  const hendleInputChangeNumberEdit  = (event) => {
    
    event.preventDefault();
    
    clearInfo();
    maskTelefone(event);

    setContactEdit({
      ...contactEdit,
      numero: noMaskTelefone(event.target.value)
    })
  }

  const deleteContact = async () => {

    try {
      
      const resp = await deleteContacts(contact.id_contato);
      
      if (resp.status === 202) {
        setModal({
          ...modal,
          isOpen: true,
          className: '',
          title: 'Informação!',
          text: resp.data.mensagem,
          actionText1: '',
          actionText2: 'OK'
        });
        setContact(contactDefault);
        document.getElementById('numero').focus()
      }

    } catch (error) {
      console.log(error);
    }
  }

  const clearCard = () => {

    setContact(contactDefault);
    setContactEdit(contactDefault);
    document.getElementById('numero').focus();
  }

  const clearContactTyped = () => {
    setLoading(false);
    document.getElementById('numero').value = '';
    setContactTyped({ contactTyped: '' })
  }  

  const hendleInputChangeNameEdit  = (event) => {
    
    event.preventDefault();
    
    clearInfo();
        
    setContactEdit({
      ...contactEdit,
      [event.target.name]: event.target.value
    })
  }

  const hendleInputChangeObsEdit  = (event) => {
    
    event.preventDefault();
    
    clearInfo();
        
    setContactEdit({
      ...contactEdit,
      [event.target.name]: event.target.value
    })
  }


  const clearInfo = () => {

    setInfo(prevState => ({
      ...prevState,
       text: '',
       visible: false
    }));    
  }

  const setError1062 = (erro) => {

    if(erro === `Duplicate entry '${contactEdit.nome}' for key 'nome'`){

      return  `O contato ${contactEdit.nome.toUpperCase()}, já existe.`
    }
    return  `O número ${contactEdit.numero}, já existe.`
  }

  const testError = (error) => {

    if (error.response) {
      switch (error.response.data.error.errno) {
        case 1062:
          
          setModal({
            ...modal,
            isOpen: true,
            className: '',
            title: 'Atenção!',
            text:  setError1062(error.response.data.error.sqlMessage),
            actionText2: 'OK'
          });
          break;
      
        default:
          setInfo(prevState => ({
            ...prevState,
             text:'O Servidor Interno Mysql se encontra desabilitado.',
             visible: true
          }));
          break;
      }           
    }else{
      console.log(error)
      setInfo(prevState => ({
        ...prevState,
         text: 'Não foi possível conexão com a API.',
         visible: true
      }))     
    }
  }

  const testNumber = () => {
   
    if(!contactTyped.number) {
      setInfo(prevState => ({
        ...prevState,
         text: 'Favor informar o número a consultar.',
         visible: true
      }))
      return false;
    }
    else if(!testValidPhone(contactTyped.number)) {

      setInfo(prevState => ({
        ...prevState,
         text: 'Número informado é inválido.',
         visible: true
      }))
     
      return false;
    }
    else {
      clearInfo();      
      return true;
    }
  }


   return (
     <SearchContext.Provider
      value={{
        contact,
        info,
        handleSubmit,
        hendleInputChange,
        clearInfo,
        loading,
        handeldelete,
        modal,
        modalEdit,
        toggle,
        toggleEdit,
        deleteContact,
        clearCard,
        handleEdit,
        EditContact,
        groups,
        typesPhone, 
        contactEdit,
        setContactEdit,
        hendleInputChangeNumberEdit,
        hendleInputChangeNameEdit,
        hendleInputChangeObsEdit
      }}
     >
       { children }
     </SearchContext.Provider>
   )

}

export function useSearch() {

  const context = useContext(SearchContext)
  if(!context) throw new Error('useContext deve ser usado com o SearchContext.');

  const {
    contact,
    info,
    handleSubmit,
    hendleInputChange,
    clearInfo,
    loading,
    handeldelete,
    modal,
    modalEdit,
    toggle,
    toggleEdit,
    deleteContact,
    clearCard,
    handleEdit,
    EditContact,
    groups,
    typesPhone,
    contactEdit,
    setContactEdit,
    hendleInputChangeNumberEdit,
    hendleInputChangeNameEdit,
    hendleInputChangeObsEdit
  } = context;

  return {
    contact,
    info,
    handleSubmit,
    hendleInputChange,
    clearInfo,
    loading,
    handeldelete,
    modal,
    modalEdit,
    toggle,
    toggleEdit,
    deleteContact,
    clearCard,
    handleEdit,
    EditContact,
    groups,
    typesPhone,
    contactEdit,
    setContactEdit,
    hendleInputChangeNumberEdit,
    hendleInputChangeNameEdit,
    hendleInputChangeObsEdit
  }

}