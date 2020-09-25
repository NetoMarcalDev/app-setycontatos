import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { GrObjectUngroup } from 'react-icons/gr'

const Menu = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
      <a className="navbar-brand" href="http://setydeias.com.br">
        <img src="http://setydeias.com.br/wp-content/uploads/2020/02/Nome-da-Logo-1-1.png" width="200" height="40" alt="" loading="lazy" />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" exact to="/">início</NavLink>
          </li>         
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cadastrar
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" exact to="/contato"><BsFillPersonFill /> Contato</NavLink>
              <NavLink className="dropdown-item" exact to="/grupo"><GrObjectUngroup /> Grupo</NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/about">Sobre</NavLink>
          </li>
        </ul>
      </div>
      </div>       
    </nav>
  );
}

export default Menu;