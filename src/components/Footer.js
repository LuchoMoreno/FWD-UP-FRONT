// Footer.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:lucho.moreno@live.com">Correo electrónico</a></li>
              <li><a href="1122334455">Teléfono</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Sobre Nosotros</Link></li>
              <li><a href="/">Política de Privacidad</a></li>
              <li><a href="/">Términos de Servicio</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://linkedin.com">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-3" />
        <p className="text-center">© {new Date().getFullYear()} Proyecto Fullstack - Cristian Luciano Moreno</p>
      </Container>
    </footer>
  );
};

export default Footer;