import { Card, Badge, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrchidCard({ orchid, onDelete }) {
  return (
    <Card className="shadow-sm border-0 h-100 orchid-card">
      <Card.Img
        variant="top"
        src={
          orchid.orchidUrl || "https://via.placeholder.com/400x250?text=Orchid"
        }
        style={{ height: 220, objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{orchid.name}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {orchid.orchidCategory}
        </Card.Subtitle>

        <Stack direction="horizontal" gap={2} className="mb-2">
          {orchid.isNatural && <Badge bg="success">Natural</Badge>}
          {orchid.isAttractive && (
            <Badge bg="warning" text="dark">
              Special
            </Badge>
          )}
        </Stack>

        <Card.Text className="flex-grow-1">
          {orchid.orchidDescription || "No description"}
        </Card.Text>

        <Stack direction="horizontal" gap={2}>
          <Button
            as={Link}
            to={`/edit/${orchid.id}`}
            size="sm"
            variant="outline-primary"
            className="w-100"
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            className="w-100"
            onClick={() => onDelete(orchid.id)}
          >
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
