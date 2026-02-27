import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import api from "../../api/client";
import SharedConfirmModal from "../../components/SharedConfirmModal";

const emptyForm = {
  bookingId: "",
  roomId: "",
  startDate: "",
  endDate: "",
  actualPrice: "",
};

const StaffBookingDetails = () => {
  const [details, setDetails] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingKey, setEditingKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const loadDetails = () => {
    api
      .get("/booking-details")
      .then((res) => setDetails(res.data || []))
      .catch(() => setDetails([]));
  };

  const loadBookings = () => {
    api
      .get("/bookings")
      .then((res) => setBookings(res.data || []))
      .catch(() => setBookings([]));
  };

  const loadRooms = () => {
    api
      .get("/rooms")
      .then((res) => setRooms(res.data || []))
      .catch(() => setRooms([]));
  };

  useEffect(() => {
    loadDetails();
    loadBookings();
    loadRooms();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
  };

  const openCreate = () => {
    setEditingKey(null);
    setForm(emptyForm);
    setFieldErrors({});
    setShowModal(true);
  };

  const openEdit = (detail) => {
    const bookingId =
      detail.bookingReservation?.id || detail.id?.bookingReservationId;
    const roomId = detail.room?.id || detail.id?.roomId;
    setEditingKey({ bookingId, roomId });
    setForm({
      bookingId: bookingId || "",
      roomId: roomId || "",
      startDate: detail.startDate || "",
      endDate: detail.endDate || "",
      actualPrice: detail.actualPrice ?? "",
    });
    setFieldErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    const nextFieldErrors = {};

    if (!form.bookingId) {
      nextFieldErrors.bookingId = "Vui lòng chọn booking.";
    }
    if (!form.roomId) {
      nextFieldErrors.roomId = "Vui lòng chọn phòng.";
    }
    if (!form.startDate) {
      nextFieldErrors.startDate = "Vui lòng chọn ngày bắt đầu.";
    }
    if (!form.endDate) {
      nextFieldErrors.endDate = "Vui lòng chọn ngày kết thúc.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    const payload = {
      bookingReservation: form.bookingId
        ? { id: Number(form.bookingId) }
        : null,
      room: form.roomId ? { id: Number(form.roomId) } : null,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      actualPrice: form.actualPrice ? Number(form.actualPrice) : null,
    };
    try {
      if (editingKey) {
        await api.put(
          `/booking-details/${editingKey.bookingId}/${editingKey.roomId}`,
          payload,
        );
      } else {
        await api.post("/booking-details", payload);
      }
      setShowModal(false);
      loadDetails();
      setStatus({ type: "success", message: "Booking detail saved." });
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        submit:
          "Không thể lưu chi tiết booking. Vui lòng kiểm tra lại thông tin.",
      }));
    }
  };

  const openDelete = (detail) => {
    const bookingId =
      detail.bookingReservation?.id || detail.id?.bookingReservationId;
    const roomId = detail.room?.id || detail.id?.roomId;
    if (!bookingId || !roomId) return;
    setDeleteTarget({ bookingId, roomId });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(
        `/booking-details/${deleteTarget.bookingId}/${deleteTarget.roomId}`,
      );
      loadDetails();
      setStatus({ type: "success", message: "Booking detail deleted." });
    } catch (error) {
      setStatus({ type: "danger", message: "Delete failed." });
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Booking Details</Card.Title>
            <Button onClick={openCreate}>Add Detail</Button>
          </div>
          {status.message && (
            <div className={`text-${status.type} mb-3`}>{status.message}</div>
          )}
          <div className="table-responsive">
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Room</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actual Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {details.map((detail, index) => (
                  <tr
                    key={`${detail.bookingReservation?.id || detail.id?.bookingReservationId}-${detail.room?.id || detail.id?.roomId}-${index}`}
                  >
                    <td>
                      {detail.bookingReservation?.id ||
                        detail.id?.bookingReservationId}
                    </td>
                    <td>
                      {detail.room?.roomNumber ||
                        detail.room?.id ||
                        detail.id?.roomId}
                    </td>
                    <td>{detail.startDate || "-"}</td>
                    <td>{detail.endDate || "-"}</td>
                    <td>{detail.actualPrice ?? "-"}</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEdit(detail)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => openDelete(detail)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingKey ? "Edit Detail" : "Create Detail"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Booking</Form.Label>
              <Form.Select
                name="bookingId"
                value={form.bookingId}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.bookingId)}
              >
                <option value="">Select booking</option>
                {bookings.map((booking) => (
                  <option key={booking.id} value={booking.id}>
                    #{booking.id} - {booking.customer?.fullName || "Unknown"}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {fieldErrors.bookingId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Select
                name="roomId"
                value={form.roomId}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.roomId)}
              >
                <option value="">Select room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.roomNumber}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {fieldErrors.roomId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.startDate)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.startDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.endDate)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.endDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Actual Price</Form.Label>
              <Form.Control
                type="number"
                name="actualPrice"
                value={form.actualPrice}
                onChange={handleChange}
              />
            </Form.Group>
            {fieldErrors.submit && (
              <div className="form-error-text mb-3">{fieldErrors.submit}</div>
            )}
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <SharedConfirmModal
        show={Boolean(deleteTarget)}
        title="Delete booking detail"
        message="This booking detail record will be removed permanently. Continue?"
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default StaffBookingDetails;
