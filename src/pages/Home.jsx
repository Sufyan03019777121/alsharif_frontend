import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <div className='shadow rounded mb-3 p-3 bg-success bg-opacity-10'>
        <h2 className="text-center">AL Sharif Nursery</h2>
      </div>

      <Form.Control
        type="text"
        placeholder="Search Plants..."
        className="mb-4 shadow border-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>Total Products: {filteredProducts.length}</p>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product._id}>
            <Card className="h-100">
              <div style={{ display: 'flex', gap: '5px', padding: '5px' }}>
                {product.images?.slice(0, 2).map((img, index) => (
                  <Card.Img
                    key={index}
                    variant="top"
                    src={img}
                    style={{ height: '150px', width: '49%', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className='text-truncate'>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Rs {product.price}</strong> {' '}
                  <span style={{
                    color: 'red', 
                    textDecoration: 'line-through', 
                    fontSize: '1.2rem'
                  }}>
                    Rs {product.price * 2}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    href={`https://wa.me/923059425997?text=I'm interested in ${product.title}`}
                    target="_blank"
                  >
                    <FaWhatsapp
                    className='mb-1' />
                  </Button>
                  <Button variant="primary" href="tel:03059425997">
                    <FaPhone />
                  </Button>
                  <Button as={Link} to={`/product/${product._id}`} variant="info">
                    Detail
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
