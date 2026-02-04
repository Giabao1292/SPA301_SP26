import { useEffect, useState } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import AppToast from "../components/AppToast";
import { useToast } from "../hooks/useToast";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../api/categoryService";
import { STATUS_OPTIONS } from "../utils/constants";

const initialForm = {
  categoryName: "",
  categoryDesc: "",
  parentCategoryId: "",
  status: true,
};

const CategoriesPage = () => {
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
      const data = await fetchCategories(search);
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
            categoryName: item.categoryName,
            categoryDesc: item.categoryDesc ?? "",
            parentCategoryId: item.parentCategoryId ?? "",
            status: item.status,
          }
        : initialForm,
    );
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateCategory(editing.id, {
          ...form,
          parentCategoryId: form.parentCategoryId || null,
        });
        showToast("Category updated");
      } else {
        await createCategory({
          ...form,
          parentCategoryId: form.parentCategoryId || null,
        });
        showToast("Category created");
      }
      setShowModal(false);
      loadData(keyword);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(confirm.id);
      showToast("Category deleted");
      setConfirm({ show: false, id: null });
      loadData(keyword);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  return (
    <div>
      <SectionHeader
        title="Categories"
        subtitle="Manage news categories across the system."
        actionLabel="New Category"
        onAction={() => handleOpen()}
      />
      <Card className="mb-4">
        <Card.Body className="d-flex gap-3 align-items-center">
          <Form.Control
            placeholder="Search category"
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
              title="No categories yet"
              subtitle="Create your first category to organize news articles."
            />
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Parent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.categoryName}</td>
                    <td>{item.categoryDesc || "-"}</td>
                    <td>{item.status ? "Active" : "Inactive"}</td>
                    <td>{item.parentCategoryId ?? "-"}</td>
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
        title="Delete category"
        message="Are you sure you want to delete this category?"
        onCancel={() => setConfirm({ show: false, id: null })}
        onConfirm={handleDelete}
      />

      <AppToast toast={toast} onClose={hideToast} />

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h4>{editing ? "Edit Category" : "Create Category"}</h4>
            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={form.categoryName}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      categoryName: event.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={form.categoryDesc}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      categoryDesc: event.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Parent Category ID</Form.Label>
                <Form.Control
                  value={form.parentCategoryId}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      parentCategoryId: event.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={form.status ? "true" : "false"}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      status: event.target.value === "true",
                    }))
                  }
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.label} value={option.value.toString()}>
                      {option.label}
                    </option>
                  ))}
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

export default CategoriesPage;
