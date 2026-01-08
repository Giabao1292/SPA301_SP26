import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer({ avatar, name, email }) {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Cột 1: Hình ảnh */}
          <Col md={4}>
            <img
              src={avatar}
              alt="Logo"
              height="200
              "
            />
          </Col>

          {/* Cột 2: Copyright */}
          <Col md={4} className="text-center">
            <h5>Tác giả: &copy; {name}</h5>© 2024 All rights reserved
          </Col>

          {/* Cột 3: Email */}
          <Col md={4} className="text-md-end">
            <a href={"mailto:${email}"}>{email}</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#222",
    color: "#fff",
    padding: "20px 0",
    marginTop: "auto",
  },
};

export default Footer;
