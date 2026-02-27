import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";

const emptyRow = { roomId: "", startDate: "", endDate: "", actualPrice: 0 };

const calculateNights = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) && nights > 0 ? nights : 0;
};

const CreateBooking = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [details, setDetails] = useState([{ ...emptyRow }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    api
      .get("/rooms")
      .then((res) => {
        const fetchedRooms = res.data || [];
        setRooms(fetchedRooms);
        const prefillRoomId = searchParams.get("roomId");
        if (prefillRoomId) {
          setDetails([{ ...emptyRow, roomId: prefillRoomId }]);
        }
      })
      .catch(() => setRooms([]));
  }, [searchParams]);

  const roomOptions = useMemo(() => rooms || [], [rooms]);

  const handleDetailChange = (index, field, value) => {
    setFieldError("");
    setDetails((prev) => {
      const next = [...prev];
      const updated = { ...next[index], [field]: value };
      next[index] = updated;
      return next;
    });
  };

  const computedDetails = useMemo(() => {
    return details.map((detail) => {
      const room = rooms.find((item) => `${item.id}` === `${detail.roomId}`);
      const nights = calculateNights(detail.startDate, detail.endDate);
      const pricePerDay = room?.pricePerDay ? Number(room.pricePerDay) : 0;
      const actualPrice = nights * pricePerDay;
      return { ...detail, actualPrice, nights, pricePerDay };
    });
  }, [details, rooms]);

  useEffect(() => {
    const total = computedDetails.reduce(
      (sum, detail) => sum + (detail.actualPrice || 0),
      0,
    );
    setTotalPrice(total);
  }, [computedDetails]);

  const addRow = () => setDetails((prev) => [...prev, { ...emptyRow }]);

  const removeRow = (index) => {
    setDetails((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setFieldError("");

    const invalidDetail = computedDetails.find(
      (detail) =>
        !detail.roomId ||
        !detail.startDate ||
        !detail.endDate ||
        calculateNights(detail.startDate, detail.endDate) <= 0,
    );

    if (invalidDetail) {
      setFieldError(
        "Please select room and valid dates for each row. End date must be after start date.",
      );
      return;
    }

    try {
      const payload = {
        totalPrice: totalPrice || 0,
        bookingDetails: computedDetails
          .filter((detail) => detail.roomId)
          .map((detail) => ({
            room: { id: Number(detail.roomId) },
            startDate: detail.startDate || null,
            endDate: detail.endDate || null,
            actualPrice: detail.actualPrice || 0,
          })),
      };
      await api.post("/bookings/me", payload);
      setStatus({ type: "success", message: "Booking created successfully." });
      setDetails([{ ...emptyRow }]);
      setTotalPrice(0);
    } catch (error) {
      setStatus({
        type: "danger",
        message: "Booking failed. Please try again.",
      });
    }
  };

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0">
        <Card.Body>
          <Card.Title>Create Booking</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={totalPrice}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actual Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {computedDetails.map((detail, index) => (
                    <tr key={`detail-${index}`}>
                      <td>
                        <Form.Select
                          value={detail.roomId}
                          onChange={(e) =>
                            handleDetailChange(index, "roomId", e.target.value)
                          }
                          required
                        >
                          <option value="">Select room</option>
                          {roomOptions.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.roomNumber}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control
                          type="date"
                          value={detail.startDate}
                          onChange={(e) =>
                            handleDetailChange(
                              index,
                              "startDate",
                              e.target.value,
                            )
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="date"
                          value={detail.endDate}
                          onChange={(e) =>
                            handleDetailChange(index, "endDate", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          value={detail.actualPrice}
                          readOnly
                        />
                        <div className="text-muted small">
                          {detail.nights || 0} nights × ₫
                          {detail.pricePerDay || 0}
                        </div>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeRow(index)}
                          disabled={details.length === 1}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {fieldError && (
              <div className="form-error-text mb-3">{fieldError}</div>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="outline-primary" onClick={addRow}>
                Add Room
              </Button>
              <Button type="submit" variant="primary">
                Submit Booking
              </Button>
            </div>
            {status.message && (
              <div
                className={`${status.type === "danger" ? "form-error-text" : "text-success"} mt-3`}
              >
                {status.message}
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateBooking;
