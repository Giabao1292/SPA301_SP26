import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import api from "../../api/client";
import SharedConfirmModal from "../../components/SharedConfirmModal";

const emptyForm = {
  bookingDate: "",
  totalPrice: "",
  status: 1,
  customerId: "",
};

const StaffBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const loadBookings = () => {
    api
      .get("/bookings")
      .then((res) => setBookings(res.data || []))
      .catch(() => setBookings([]));
  };

  const loadCustomers = () => {
    api
      .get("/customers")
      .then((res) => setCustomers(res.data || []))
      .catch(() => setCustomers([]));
  };

  useEffect(() => {
    loadBookings();
    loadCustomers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFieldErrors({});
    setShowModal(true);
  };

  const openEdit = (booking) => {
    setEditingId(booking.id);
    setForm({
      bookingDate: booking.bookingDate ? booking.bookingDate.split("T")[0] : "",
      totalPrice: booking.totalPrice ?? "",
      status: booking.status ?? 1,
      customerId: booking.customer?.id || "",
    });
    setFieldErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    const nextFieldErrors = {};

    if (!form.customerId) {
      nextFieldErrors.customerId = "Vui lòng chọn khách hàng.";
    }
    if (!form.bookingDate) {
      nextFieldErrors.bookingDate = "Vui lòng chọn ngày đặt.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    const payload = {
      bookingDate: form.bookingDate ? `${form.bookingDate}T00:00:00` : null,
      totalPrice: form.totalPrice ? Number(form.totalPrice) : null,
      status: Number(form.status) || 1,
      customer: form.customerId ? { id: Number(form.customerId) } : null,
    };
    try {
      if (editingId) {
        await api.put(`/bookings/${editingId}`, payload);
      } else {
        await api.post("/bookings", payload);
      }
      setShowModal(false);
      loadBookings();
      setStatus({ type: "success", message: "Booking saved." });
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        submit: "Không thể lưu booking. Vui lòng kiểm tra lại thông tin.",
      }));
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/bookings/${deleteId}`);
      loadBookings();
      setStatus({ type: "success", message: "Booking deleted." });
    } catch (error) {
      setStatus({ type: "danger", message: "Delete failed." });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Booking Management</Card.Title>
            <Button onClick={openCreate}>Add Booking</Button>
          </div>
          {status.message && (
            <div className={`text-${status.type} mb-3`}>{status.message}</div>
          )}
          <div className="table-responsive">
            <Table striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer?.fullName || "-"}</td>
                    <td>{booking.bookingDate || "-"}</td>
                    <td>{booking.status}</td>
                    <td>{booking.totalPrice ?? "-"}</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEdit(booking)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setDeleteId(booking.id)}
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
            {editingId ? "Edit Booking" : "Create Booking"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Select
                name="customerId"
                value={form.customerId}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.customerId)}
              >
                <option value="">Select customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.fullName} ({customer.emailAddress})
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {fieldErrors.customerId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="bookingDate"
                value={form.bookingDate}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.bookingDate)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.bookingDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="number"
                name="totalPrice"
                value={form.totalPrice}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
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
        show={Boolean(deleteId)}
        title="Delete booking"
        message="This booking will be permanently deleted. Continue?"
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default StaffBookings;
