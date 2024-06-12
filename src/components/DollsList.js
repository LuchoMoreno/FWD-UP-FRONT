import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination, Container } from 'react-bootstrap';

import {apiPublic} from '../services/api'; // Instancia de axios
import oso from '../../src/assets/imgs/oso.png';
import jirafa from '../../src/assets/imgs/jirafa.png';
import defaultImage from '../../src/assets/imgs/default.png';

const dollImages = {
    Oso: oso,
    Jirafa: jirafa,
    default: defaultImage // Imagen predeterminada para muñecos sin imagen específica
    // Agrega más tipos de muñecos con sus respectivas imágenes aquí
};


function DollList() {
    const [dolls, setDolls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Número de muñecos por página



    useEffect(() => {
        fetchDolls();
    }, [currentPage]);

    const fetchDolls = async () => {
        const offset = (currentPage - 1) * limit;
        try {
            const response = await apiPublic.get(`/api/dolls?limit=${limit}&offset=${offset}`);

            setDolls(response.data.result);

            const totalCount = response.data.totalCount;

            if (!isNaN(totalCount)) {
                setTotalPages(Math.ceil(totalCount / limit));
            } else {
                setTotalPages(1);
            }

        } catch (error) {
            console.error('Error fetching dolls:', error);
            setTotalPages(1);
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <Container>
            <h1>Lista de Muñecos</h1>

            <Row>
                {dolls.map(doll => (
                    <Col key={doll._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className="mb-5">
                        <Card.Header>{doll.type}</Card.Header>
                        <Card.Img variant="top" src={dollImages[doll.type] || dollImages.default} />
                            <Card.Body>
                                <Card.Text>Color: {doll.color}</Card.Text>
                                <Card.Text>Accesorios: {doll.accessories}</Card.Text>
                            </Card.Body>
                        <Card.Footer className="text-muted">{doll.user.email}</Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

        

            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />

                {[...Array(totalPages).keys()].map(pageNumber => (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber + 1 === currentPage}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        </Container>
    );
}

export default DollList;