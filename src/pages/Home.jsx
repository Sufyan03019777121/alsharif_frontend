import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { FaShoppingCart, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProducts();

    const savedPhone = localStorage.getItem('phoneNumber');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
      setIsPhoneNumberSubmitted(true);
      fetchCart(savedPhone);
    } else {
      // Show phone number modal after 5 seconds if not saved
      const timer = setTimeout(() => setShowModal(true), 5000);
      return () => clearTimeout(timer);
    }

    // Optional: ping server every 14 minutes to keep alive (can be removed if unnecessary)
    const interval = setInterval(() => {
      axios.get('https://al-sharif-nursery.onrender.com/api/products').catch(() => {});
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://al-sharif-nursery.onrender.com/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch cart by phone number
  const fetchCart = async (phone) => {
    try {
      const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/cart/${phone}`);
      setCart(res.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    }
  };

  // Save phone number and fetch cart
  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) {
      alert('Phone number is empty. You can continue without it.');
      setShowModal(false);
      return;
    }

    try {
      await axios.post('https://al-sharif-nursery.onrender.com/api/phoneNumbers', { phoneNumber });
      setIsPhoneNumberSubmitted(true);
      setShowModal(false);
      localStorage.setItem('phoneNumber', phoneNumber);
      alert(`Phone number (${phoneNumber}) saved successfully`);
      fetchCart(phoneNumber);
    } catch (error) {
      console.error('Error saving phone number:', error);
      alert('Failed to save phone number. Please try again.');
    }
  };

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const userPhone = phoneNumber || 'guest';
      await axios.post('https://al-sharif-nursery.onrender.com/api/cart/add', {
        phoneNumber: userPhone,
        productId: product._id,
      });

      if (phoneNumber) {
        fetchCart(phoneNumber);
      } else {
        alert('Product added to cart for guest user (not saved permanently)');
        setCart(prevCart => [...prevCart, { productId: product._id, title: product.title, price: product.price, quantity: 1 }]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (!phoneNumber) {
      alert('Please enter your phone number to remove items from cart.');
      return;
    }

    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/cart/remove/${phoneNumber}/${productId}`);
      fetchCart(phoneNumber);
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart.');
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if product is already in cart
  const isInCart = (id) => cart.some((item) => item.productId === id);

  return (
    <Container className="mt-4">
      <div className="shadow rounded mb-3 p-3 bg-success bg-opacity-10">
        <h2 className="text-center">AL Sharif Nursery</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <Form.Control
          type="text"
          placeholder="Search Plants..."
          className="shadow border-0 me-3 mb-2"
          style={{ maxWidth: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="dark" onClick={() => setShowCart(true)}>
          <FaShoppingCart className="mb-1" /> View Cart ({cart.length})
        </Button>
      </div>

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
                    alt={product.title}
                    style={{ height: '150px', width: '49%', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-truncate">{product.description}</Card.Text>
                <Card.Text>
                  <strong>Rs {product.price}</strong>{' '}
                  <span style={{ color: 'red', textDecoration: 'line-through', fontSize: '1.2rem' }}>
                    Rs {product.price * 2}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <Button
                    variant="success"
                    href={`https://wa.me/923059425997?text=I'm interested in ${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                  >
                    <FaWhatsapp className="mb-1" />
                  </Button>
                  <Button variant="primary" href="tel:03059425997" title="Call">
                    <FaPhone />
                  </Button>
                  <Button as={Link} to={`/product/${product._id}`} variant="info" title="Details">
                    Detail
                  </Button>
                  <Button
                    variant={isInCart(product._id) ? "success" : "warning"}
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product._id)}
                    title={isInCart(product._id) ? "Already in Cart" : "Add to Cart"}
                  >
                    {isInCart(product._id) ? "Added" : "Cart"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Phone Number Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Phone Number (Optional)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <small className="text-muted">You can skip this and still use the cart as a guest.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Skip</Button>
          <Button variant="primary" onClick={handlePhoneSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="mb-2 border-bottom pb-2 d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6>{item.title}</h6>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Price: Rs {item.price}</p>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(item.productId)}>
                  Remove
                </Button>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
