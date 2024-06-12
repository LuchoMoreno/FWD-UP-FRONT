import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar los datos de inicio de sesión al backend y manejar la respuesta
      // Ejemplo:
      // await api.post('/login', formData);
      // Si el inicio de sesión es exitoso, redirigir a la página de perfil
      navigate('/profile');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="bg-light p-4 rounded shadow">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            
            <Form onSubmit={handleSubmit}>
             
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit" className="mx-auto d-block mt-3">Iniciar Sesión</Button>
            
            </Form>
            <p className="text-center mt-3">
              ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;