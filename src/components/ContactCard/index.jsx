import React from 'react';
import { Badge } from 'reactstrap';
import { 
  AiFillPhone, AiOutlinePaperClip, 
  AiOutlineEdit, AiOutlineClose 
} from 'react-icons/ai';
import { BsFillPersonFill, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { FaHandPointLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrObjectUngroup } from 'react-icons/gr';
import '../../styles.css';
import { 
  Card, CardHeader, CardBody, 
  CardText, Button
} from 'reactstrap';
import { useSearch } from '../../contexts/SearchContext';
import MyModal from '../MyModal';
import ContactEdit from '../ContactEdit';
import PhoneAdd from '../PhoneAdd';


export default function ContactCard () {

  const {
    contact,
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
    hendleInputChange,
    hendleInputChangeNumberEdit,
    hendleInputChangeNameEdit,
    hendleInputChangeObsEdit,
    handleAddPhone,
    modalAddPhone,
    toggleAddPhone
   } = useSearch();

  return(
    <>
      <Card className="border shadow">
        <CardHeader tag="h3">
          <BsFillPersonFill />{ contact.nome } 
          <div className="float-right">
            { /*!contact.numero &&  <h6><NavLink className="dropdown-item" exact to="/contato">Add</NavLink></h6>*/ }
            { contact.numero && <Button color="" onClick={ () => handleEdit() } ><AiOutlineEdit /> </Button> }
            { contact.numero && <Button color="" onClick={ ()=> handeldelete(contact) } ><RiDeleteBin6Line /> </Button> }
            { contact.numero && <Button  color="" onClick={ ()=> clearCard() } ><AiOutlineClose /> </Button> }
          </div>  
        </CardHeader>
        <CardBody>
          <CardText><span className="text-muted"><AiFillPhone /> Número: </span> { contact.numero} {/* contact.numero &&  <>| <Badge  href="#" color="light" onClick={ () => / handleAddPhone() } >ADD NOVO +< AiFillPhone /></Badge></> */}</CardText>
          <CardText><span className="text-muted"><AiOutlinePaperClip /> Tipo:</span> { contact.descricao }</CardText>
          <CardText><span className="text-muted"><GrObjectUngroup /> Grupo:</span> { contact.grupo } { contact.grupo ? <FaHandPointLeft  /> : '' } </CardText>
          <CardText><span className="text-muted"><BsReverseLayoutTextSidebarReverse /> Obs:</span> { contact.observacao }</CardText>
        </CardBody>         
      </Card>
      <MyModal 
        modal={modal}
        toggle={toggle}
        action={deleteContact}
      />
      <ContactEdit 
        modal={modalEdit}
        toggle={toggleEdit}
        action={EditContact}
        contact={contact}
        groups={groups}
        typesPhone={typesPhone}
        contactEdit={contactEdit}
        setContactEdit={setContactEdit}
        hendleInputChange={hendleInputChange}
        hendleInputChangeNumberEdit={hendleInputChangeNumberEdit}
        hendleInputChangeNameEdit={hendleInputChangeNameEdit}
        hendleInputChangeObsEdit={hendleInputChangeObsEdit}
      />
      <PhoneAdd 
        modal={modalAddPhone}
        toggle={toggleAddPhone}
      />
    </>
  );
}
  

