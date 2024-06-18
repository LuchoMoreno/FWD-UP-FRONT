import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card, Carousel } from 'react-bootstrap';
import { apiPrivate } from '../services/api'; // Instancia de axios

import CreateDollForm from '../components/CreateDollForm'; // Importa el nuevo componente

import defaultImage from '../../src/assets/imgs/default.png';

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

function Profile() {

  const [user, setUser] = useState(null);
  const [userDolls, setUserDolls] = useState([]);

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


  useEffect(() => {

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
            {/*<div className="text-center mb-3">
              <img
                src={user.profileImage}
                alt="Imagen"
                style={{ maxWidth: '200px', borderRadius: '50%' }}
              />
            </div>*/}
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

      <CreateDollForm onSuccess={fetchUserData} />

      <Container className="mt-5">
        <Card>
          <Card.Header className="text-center">Peluches en Propiedad</Card.Header>
          <Card.Body>
            <Row>
              {userDolls.map(doll => (
                <Col key={doll._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="mb-4">

                    <Card.Header className="text-center">
                      <Card.Title>{doll.type}</Card.Title> {/* Nombre del peluche */}
                    </Card.Header>

                    <Carousel interval={null}>
                                <Carousel.Item>
                                    <Card.Img variant="top" src={getImagePath(doll.type, doll.color)} />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <Card.Img variant="top" src={getImagePathInstrument(doll.accessories)} />
                                </Carousel.Item>
                    </Carousel>

                    <Card.Body>
                      <Card.Text>Color: {doll.color}</Card.Text> {/* Descripción del peluche */}
                      <Card.Text>Accesorio: {doll.accessories}</Card.Text> {/* Color del peluche */}
                    </Card.Body>

                    <Card.Footer className="text-center">
                      <Button variant="danger">Eliminar</Button>{/* Boton para eliminar peluche */}
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