import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import api from "../../api/client";
import SharedConfirmModal from "../../components/SharedConfirmModal";

const emptyForm = {
  roomNumber: "",
  detailDescription: "",
  maxCapacity: "",
  status: 1,
  pricePerDay: "",
  roomTypeId: "",
};

const StaffRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const loadRooms = () => {
    api
      .get("/rooms")
      .then((res) => setRooms(res.data || []))
      .catch(() => setRooms([]));
  };

  const loadRoomTypes = () => {
    api
      .get("/room-types")
      .then((res) => setRoomTypes(res.data || []))
      .catch(() => setRoomTypes([]));
  };

  useEffect(() => {
    loadRooms();
    loadRoomTypes();
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

  const openEdit = (room) => {
    setEditingId(room.id);
    setForm({
      roomNumber: room.roomNumber || "",
      detailDescription: room.detailDescription || "",
      maxCapacity: room.maxCapacity ?? "",
      status: room.status ?? 1,
      pricePerDay: room.pricePerDay ?? "",
      roomTypeId: room.roomType?.id || "",
    });
    setFieldErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    const nextFieldErrors = {};
    if (!form.roomNumber.trim()) {
      nextFieldErrors.roomNumber = "Vui lòng nhập số phòng.";
    }
    if (!form.roomTypeId) {
      nextFieldErrors.roomTypeId = "Vui lòng chọn loại phòng.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    const payload = {
      roomNumber: form.roomNumber,
      detailDescription: form.detailDescription || null,
      maxCapacity: form.maxCapacity ? Number(form.maxCapacity) : null,
      status: Number(form.status) || 1,
      pricePerDay: form.pricePerDay ? Number(form.pricePerDay) : null,
      roomType: form.roomTypeId ? { id: Number(form.roomTypeId) } : null,
    };
    try {
      if (editingId) {
        await api.put(`/rooms/${editingId}`, payload);
      } else {
        await api.post("/rooms", payload);
      }
      setShowModal(false);
      loadRooms();
      setStatus({ type: "success", message: "Room saved successfully." });
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        submit: "Không thể lưu phòng. Vui lòng kiểm tra lại thông tin.",
      }));
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/rooms/${deleteId}`);
      loadRooms();
      setStatus({ type: "success", message: "Room deleted successfully." });
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
            <Card.Title>Room Management</Card.Title>
            <Button onClick={openCreate}>Add Room</Button>
          </div>
          {status.message && (
            <div className={`text-${status.type} mb-3`}>{status.message}</div>
          )}
          <div className="table-responsive">
            <Table striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType?.name || "-"}</td>
                    <td>{room.maxCapacity ?? "-"}</td>
                    <td>{room.status}</td>
                    <td>{room.pricePerDay ?? "-"}</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEdit(room)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setDeleteId(room.id)}
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Room" : "Create Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                name="roomNumber"
                value={form.roomNumber}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.roomNumber)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.roomNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Select
                name="roomTypeId"
                value={form.roomTypeId}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.roomTypeId)}
              >
                <option value="">Select type</option>
                {roomTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {fieldErrors.roomTypeId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Detail Description</Form.Label>
              <Form.Control
                name="detailDescription"
                value={form.detailDescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max Capacity</Form.Label>
              <Form.Control
                type="number"
                name="maxCapacity"
                value={form.maxCapacity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price Per Day</Form.Label>
              <Form.Control
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
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
                <option value={1}>Available</option>
                <option value={0}>Unavailable</option>
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
        title="Delete room"
        message="This room will be permanently removed. Do you want to continue?"
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default StaffRooms;
