import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function About() {
  return (
    <Container className="py-5">
      {/* Tiêu đề */}
      <h1 className="text-center mb-5">🌸 About Orchid Store</h1>

      <Row className="align-items-center">
        {/* Cột hình ảnh */}
        <Col md={6} className="mb-4 mb-md-0 text-center">
          <img
            src="https://xenangphuy.com/wp-content/uploads/lan-dep.jpg"
            alt="Orchid Garden"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "380px", objectFit: "cover" }}
          />
        </Col>

        {/* Cột nội dung */}
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">
                🌿 Welcome to Orchid Store
              </Card.Title>

              <Card.Text>
                Orchid Store is a place dedicated to orchid lovers, offering a
                wide variety of beautiful and high-quality orchids from trusted
                growers.
              </Card.Text>

              <Card.Text>
                We believe that orchids are not just flowers, but a symbol of
                elegance, patience, and passion. Our mission is to bring the
                beauty of orchids closer to everyone.
              </Card.Text>

              <ul>
                <li>🌸 Premium orchid collections</li>
                <li>🌱 Carefully selected & well cared</li>
                <li>🚚 Fast & safe delivery</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
