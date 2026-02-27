import { Card, Container } from 'react-bootstrap'

const StaffPlaceholder = ({ title, description }) => (
  <Container className="py-4">
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted">
          {description}
        </Card.Text>
        <Card.Text>
          Use this section to build full CRUD screens using the backend endpoints.
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
)

export default StaffPlaceholder