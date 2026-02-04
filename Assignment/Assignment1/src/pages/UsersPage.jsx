import { useEffect, useState } from "react";
import { Badge, Button, Card, Form, Table } from "react-bootstrap";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import AppToast from "../components/AppToast";
import { useToast } from "../hooks/useToast";
import {
  createAccount,
  deleteAccount,
  fetchAccounts,
  updateAccount,
} from "../api/accountService";
import { ROLES } from "../utils/constants";

const initialForm = {
  accountName: "",
  email: "",
  password: "",
  role: ROLES.STAFF,
};

const UsersPage = () => {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [confirm, setConfirm] = useState({ show: false, id: null });
  const { toast, showToast, hideToast } = useToast();

  const loadData = async (search) => {
    setLoading(true);
    try {
      const data = await fetchAccounts(search);
      setItems(data);
    } catch (err) {
      showToast(err.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = (item = null) => {
    setEditing(item);
    setForm(
      item
        ? {
            accountName: item.accountName,
            email: item.email,
            password: "",
            role: item.role,
          }
        : initialForm,
    );
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateAccount(editing.id, {
          accountName: form.accountName,
          email: form.email,
          password: form.password || "123456",
          role: Number(form.role),
        });
        showToast("Account updated");
      } else {
        await createAccount({
          ...form,
          role: Number(form.role),
        });
        showToast("Account created");
      }
      setShowModal(false);
      loadData(keyword);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount(confirm.id);
      showToast("Account deleted");
      setConfirm({ show: false, id: null });
      loadData(keyword);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  return (
    <div>
      <SectionHeader
        title="Users"
        subtitle="Manage staff and admin accounts."
        actionLabel="New Account"
        onAction={() => handleOpen()}
      />
      <Card className="mb-4">
        <Card.Body className="d-flex gap-3 align-items-center">
          <Form.Control
            placeholder="Search by name or email"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <Button onClick={() => loadData(keyword)} disabled={loading}>
            Search
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          {items.length === 0 ? (
            <EmptyState
              title="No accounts yet"
              subtitle="Create staff accounts to manage news."
            />
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.accountName}</td>
                    <td>{item.email}</td>
                    <td>
                      <Badge
                        bg={item.role === ROLES.ADMIN ? "primary" : "secondary"}
                      >
                        {item.role === ROLES.ADMIN ? "Admin" : "Staff"}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => handleOpen(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => setConfirm({ show: true, id: item.id })}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <ConfirmDialog
        show={confirm.show}
        title="Delete account"
        message="Are you sure you want to delete this account?"
        onCancel={() => setConfirm({ show: false, id: null })}
        onConfirm={handleDelete}
      />

      <AppToast toast={toast} onClose={hideToast} />

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h4>{editing ? "Edit Account" : "Create Account"}</h4>
            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={form.accountName}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      accountName: event.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  placeholder={editing ? "Leave blank to keep" : "Set password"}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                >
                  <option value={ROLES.ADMIN}>Admin</option>
                  <option value={ROLES.STAFF}>Staff</option>
                </Form.Select>
              </Form.Group>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
