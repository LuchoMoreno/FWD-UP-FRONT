import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { apiPublic } from '../services/api'; // Instancia de axios
import { useAuth } from '../contexts/AuthContext';


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Utiliza el contexto de autenticación para obtener la función de login
  const [formData, setFormData] = useState({email: '', password: '' });
  const [error, setError] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try 
    {
      const response = await apiPublic.post('/api/auth/login', formData);
      
      const token = response.data;
      
      await login(token); 
      
      navigate('/profile');

    } catch (error) {
      if (error.response && error.response.status === 401) {
          setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
      } else {
          setError('Error al iniciar sesión. Por favor, inténtelo más tarde.');
      }
  }
  };

  return (
    <Container className="mt-5 vh-100">
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


              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

              <Button variant="primary" type="submit" className="mx-auto d-block mt-3">Iniciar Sesión</Button>

            </Form>
            <p className="text-center mt-3">
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;