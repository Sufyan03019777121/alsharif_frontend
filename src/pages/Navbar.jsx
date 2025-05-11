import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as BSNavbar, Offcanvas } from 'react-bootstrap';
import alsharif_nav_logo from "../asset/logo/alsharifnursery_logo.png";

const Navbar = () => {
  return (
    <>
      <BSNavbar key="lg" bg="success" variant="dark" expand="lg" className="navbar-custom mb-3">
        <Container fluid>
          <BSNavbar.Brand as={Link} to="/" className="navbar-logo">
            <img style={{ height: 50 }} src={alsharif_nav_logo} alt="logo" />
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <BSNavbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header className='text-center background_light_green shadow rounded-3 m-3' closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Al Sharif Nursery
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end shadow rounded-3 shadow bg-success text-center flex-grow-1 p-2 navbar-links">
                <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="navbar-link">Contact</Nav.Link>
                <Nav.Link as={Link} to="/AboutUs" className="navbar-link"> AboutUs</Nav.Link>
                <Nav.Link as={Link} to="/login" className="navbar-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/userdashboard" className="navbar-link">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/checkoutpage" className="navbar-link">Checkout</Nav.Link>
                <Nav.Link as={Link} to="/ProductList" className="navbar-link">Products</Nav.Link>
                <Nav.Link as={Link} to="/CartPage" className="navbar-link">CartPage</Nav.Link>
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
