import React, { 
  useState, 
  useContext, 
  createContext, 
  useEffect,
} from 'react';

import { 
  getGroups2, 
  postGroup, 
  deletetGroup,
  updateGroup 
} from '../../api/setyContacts';


const GroupContext = createContext();



export default function GroupProvider({ children }) {


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

  //GroupUpdate - NestedModal ---------------------------------


  const infoNestedModalDefault = {
    title: '',
    text: '',
    actionText1: '',
    actionText2: '',
  }

  const [infoNestedModal, setInfoNestedModal] = useState(() => infoNestedModalDefault);

  const [modalUpdate, setModalUpdate] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  


  const [groups, setGroups] = useState(() => []);
  
  const [info, setInfo] = useState(() => {

    return {
      text: '',
      visible: false
    }
  });

  const [groupTyped, setGroupTyped] = useState(() => {

    return {
     descricao: ''
    }
  }); 

  const groupDeleteDefaulte = {
    index: '',
    id_grupo: '',
    descricao: ''
  }

  const [groupDelete, setGroupDelete] = useState(() => groupDeleteDefaulte);

  const groupUpdatefaulte = {
    index: '',
    id_grupo: '',
    descricao: '',
    previous: '',
  }

  const [groupUpdate, setGroupUpdate] = useState(() => groupUpdatefaulte);


  useEffect(() => {
    
    updateGroupList(); 
  }, []);


  
 
  const updateGroupList = async () => {
    
    try{
      
      const res = await getGroups2();

      if (res.status === 200) {
        setGroups([...res.data.grupos]);
      }

    }
    catch(error) {
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
    }
  }

  const hendleInputChangeAdd  = (event) => {
    
    event.preventDefault();
    
    clearInfo();
    setGroupTyped({
      ...groupTyped, 
      descricao: event.target.value 
    })
  }

  const hendleInputChangeUpdate  = (event) => {
    
    event.preventDefault();
    
    setGroupUpdate({
      ...groupUpdate, 
      descricao: event.target.value 
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault(); 
    
  
    try {
      if(testGroupTyped()) {
        const resp = await postGroup(groupTyped);
        
        if(resp.status === 201) {
          groups.push({
            id_grupo: resp.data.grupoCriado.id_grupo,
            descricao: resp.data.grupoCriado.descricao
          });
          setInfo(prevState => ({
            ...prevState,
             text: resp.data.mensagem,
             visible: true
          }));
          setGroupTyped({
            ...groupTyped, 
            descricao: '' 
          })
          document.getElementById('group').value = '';
        }        
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.data.error.errno) {
          case 1062:
            setInfo(prevState => ({
              ...prevState,
               text: 'Atenção: Grupo já cadastrado!',
               visible: true
            }));
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
        setInfo(prevState => ({
          ...prevState,
           text: 'Não foi possível conexão com a API.',
           visible: true
        }))     
      }    
    }
    document.getElementById('group').focus();
  }

  const handledeleteGroup = (index, id_grupo, descricao) => {
    
    try {
   
      setGroupDelete({
        index,
        id_grupo,
        descricao
      });

      setModal({
        ...modal,
        isOpen: true,
        className: '',
        title: 'Atenção!',
        text: `Deseja excluir o Grupo: ${descricao.toUpperCase()}?`,
        actionText1: 'Sim',
        actionText2: 'Não'
      });

    } catch (error) {
      setInfo(prevState => ({
        ...prevState,
         text: error.response.statusText,
         visible: true
      }));
    }
  }


  const deleteGroup = async () => {
    
    try {

      const resp = await deletetGroup(groupDelete.id_grupo); 
        
      if(resp.status === 202) {    

          setModal({
            ...modal,
            isOpen: true,
            className: '',
            title: 'Informação',
            text: resp.data.mensagem,
            actionText1: '',
            actionText2: 'OK'
          });

          groups.splice(groupDelete.index, 1);
          setGroupDelete(groupDeleteDefaulte);
          updateGroupList();          
      } 

    } catch (error) {
      switch (error.response.data.error.errno) {
        case 1451:
          setModal({
            ...modal,
            isOpen: true,
            className: '',
            title: 'Atenção!',
            text: 'Não é possivel a exclusão, Grupo já relacionado a um ou vários Contatos.',
            actionText1: '',
            actionText2: 'OK'
          });
          break;
      
        default:
          setInfo(prevState => ({
            ...prevState,
             text: error.response.statusText,
             visible: true
          }));
          break;
      }
    }
  }

  const handleUpdateGroup = (index, group) => {

    setGroupUpdate({
      ...groupUpdate, 
      index: index,
      id_grupo: group.id_grupo,
      descricao: group.descricao,
      previous: group.descricao        
    })

    toggleUpdate();
  }
  
  const handleGroupUpdate = (event) => {

    event.preventDefault();
    
    try {
      
      toggleNested();

      if ((groupUpdate.descricao) && (groupUpdate.descricao.toUpperCase() !== groupUpdate.previous.toUpperCase())) {

        updateGroup(groupUpdate.descricao, groupUpdate.id_grupo)
        groups[groupUpdate.index].descricao = groupUpdate.descricao;
        setGroups([...groups]);
        
        setInfoNestedModal({
          title: 'Informação',
          text: 'Grupo Alterado com sucesso!',
          actionText1: '',
          actionText2: 'OK'
        })
        setGroupUpdate(groupUpdatefaulte);
      }
      else {

        setInfoNestedModal({
          title: 'Atenção!',
          text: 'A descrição do Grupo não foi Alterada.',
          actionText1: 'OK',
          actionText2: ''
        })
      }

    } catch (error) {
     console.log(error);
    }
  }

  const clearInfo = () => {

    setInfo(prevState => ({
      ...prevState,
       text: '',
       visible: false
    }));    
    document.getElementById('group').focus();
  }

  const testGroupTyped = () => {
   
    if(!groupTyped.descricao) {
      setInfo(prevState => ({
        ...prevState,
         text: 'Favor informar o Grupo a ser Cadastrado.',
         visible: true
      }))
      return false;
    }
    return true;
  }

  return (
    <GroupContext.Provider
     value={{
      info,
      modal,
      toggle,
      toggleUpdate,
      modalUpdate,
      nestedModal,
      toggleNested,
      closeAll,
      toggleAll,
      groupUpdate,
      groups,
      groupTyped,
      deleteGroup,
      hendleInputChangeAdd,
      handleSubmit,
      handledeleteGroup,
      handleGroupUpdate,
      hendleInputChangeUpdate,
      handleUpdateGroup,
      setGroupUpdate,
      infoNestedModal,
     }}
    >
      { children }
    </GroupContext.Provider>
  )
}

export function useGroup() {

  const context = useContext(GroupContext)
  if(!context) throw new Error('useContext deve ser usado com o GroupContext.');

  const { 
    info,
    modal,
    toggle,
    toggleUpdate,
    modalUpdate,
    nestedModal,
    toggleNested,
    closeAll,
    toggleAll, 
    groupUpdate,   
    groups, 
    groupTyped,
    deleteGroup,
    hendleInputChangeAdd,  
    handleSubmit,
    handledeleteGroup,
    handleGroupUpdate,
    hendleInputChangeUpdate,
    handleUpdateGroup,
    infoNestedModal
  } = context;

  return { 
    info,
    modal,
    toggle,
    toggleUpdate,
    modalUpdate,
    nestedModal,
    toggleNested,
    closeAll,
    toggleAll, 
    groupUpdate,
    groups, 
    groupTyped,
    deleteGroup,
    hendleInputChangeAdd,
    handleSubmit,
    handledeleteGroup,
    handleGroupUpdate,
    hendleInputChangeUpdate,
    handleUpdateGroup,
    infoNestedModal
  }

}