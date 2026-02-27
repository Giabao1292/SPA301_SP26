import { useEffect, useState } from "react";
import { Badge, Card, Container, Table } from "react-bootstrap";
import api from "../api/client";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/bookings/me")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0">
        <Card.Body>
          <Card.Title>My Bookings</Card.Title>
          <div className="table-responsive mt-3">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.bookingDate || "-"}</td>
                    <td>
                      <Badge bg={booking.status === 1 ? "success" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td>{booking.totalPrice || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyBookings;
