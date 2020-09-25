import axios from 'axios';
export const url = 'https://api-setycontatos.herokuapp.com';



  export const getContacts = async (number) => { 
    const response = await axios.get(`${url}/telefones/${number}`)
    return response;
  }
  
  export const postContact = async (contact) => {
    const response = await axios.post(`${url}/contatos/`, contact)
    return response;
  } 
    

  export const deleteContacts = async (id_contato) => { 
    
    const response = await axios.delete(`${url}/contatos/`+id_contato); 

    if (response.status === 202) {
      return await axios.delete(`${url}/contatos/delete/`+id_contato); 
    }
    return response;
  }

  export const updateContact = async (contact) => {
    const response = await axios.patch(`${url}/contatos/`, { ...contact })
    return response;
  } 

  export const postGroup = async (grupo) => {
    const response = await axios.post(`${url}/grupos/`, grupo)    
    return response;
  }
  

  export const getGroups = () => axios 
    .get(`${url}/grupos/`)
    .then(({ data }) => data)
    .catch(error => {
      console.log(error.response)
    });

  export const getGroups2 = async () => {
    const response = await axios.get(`${url}/grupos/`)
    return response;
  }

  export const deletetGroup = async (id_grupo) => {
    const response = await axios.delete(`${url}/grupos/`+ id_grupo)
    return response;
  }

  export const updateGroup = async (descricao, id_grupo) => {
    const response = await axios.patch(`${url}/grupos`, { descricao, id_grupo } )
    return response;
  }

  export const getTypeEmail = () => axios
  .get(`${url}/tipos-email/`)
  .then(({ data }) => data)
  .catch(error => {
    console.log(error.response)
  });

  export const getTypePhone = () => axios
  .get(`${url}/tipos-telefone/`)
  .then(({data}) => data)
  .catch(error => {
    console.log(error.response)
  })
  
  export const getTypePhone2 =  async () => {
  
    const response = await axios.get(`${url}/tipos-telefone/`);
    return response;
  }

  export const postEmail = (mail) => axios
  .post(`${url}/emails/`, mail)
  .then(({ data }) => data)
  .catch(error => {
    console.log(error.response)
  });

  export const postTelefone = (telefone) => axios
  .post(`${url}/telefones/`, telefone)
  .then(({ data }) => data)
  .catch(error => {
    console.log(error.response)
  });

  export const getTelefones = (id_contato) => axios
  .get(`${url}/contatos/` + id_contato)
  .then(({ data }) => data)
  .catch(error => {
    console.log(error.response)
  });

  export const petchPhone =  async (phone) => {
    
    const response = await axios.patch(`${url}/telefones/`, { ...phone} );
    return response;
  }

  export const getEmails = (id_contato) => axios
  .get(`${url}/emails/` + id_contato)
  .then(({ data }) => data)
  .catch(error => {
    console.log(error.response)
  });
