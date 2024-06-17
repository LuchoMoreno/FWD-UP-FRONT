import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiPrivate } from '../services/api'; // Instancia de axios

const CreateDollForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ type: '', color: '', accessories: '' });

  const [error, setError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

    try {

      const response = await apiPrivate.post('/api/dolls', formData);
      onSuccess();
      navigate('/');
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
          setError('Por favor, inténtelo de nuevo.');
      } else {
          setError('Ha ocurrido un error');
      }
  }
};

useEffect(() => {
    const validateForm = () => {
      const { type, color, accessories } = formData;
      return type !== '' && color !== '' && accessories !== '';
    };
    setIsFormValid(validateForm());
  }, [formData]);

return (

<Container className="mt-5">
<Card>
    <Card.Header className="text-center">Creación de Peluche</Card.Header>
    <Card.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Tipo:</Form.Label>
                <Form.Control as="select" name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Seleccionar tipo...</option>
                    <option value="Oso">Oso</option>
                    <option value="Jirafa">Jirafa</option>
                    <option value="Gato">Gato</option>
                    <option value="Perro">Perro</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Color:</Form.Label>
                <Form.Control as="select" name="color" value={formData.color} onChange={handleChange}>
                    <option value="">Seleccionar color...</option>
                    <option value="Default">Sin pintar</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Negro">Negro</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Amarillo">Amarillo</option>
                    <option value="Azul">Azul</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Accesorios:</Form.Label>
                <Form.Control as="select" name="accessories" value={formData.accessories} onChange={handleChange}>
                    <option value="">Seleccionar accesorio...</option>
                    <option value="Guitarra">Guitarra</option>
                    <option value="Bajo">Bajo</option>
                    <option value="Bateria">Batería</option>
                    <option value="Piano">Piano</option>
                </Form.Control>
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Button variant="primary" type="submit" className="mx-auto d-block mt-3" disabled={!isFormValid}>
              Crear Peluche
            </Button>

        </Form>
    </Card.Body>
</Card>
</Container>
  );
};

export default CreateDollForm;