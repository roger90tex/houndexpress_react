import React from "react";


const Footer: React.FC = () => {
    return (
        <footer className="footer">
      <div className="footer__content">
        <div className="footer__section footer__section--brand">
          <img src="/img/logoAzulBlancoHE.png" alt="Logotipo Hound Express" className="footer__logo" />
          <p>Hound Express ofrece soluciones logísticas rápidas y confiables para tus envíos nacionales e internacionales.</p>
          <p>&copy; 2025 Hound Express. Todos los derechos reservados.</p>
        </div>
        <div className="footer__section footer__section--contact">
          <h3>Contacto</h3>
          <p><i className="fas fa-phone"></i> MX: +52 (55) 892373267823</p>
          <p><i className="fas fa-phone"></i> USA: +1 (323) 1234567</p>
          <p><i className="fas fa-envelope"></i> <a href="mailto:support@houndexpress.com">support@houndexpress.com</a></p>
        </div>
        <div className="footer__section footer__section--links">
          <h3>Enlaces Rápidos</h3>
          <ul className="footer__links">
            <li className="footer__links-item"><a href="#" className="footer__links-link">Inicio</a></li>
            <li className="footer__links-item"><a href="#" className="footer__links-link">Servicios</a></li>
            <li className="footer__links-item"><a href="#" className="footer__links-link">Nosotros</a></li>
            <li className="footer__links-item"><a href="#" className="footer__links-link">Política de Privacidad</a></li>
          </ul>
        </div>
        <div className="footer__section footer__section--social">
          <h3>Síguenos</h3>
          <div className="footer__social-icons">
            <a href="#" className="footer__social-icons-icon"><i className="fab fa-facebook-f" ></i></a>
            <a href="#" className="footer__social-icons-icon"><i className="fab fa-twitter" ></i></a>
            <a href="#" className="footer__social-icons-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="footer__social-icons-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>Desarrollado por Rogelio López Ramírez</p>
      </div>
    </footer>
  );
};

export default Footer;