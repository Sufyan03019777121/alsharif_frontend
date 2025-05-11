import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const UserDashboard = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User Dashboard</h2>

      <Row>
        {/* Profile Section */}
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>👤 My Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> Ali Raza <br />
                <strong>Email:</strong> ali@example.com <br />
                <strong>Phone:</strong> 0345-1234567
              </Card.Text>
              <Button variant="success" className="w-100">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Address Section */}
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🏠 My Addresses</Card.Title>
              <Card.Text>
                <strong>Home:</strong> 123 Street, Lahore<br />
                <strong>Office:</strong> 45-B, Gulberg, Lahore
              </Card.Text>
              <Button variant="success" className="w-100">Manage Addresses</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Orders Section */}
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🛒 My Orders</Card.Title>
              <Card.Text>
                Last Order: <br />
                <strong>2x Rose Plants</strong> - Rs. 3000 <br />
                Status: Delivered
              </Card.Text>
              <Button variant="success" className="w-100">View Orders</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
