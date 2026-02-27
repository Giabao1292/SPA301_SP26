import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => (
  <Container className="page-section">
    <Row className="align-items-center g-4">
      <Col md={6}>
        <h1 className="display-5 fw-bold hero-title">FU Mini Hotel System</h1>
        <p className="lead text-muted">
          Manage rooms, reservations, and customers with a clean React + Spring
          Boot stack.
        </p>
        <div className="hero-actions">
          <Button as={Link} to="/rooms" variant="primary">
            Browse Rooms
          </Button>
          <Button as={Link} to="/register" variant="outline-primary">
            Create Account
          </Button>
        </div>
      </Col>
      <Col md={6}>
        <div className="hero-illustration card-shadow">
          <div className="text-center px-3">
            <div style={{ fontSize: "1.05rem" }}>
              Discover comfortable stays
            </div>
            <div className="text-muted small">
              Search rooms, book easily, manage reservations
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Home;
