import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Row, Col, Container } from 'react-bootstrap';

import api from '../services/api'; // Instancia de axios

function RankingList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/api/ranking');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (

      <Container>
      <h1>Top muñecos elegidos</h1>
      <Row>
                {data.map(ranking => (
                    <Col key={ranking._id} sm={4} md={4} lg={4} xl={4}>
                        <Card className="mb-6">
                            <Card.Body>
                                <Card.Title className="text-center">{ranking.dollType}</Card.Title>
                                <Card.Text className="text-center">{ranking.chosenCount}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
      </Container>
  );
}

export default RankingList;