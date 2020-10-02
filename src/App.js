import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navibar';
import Home from './pages/Home';
import Contato from './pages/Contato/Cadastro';
import Grupo from './pages/Grupo';
import Listar from './pages/Listar';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contato" component={Contato} />
          <Route exact path="/grupo" component={Grupo} />
          <Route exact path="/listar" component={Listar} />
          <Route component={NotFound} />
        </Switch>       

      </div>
    </Router>
  );
}

export default App;
