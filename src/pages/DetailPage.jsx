// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ useNavigate added
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';


const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ hook
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container className="mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
                ← Back
            </Button>
            <Card className="shadow">
                <Card.Header>
                    <h3>{product.title}</h3>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex gap-2 border-0 shedow flex-wrap mb-3">
                        {product.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="Product"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover', boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)' }}
                            />
                        ))}
                    </div>
                    <p>{product.description}</p>
                    <h5>Rs {product.price} <span style={{
                        color: 'red',
                        textDecoration: 'line-through',
                        fontSize: '1.2rem'
                    }}>
                        Rs {product.price * 2}
                    </span></h5>

                    <Button href="tel:03059425997" variant="primary">Call Now</Button>
                    <Button
                        className='ms-2'
                        variant="success"
                        href={`https://wa.me/923059425997?text=I'm interested in ${product.title}`}
                        target="_blank"
                    >
                        <FaWhatsapp
                            className='mb-1' />
                    </Button>

                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetailPage;
