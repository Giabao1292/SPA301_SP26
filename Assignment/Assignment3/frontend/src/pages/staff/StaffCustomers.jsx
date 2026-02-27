import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import api from "../../api/client";
import SharedConfirmModal from "../../components/SharedConfirmModal";

const initialForm = {
  fullName: "",
  telephone: "",
  emailAddress: "",
  birthday: "",
  status: 1,
  password: "",
};

const StaffCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const loadCustomers = () => {
    api
      .get("/customers")
      .then((res) => setCustomers(res.data || []))
      .catch(() => setCustomers([]));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setFieldErrors({});
    setShowModal(true);
  };

  const openEdit = (customer) => {
    setEditingId(customer.id);
    setForm({
      fullName: customer.fullName || "",
      telephone: customer.telephone || "",
      emailAddress: customer.emailAddress || "",
      birthday: customer.birthday || "",
      status: customer.status ?? 1,
      password: "",
    });
    setFieldErrors({});
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    const nextFieldErrors = {};

    if (!form.fullName.trim()) {
      nextFieldErrors.fullName = "Vui lòng nhập họ và tên.";
    }
    if (!form.emailAddress.trim()) {
      nextFieldErrors.emailAddress = "Vui lòng nhập email.";
    } else if (!emailRegex.test(form.emailAddress.trim())) {
      nextFieldErrors.emailAddress = "Email không đúng định dạng.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    const payload = {
      fullName: form.fullName,
      telephone: form.telephone || null,
      emailAddress: form.emailAddress,
      birthday: form.birthday || null,
      status: Number(form.status) || 1,
      password: form.password || "changeme",
    };
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, payload);
      } else {
        await api.post("/customers", payload);
      }
      setShowModal(false);
      loadCustomers();
      setStatus({ type: "success", message: "Customer saved successfully." });
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        submit: "Không thể lưu khách hàng. Vui lòng kiểm tra lại thông tin.",
      }));
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/customers/${deleteId}`);
      loadCustomers();
      setStatus({ type: "success", message: "Customer deleted successfully." });
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
            <Card.Title>Customer Management</Card.Title>
            <Button onClick={openCreate}>Add Customer</Button>
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
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.fullName}</td>
                    <td>{customer.emailAddress}</td>
                    <td>{customer.telephone || "-"}</td>
                    <td>{customer.status}</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEdit(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setDeleteId(customer.id)}
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
            {editingId ? "Edit Customer" : "Create Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.fullName)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                value={form.emailAddress}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.emailAddress)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.emailAddress}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={form.birthday || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={
                  editingId ? "Leave blank to reset" : "Enter password"
                }
              />
              <Form.Text className="text-muted">
                Required by API. Use a new password to reset.
              </Form.Text>
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
        title="Delete customer"
        message="This customer account will be removed permanently. Continue?"
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default StaffCustomers;
