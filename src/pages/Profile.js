import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiPrivate } from '../services/api'; // Instancia de axios

function Profile() {

  const navigate = useNavigate();

  
  const [user, setUser] = useState(null);
  const [userDolls, setUserDolls] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({type: '', color: '', accessories: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      try {
  
        const response = await apiPrivate.post('/api/dolls', formData);
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

    const fetchUserData = async () => {
      try {
        const userData = await apiPrivate.get('/api/users/me');
        setUser(userData);

        const userDolls = await apiPrivate.get('/api/users/me/dolls');
        setUserDolls(userDolls.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    
  }, []);


  if (!user) {
    return <h2>Intentando obtener la información del perfil...</h2>;
  }

  return (

    <>
      <Container className="mt-3">
        <Card>
          <Card.Header className="text-center">Perfil de Usuario</Card.Header>
          <Card.Body>
            <div className="text-center mb-3">
              <img
                src={user.profileImage}
                alt="Imagen"
                style={{ maxWidth: '200px', borderRadius: '50%' }}
              />
            </div>
            <Card.Title className="text-center">{user.data.name}</Card.Title>

            <Card.Title className="text-center">{user.data.lastname}</Card.Title>

            <Card.Text className="text-center">
              <strong>Email:</strong> {user.data.email}
            </Card.Text>

            <Card.Text className="text-center">
              <strong>Cantidad peluches:</strong> {user.data.dolls.length}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>

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

                        <Button variant="primary" type="submit" className="mx-auto d-block mt-3">
                            Crear Peluche
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

        <Container className="mt-5">
        <Card>
                <Card.Header className="text-center">Peluches en Propiedad</Card.Header>
                <Card.Body>
                    <Row>
                        {userDolls.map(doll => (
                            <Col key={doll._id} sm={12} md={6} lg={4} xl={3}>
                                <Card className="mb-4">
                                    {/* Aquí puedes personalizar la visualización de cada peluche */}
                                    <Card.Img variant="top" src={doll.image} /> {/* Ejemplo de imagen */}
                                    
                                    <Card.Body>
                                        <Card.Title>{doll.type}</Card.Title> {/* Nombre del peluche */}
                                        <Card.Text>{doll.color}</Card.Text> {/* Descripción del peluche */}
                                        <Card.Text>{doll.accessories}</Card.Text> {/* Color del peluche */}
                                        {/* Otros campos del peluche según tu API */}
                                    </Card.Body>
                                    
                                    <Card.Footer className="text-center">
                                    <Button variant="danger">Eliminar</Button>{' '}
                                    </Card.Footer>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>


    </>


  );
};

export default Profile;