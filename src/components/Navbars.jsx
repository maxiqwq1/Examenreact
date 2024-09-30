import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

function Navbars() {
  const { getQuantity, totalPrice, token, logout } = useContext(CartContext);

  return (
    <Navbar bg="dark" expand="md" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="text-white">Pizitarika!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="me-2">
              <Button variant="outline-warning" className="text-white">
                🍕 Home
              </Button>
            </Link>
            {/* Mostrar botones según el valor del token */}
            {token ? (
              <>
                <Link to="/Profile" className="me-2">
                  <Button variant="outline-warning" className="text-white">
                    🔒 Perfil
                  </Button>
                </Link>
                <Button variant="outline-warning" onClick={logout} className="text-white me-2">
                  🔒 Salir de el perfil
                </Button>
              </>
            ) : (
              <>
                <Link to="/register" className="me-2">
                  <Button variant="outline-warning" className="text-white">
                    🔒 Registar
                  </Button>
                </Link>
                <Link to="/login" className="me-2">
                  <Button variant="outline-warning" className="text-white">
                    🔒 Entrar
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex me-4">
          <Link to="/cart">
            <Button variant="outline-primary">
              Total: $ {totalPrice} {"  "} CARRITO: {getQuantity()}
            </Button>
          </Link>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Navbars;