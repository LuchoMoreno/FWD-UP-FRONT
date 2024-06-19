import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Container, Modal, Col } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { apiPrivate } from '../services/api'; // Instancia de axios

import defaultImage from '../../src/assets/imgs/default.png';

import { useToast } from '../contexts/ToastContext';


const CreateDollForm = ({ onSuccess }) => {

  const { addToast } = useToast();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ type: '', color: '', accessories: '' });

  const [error, setError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Se ejecuta cuando ya apreto el boton para crear el peluche.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmationModal(true); // Mostrar modal de confirmación
  };


  // Se ejecuta cuando ya apreto el boton de confirmacion para crear el peluche.
  const handleConfirmSubmit = async () => {
    try {
      const response = await apiPrivate.post('/api/dolls', formData);
      onSuccess();
      addToast('success', 'Se ha generado un peluche con éxito!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Por favor, inténtelo de nuevo.');
      } else {
        setError('Ha ocurrido un error');
      }
    } finally {
      setShowConfirmationModal(false); // Cerrar modal de confirmación
    }
  };

  // Este useEffect se ejecuta cada vez que el form cambia. Para volver a validarlo.
  useEffect(() => {
    const validateForm = () => {
      const { type, color, accessories } = formData;
      return type !== '' && color !== '' && accessories !== '';
    };
    setIsFormValid(validateForm());
  }, [formData]);


  // Función para obtener la ruta de la imagen basada en tipo y color
  const getImagePath = (type, color) => {
    const imageName = `${type.toLowerCase()}-${color.toLowerCase()}.png`;
    try {
      // Intentamos importar la imagen
      return require(`../../src/assets/imgs/${imageName}`);
    } catch (error) {
      // Si no se encuentra, usamos la imagen predeterminada
      console.warn(`Image not found: ${imageName}, using default image.`);
      return defaultImage;
    }
  };

  // Función para obtener la ruta de la imagen basada en tipo y color
  const getImagePathInstrument = (type) => {
    const imageName = `${type.toLowerCase()}.png`;
    try {
      // Intentamos importar la imagen
      return require(`../../src/assets/imgs/${imageName}`);
    } catch (error) {
      // Si no se encuentra, usamos la imagen predeterminada
      console.warn(`Image not found: ${imageName}, using default image.`);
      return defaultImage;
    }
  };


  const closeModal = () => setShowConfirmationModal(false);


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


      {/* Modal de Confirmación */}
      <Modal show={showConfirmationModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Creación de Peluche</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="row">
            <Col sm={6} md={6} lg={6} xl={6}>
              <Card className="mb-5">
                <Card.Header className="text-center">Tu peluche se verá así:</Card.Header>
                <Card.Img variant="top" src={getImagePath(formData.type, formData.color)} />
              </Card>
            </Col>

            <Col sm={6} md={6} lg={6} xl={6}>
              <Card className="mb-5">
                <Card.Header className="text-center">Con este accesorio:</Card.Header>
                <Card.Img variant="top" src={getImagePathInstrument(formData.accessories)} />
              </Card>
            </Col>
          </div>

          <p><strong>Tipo:</strong> {formData.type}</p>
          <p><strong>Color:</strong> {formData.color}</p>
          <p><strong>Accesorios:</strong> {formData.accessories}</p>
          <p>¿Estás seguro de que deseas crear este peluche?</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>


    </Container>
  );
};

export default CreateDollForm;