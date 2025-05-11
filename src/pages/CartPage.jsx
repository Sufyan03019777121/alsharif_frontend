import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const CartPage = ({ cartItems = [], onRemoveItem }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <Container className="my-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>You haven't added anything to the cart yet.</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.image} alt={item.title} style={{ height: 60 }} /></td>
                  <td>{item.title}</td>
                  <td>Rs. {item.price}</td>
                  <td>
                    <Button variant="danger" onClick={() => onRemoveItem(index)}>🗑️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total Price: Rs. {totalPrice}</h4>
          <div className="text-end">
            <Button variant="success">🔒 Confirm Order</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
