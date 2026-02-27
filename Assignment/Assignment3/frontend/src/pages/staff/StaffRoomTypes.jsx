import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import api from "../../api/client";
import SharedConfirmModal from "../../components/SharedConfirmModal";

const emptyForm = { name: "", description: "", note: "" };

const StaffRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const loadRoomTypes = () => {
    api
      .get("/room-types")
      .then((res) => setRoomTypes(res.data || []))
      .catch(() => setRoomTypes([]));
  };

  useEffect(() => {
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

  const openEdit = (roomType) => {
    setEditingId(roomType.id);
    setForm({
      name: roomType.name || "",
      description: roomType.description || "",
      note: roomType.note || "",
    });
    setFieldErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    const nextFieldErrors = {};
    if (!form.name.trim()) {
      nextFieldErrors.name = "Vui lòng nhập tên loại phòng.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    const payload = { ...form };
    try {
      if (editingId) {
        await api.put(`/room-types/${editingId}`, payload);
      } else {
        await api.post("/room-types", payload);
      }
      setShowModal(false);
      loadRoomTypes();
      setStatus({ type: "success", message: "Room type saved." });
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        submit: "Không thể lưu loại phòng. Vui lòng kiểm tra lại thông tin.",
      }));
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/room-types/${deleteId}`);
      loadRoomTypes();
      setStatus({ type: "success", message: "Room type deleted." });
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
            <Card.Title>Room Types</Card.Title>
            <Button onClick={openCreate}>Add Room Type</Button>
          </div>
          {status.message && (
            <div className={`text-${status.type} mb-3`}>{status.message}</div>
          )}
          <div className="table-responsive">
            <Table striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Note</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {roomTypes.map((type) => (
                  <tr key={type.id}>
                    <td>{type.id}</td>
                    <td>{type.name}</td>
                    <td>{type.description || "-"}</td>
                    <td>{type.note || "-"}</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEdit(type)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setDeleteId(type.id)}
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
            {editingId ? "Edit Room Type" : "Create Room Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.name)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control
                name="note"
                value={form.note}
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
        show={Boolean(deleteId)}
        title="Delete room type"
        message="This room type will be removed and cannot be restored. Continue?"
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default StaffRoomTypes;
