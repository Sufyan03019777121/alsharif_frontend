import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { FaWhatsapp, FaPhone, FaArrowLeft } from 'react-icons/fa';

const DetailPage = () => {
  const { id } = useParams(); // 🧠 get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product detail:', error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading product detail...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h4>Product not found.</h4>
        <Link to="/" className="btn btn-secondary mt-3"><FaArrowLeft /> Back to Home</Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="mb-4 text-center">
        <Link to="/" className="btn btn-secondary">
            <FaArrowLeft /> Back to Home
          </Link> 
        <h2>{product.title}</h2>
        
      </div>

      <Row className="g-3">
        {product.images?.map((img, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="shadow-sm">
              <Card.Img variant="top" src={img} style={{ height: '250px', objectFit: 'cover' }} />
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4 p-3 shadow-sm">
        <h4>Price: <span className="text-success">Rs {product.price}</span></h4>
        <p className="text-decoration-line-through text-danger">Old Price: Rs {product.price * 2}</p>

        <p className="text-muted">{product.description}</p>

        <div className="d-flex gap-3 mt-3">
          <Button
            variant="success"
            href={`https://wa.me/923059425997?text=I'm interested in ${product.title}`}
            target="_blank"
          >
            <FaWhatsapp /> WhatsApp
          </Button>
          <Button variant="primary" href="tel:03059425997">
            <FaPhone /> Call
          </Button>
          
        </div>
      </Card>
    </Container>
  );
};

export default DetailPage;
