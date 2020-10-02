import React from 'react';
import ContactSearch from '../../components/ContactSearch';
import ContactCard from '../../components/ContactCard';
import MyTootip from '../../components/MyTooltip';
import TextAttentionNumberNine from '../../components/TextAttentionNumberNine';
import SearchProvider from '../../contexts/SearchContext';

const Home = () => {
  
  return(
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-6">
          <h3>Consultar Contatos </h3><hr/>
            <SearchProvider>
              <TextAttentionNumberNine  />
              <ContactSearch />             
              <ContactCard />
             <MyTootip
              target='TooltipSearch'
              text={'Consulta o número digitado.'}
            /> 
            </SearchProvider>           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;