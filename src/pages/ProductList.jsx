import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Sample data for testing
const sampleProducts = [
  {
    id: 1,
    title: 'Rose Plant',
    price: 500,
    description: 'Beautiful red rose for your garden.',
    image: '/images/rose.jpg',
    category: 'flowers',
  },
  {
    id: 2,
    title: 'Money Plant',
    price: 300,
    description: 'Low maintenance indoor plant.',
    image: '/images/moneyplant.jpg',
    category: 'indoor',
  },
  // Add more products as needed
];

const ProductList = ({ products = sampleProducts }) => {
  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Our Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={product.image} height="200px" style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-muted">{product.description}</Card.Text>
                <h5 className="text-success">Rs. {product.price}</h5>
                <Button variant="primary" className="mt-2 w-100">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
