import React, { 
  useState, 
  useContext, 
  createContext, 
  useEffect,
} from 'react';

import { 
  getContactLisShow
} from '../../api/setyContacts';


const ListContactContext = createContext();


export default function ListContactProvider({ children }) {

  const [list, setLis] = useState();
 
  useEffect(() => {

    showList();
  }, []);

  const showList = async () => {
    
    try {
      
      const resp = await getContactLisShow();
      if (resp.status === 200) {
        
        setLis([...resp.data]);        
      }

    } catch (error) {

     console.log(error);      
    }
  }

  return (
    <ListContactContext.Provider
     value={{
      list
     }}
    >
      { children }
    </ListContactContext.Provider>
  )
}

export function useListContact() {

  const context = useContext(ListContactContext)
  if(!context) throw new Error('useContext deve ser usado com o ListContactContext.');

  const { 
   list
  } = context;

  return { 
   list
  }

}