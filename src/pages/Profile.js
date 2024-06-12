import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';


import  {apiPrivate} from '../services/api'; // Instancia de axios

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await apiPrivate.get('/api/users/' + '6669122fb7632a796bacd610');
                setUser(userData);
                console.log(userData);
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
  );
};

export default Profile;