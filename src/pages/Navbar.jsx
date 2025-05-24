import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as BSNavbar, Offcanvas } from 'react-bootstrap';
import alsharif_nav_logo from "../asset/logo/alsharifnursery_logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BSNavbar bg="success" variant="dark" expand="lg" className="navbar-custom mb-3">
        <Container fluid>
          <BSNavbar.Brand as={Link} to="/" className="navbar-logo">
            <img style={{ height: 50 }} src={alsharif_nav_logo} alt="logo" />
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <BSNavbar.Offcanvas
            show={show}
            onHide={handleClose}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton className='text-center background_light_green shadow rounded-3 m-3'>
              <Offcanvas.Title id="offcanvasNavbarLabel">Al Sharif Nursery</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end shadow rounded-3 bg-success text-center flex-grow-1 p-2 navbar-links">
                <Nav.Link as={Link} to="/" onClick={handleClose} className="navbar-link">Home</Nav.Link>
                <Nav.Link as={Link} to="/contact" onClick={handleClose} className="navbar-link">Contact</Nav.Link>
                <Nav.Link as={Link} to="/AboutUs" onClick={handleClose} className="navbar-link">AboutUs</Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleClose} className="navbar-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/userdashboard" onClick={handleClose} className="navbar-link">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/checkoutpage" onClick={handleClose} className="navbar-link">Checkout</Nav.Link>
                <Nav.Link as={Link} to="/ProductList" onClick={handleClose} className="navbar-link">Products</Nav.Link>
                <Nav.Link as={Link} to="/CartPage" onClick={handleClose} className="navbar-link">CartPage</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </BSNavbar.Offcanvas>
        </Container>
      </BSNavbar>

      <style jsx>{`
        .navbar-custom {
          background-color: #2a7d2e;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .navbar-logo img {
          transition: transform 0.3s ease;
        }
        .navbar-logo img:hover {
          transform: scale(1.1);
        }
        .navbar-link {
          color: #fff !important;
          font-size: 16px;
          font-weight: 500;
          margin-right: 20px;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .navbar-link:hover {
          color: #f7c900 !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
