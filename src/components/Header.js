import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
    const comicFontStyle = {
        fontFamily: 'Comic2, cursive',
        fontSize: '1rem', // Tamaño de fuente más grande
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" style={comicFontStyle}>API PELUCHES</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/login" style={comicFontStyle}>Iniciar sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

//                         <Nav.Link as={Link} to="/" style={comicFontStyle}>Inicio</Nav.Link>

//                         <Nav.Link as={Link} to="/profile" style={comicFontStyle}>Perfil</Nav.Link>

export default Header;