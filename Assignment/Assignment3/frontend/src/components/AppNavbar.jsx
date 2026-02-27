import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const AppNavbar = ({ role, onLogout }) => (
  <Navbar bg="white" variant="light" expand="lg" className="shadow-sm py-3">
    <Container>
      <Navbar.Brand as={Link} to="/" className="brand">
        FU Mini Hotel
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/rooms">
            Rooms
          </Nav.Link>
          {role === "CUSTOMER" && (
            <>
              <Nav.Link as={NavLink} to="/my-bookings">
                My Bookings
              </Nav.Link>
              <Nav.Link as={NavLink} to="/bookings/new">
                Book a Room
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile">
                Profile
              </Nav.Link>
            </>
          )}
          {role === "STAFF" && (
            <NavDropdown title="Staff" id="staff-nav">
              <NavDropdown.Item as={NavLink} to="/staff/customers">
                Customers
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/staff/rooms">
                Rooms
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/staff/room-types">
                Room Types
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/staff/bookings">
                Bookings
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/staff/booking-details">
                Booking Details
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        <Nav className="align-items-center">
          {!role && (
            <>
              <Nav.Link as={NavLink} to="/login" className="text-muted">
                Login
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/register"
                className="btn btn-sm btn-primary text-white ms-2"
              >
                Register
              </Nav.Link>
            </>
          )}
          {role && (
            <Nav.Link onClick={onLogout} className="text-danger">
              Logout ({role})
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;
