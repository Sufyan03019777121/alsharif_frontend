import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // جب فون نمبر آئے تو کارٹ fetch کریں
  useEffect(() => {
    if (phoneNumber) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [phoneNumber]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://al-sharif-nursery.onrender.com/api/cart/${phoneNumber}`);
      setCart(res.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/cart/remove/${phoneNumber}/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, phoneNumber, totalPrice } });
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>

      {/* فون نمبر انپٹ */}
      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Enter your Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      {loading ? (
        <p>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <Row key={item._id} className="mb-3 align-items-center">
              <Col>{item.title}</Col>
              <Col>Rs {item.price} × {item.quantity}</Col>
              <Col>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.productId)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <h4>Total: Rs {totalPrice}</h4>
          <Button variant="success" onClick={handleCheckout}>Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
