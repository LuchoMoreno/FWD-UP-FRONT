import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { apiPublic } from '../services/api'; // Instancia de axios

import { useToast } from '../contexts/ToastContext';


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({isActive: true, name: '', lastname : '', email: '', password: '' });
  const [error, setError] = useState('');
  const { addToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try 
    {
      const response = await apiPublic.post('/api/users', formData);
      addToast('success', 'El usuario se ha registrado correctamente. ¡Bienvenido!');
      navigate('/login');

    } catch (error) {
      if (error.response && error.response.status === 401) {
          setError('Por favor, inténtelo de nuevo.');
      } else {
          setError('Ha ocurrido un error');
      }
  }
  };

  return (
    <Container className="mt-5 vh-100">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="bg-light p-4 rounded shadow">
            <h2 className="text-center mb-4">Crear cuenta</h2>

            <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="name" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Apellido:</Form.Label>
                <Form.Control type="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
              </Form.Group>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

              <Button variant="primary" type="submit" className="mx-auto d-block mt-3">Registrarse</Button>

            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;