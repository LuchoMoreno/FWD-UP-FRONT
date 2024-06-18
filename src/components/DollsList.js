import React, { useState, useEffect } from 'react';

import { Card, Row, Col, Pagination, Container } from 'react-bootstrap';

import {apiPublic} from '../services/api'; // Instancia de axios

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

// Función para formatear la fecha y hora en dd/mm/yyyy hh:mm:ss
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Formato 24 horas
    };
    return date.toLocaleDateString('es-ES', options).replace(',', '');
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
                            <Card.Img variant="top" src={getImagePath(doll.type, doll.color)} />
                            <Card.Body>
                                <Card.Text>Color: {doll.color}</Card.Text>
                                <Card.Text>Accesorios: {doll.accessories}</Card.Text>
                                <Card.Text>Agregado: {formatDate(doll.createdAt)}</Card.Text>
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