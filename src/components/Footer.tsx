import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__content">
        <div className="footer__section footer__section--brand">
          {/* Logo con link al inicio */}
          <a href="#inicio" aria-label="Volver al inicio">
            <img
              src="/img/logoAzulBlancoHE.png"
              alt="Hound Express - Logotipo"
              className="footer__logo"
              loading="lazy"
            />
          </a>

          <p>
            Hound Express ofrece soluciones logísticas rápidas y confiables para tus envíos
            nacionales e internacionales.
          </p>
          <p>&copy; 2025 Hound Express. Todos los derechos reservados.</p>
        </div>

        <div className="footer__section footer__section--contact">
          <h3>Contacto</h3>

          {/* Semántica para contacto */}
          <address className="footer__address">
            <p>
              <i className="fas fa-phone" aria-hidden="true"></i>{" "}
              <span>MX: +52 (55) 892373267823</span>
            </p>
            <p>
              <i className="fas fa-phone" aria-hidden="true"></i>{" "}
              <span>USA: +1 (323) 1234567</span>
            </p>
            <p>
              <i className="fas fa-envelope" aria-hidden="true"></i>{" "}
              <a href="mailto:support@houndexpress.com">support@houndexpress.com</a>
            </p>
          </address>
        </div>

        <div className="footer__section footer__section--links">
          <h3>Enlaces Rápidos</h3>
          <ul className="footer__links">
            <li className="footer__links-item">
              <a href="#inicio" className="footer__links-link">Inicio</a>
            </li>
            <li className="footer__links-item">
              <a href="#servicios" className="footer__links-link">Servicios</a>
            </li>
            <li className="footer__links-item">
              <a href="#nosotros" className="footer__links-link">Nosotros</a>
            </li>
            <li className="footer__links-item">
              <a href="#privacidad" className="footer__links-link">Política de Privacidad</a>
            </li>
          </ul>
        </div>

        <div className="footer__section footer__section--social">
          <h3>Síguenos</h3>

          <div className="footer__social-icons">
            <a
              href="https://facebook.com"
              className="footer__social-icons-icon"
              aria-label="Facebook de Hound Express"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>

            <a
              href="https://twitter.com"
              className="footer__social-icons-icon"
              aria-label="X (Twitter) de Hound Express"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </a>

            <a
              href="https://instagram.com"
              className="footer__social-icons-icon"
              aria-label="Instagram de Hound Express"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>

            <a
              href="https://linkedin.com"
              className="footer__social-icons-icon"
              aria-label="LinkedIn de Hound Express"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
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
