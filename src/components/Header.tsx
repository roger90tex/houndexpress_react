import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header" id="inicio">
      <div className="header__banner">

        {/* Logo con link al inicio */}
        <a href="#inicio" aria-label="Ir al inicio - Hound Express">
          <img
            src="/img/logo-Hound_Express-bg-white.png"
            alt="Hound Express - Logotipo"
            className="header__logo"
          />
        </a>

        <div className="header__contact">
          <div className="header__number">
            <span>MX: +52 (55) 892373</span>
          </div>
          <div className="header__number">
            <span>USA: +1 (323) 123456</span>
          </div>

          <div className="header__language">
            <label htmlFor="language">Selecciona un idioma:</label>
            <select
              id="language"
              name="language"
              className="header__language-select"
              aria-label="Selector de idioma"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Botón hamburguesa accesible */}
        <button
          type="button"
          className="header__hamburger"
          aria-label="Abrir menú de navegación"
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      <nav className="header__nav" aria-label="Navegación principal">
        <ul className="header__menu">
          <li className="header__menu-item">
            <a href="#inicio" className="header__menu-link">Inicio</a>
          </li>
          <li className="header__menu-item">
            <a href="#registro" className="header__menu-link">Registro de Guías</a>
          </li>
          <li className="header__menu-item">
            <a href="#estado" className="header__menu-link">Estado General</a>
          </li>
          <li className="header__menu-item">
            <a href="#lista" className="header__menu-link">Lista de Guías</a>
          </li>
          <li className="header__menu-item">
            <a href="#buscar" className="header__menu-link">Buscar Guías</a>
          </li>
          <li className="header__menu-item">
            <a href="#historial" className="header__menu-link">Historial de Guías</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
