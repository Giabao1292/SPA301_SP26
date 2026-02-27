import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api/client";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api
      .get("/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]));
  }, []);

  return (
    <Container className="page-section">
      <div className="mb-4">
        <h2 className="fw-bold">Available Rooms</h2>
        <p className="text-muted mb-0">
          Browse our latest room inventory and pricing.
        </p>
      </div>
      <Row className="g-4">
        {rooms.map((room) => (
          <Col md={6} lg={4} key={room.id}>
            <Card className="h-100 card-shadow border-0 position-relative room-card-v2">
              <Card.Body className="d-flex flex-column">
                <div className="room-card-header">
                  <span
                    className={`room-status-pill ${room.status === 1 ? "is-available" : "is-unavailable"}`}
                  >
                    {room.status === 1 ? "Available" : "Unavailable"}
                  </span>
                  <div className="badge-price">
                    {formatPrice(room.pricePerDay)}
                  </div>
                </div>
                <Button
                  as={Link}
                  to={`/bookings/new?roomId=${room.id}`}
                  variant="primary"
                  size="sm"
                  className="room-book-btn"
                  disabled={room.status !== 1}
                >
                  {room.status === 1 ? "Book now" : "Unavailable"}
                </Button>
                <div className="room-card-img" aria-hidden />
                <div className="d-flex justify-content-between align-items-start mt-2">
                  <div>
                    <Card.Title className="mb-0">
                      Room {room.roomNumber}
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-2 small-muted">
                      {room.roomType?.name || "Standard"}
                    </Card.Subtitle>
                  </div>
                </div>
                <div className="mt-3 room-description">
                  {roomdetailOrDefault(room)}
                </div>
                <div className="mt-auto pt-3 room-meta-grid">
                  <div>
                    <div className="room-meta-label">Capacity</div>
                    <div className="room-meta-value">
                      {room.maxCapacity || "-"} guests
                    </div>
                  </div>
                  <div>
                    <div className="room-meta-label">Room ID</div>
                    <div className="room-meta-value">#{room.id}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

function roomdetailOrDefault(room) {
  return (
    room.detailDescription || room.description || "No description available."
  );
}

function formatPrice(price) {
  if (!price) return "Contact us";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export default Rooms;
