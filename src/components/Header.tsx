import React from "react";
import logo from "../../public/img/logo-Hound_Express-bg-white.png"


const Header: React.FC = () => {
  return (
    <header className="header" id="inicio">
      <div className="header__banner">
        <img src="/img/logo-Hound_Express-bg-white.png" alt="Logotipo Hound Express" className="header__logo" />
        <div className="header__contact">
          <div className="header__number">
            <span>MX: +52 (55) 892373</span>
          </div>
          <div className="header__number">
            <span>USA: +1 (323) 123456</span>
          </div>
          <div className="header__language">
            <label htmlFor="language">Selecciona un idioma:</label>
            <select id="language" className="header__language-select">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <div className="header__hamburger">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item"><a href="#" className="header__menu-link">Inicio</a></li>
          <li className="header__menu-item"><a href="#" className="header__menu-link">Registro de Guías</a></li>
          <li className="header__menu-item"><a href="#" className="header__menu-link">Estado General</a></li>
          <li className="header__menu-item"><a href="#" className="header__menu-link">Lista de Guías</a></li>
          <li className="header__menu-item"><a href="#" className="header__menu-link">Buscar Guías</a></li>
          <li className="header__menu-item"><a href="#" className="header__menu-link">Historial de Guías</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;