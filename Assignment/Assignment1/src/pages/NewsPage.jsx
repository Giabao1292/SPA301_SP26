import { useEffect, useState } from "react";
import { Badge, Button, Card, Form, Table } from "react-bootstrap";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";
import AppToast from "../components/AppToast";
import { useToast } from "../hooks/useToast";
import {
  createNews,
  deleteNews,
  fetchNews,
  fetchNewsHistory,
  updateNews,
} from "../api/newsService";
import { fetchCategories } from "../api/categoryService";
import { fetchTags } from "../api/tagService";
import { useAuth } from "../hooks/AuthContext";

const initialForm = {
  newsTitle: "",
  headline: "",
  newsContent: "",
  newsSource: "",
  categoryId: "",
  newsStatus: true,
  tagIds: [],
};

const NewsPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [confirm, setConfirm] = useState({ show: false, id: null });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { toast, showToast, hideToast } = useToast();

  const loadData = async (search) => {
    setLoading(true);
    try {
      const data = await fetchNews(search);
      setItems(data);
    } catch (err) {
      showToast(err.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  const loadMetadata = async () => {
    try {
      const [categoryData, tagData] = await Promise.all([
        fetchCategories(),
        fetchTags(),
      ]);
      setCategories(categoryData);
      setTags(tagData);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  useEffect(() => {
    loadData();
    loadMetadata();
  }, []);

  const handleOpen = (item = null) => {
    setEditing(item);
    setForm(
      item
        ? {
            newsTitle: item.newsTitle,
            headline: item.headline ?? "",
            newsContent: item.newsContent ?? "",
            newsSource: item.newsSource ?? "",
            categoryId: item.categoryId,
            newsStatus: item.newsStatus,
            tagIds: item.tags?.map((tag) => tag.id) ?? [],
          }
        : initialForm,
    );
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      categoryId: Number(form.categoryId),
      createdById: user?.id,
      updatedById: editing ? user?.id : null,
    };

    try {
      if (editing) {
        await updateNews(editing.id, payload);
        showToast("News updated");
      } else {
        await createNews(payload);
        showToast("News created");
      }
      setShowModal(false);
      loadData(keyword);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNews(confirm.id);
      showToast("News deleted");
      setConfirm({ show: false, id: null });
      loadData(keyword);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const handleHistory = async () => {
    try {
      const data = await fetchNewsHistory(user?.id);
      setItems(data);
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const toggleTag = (tagId) => {
    setForm((prev) => {
      const exists = prev.tagIds.includes(tagId);
      return {
        ...prev,
        tagIds: exists
          ? prev.tagIds.filter((id) => id !== tagId)
          : [...prev.tagIds, tagId],
      };
    });
  };

  return (
    <div>
      <SectionHeader
        title="News Articles"
        subtitle="Publish, edit, and manage news content."
        actionLabel="Create News"
        onAction={() => handleOpen()}
      />
      <Card className="mb-4">
        <Card.Body className="d-flex flex-wrap gap-3 align-items-center">
          <Form.Control
            placeholder="Search news"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <Button onClick={() => loadData(keyword)} disabled={loading}>
            Search
          </Button>
          <Button variant="outline-secondary" onClick={handleHistory}>
            My History
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          {items.length === 0 ? (
            <EmptyState
              title="No news articles yet"
              subtitle="Create your first news article to share updates."
            />
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="fw-semibold">{item.newsTitle}</div>
                      <small className="text-muted">{item.headline}</small>
                    </td>
                    <td>
                      <Badge bg={item.newsStatus ? "success" : "secondary"}>
                        {item.newsStatus ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td>{item.categoryName}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {item.tags?.map((tag) => (
                          <Badge key={tag.id} bg="light" text="dark">
                            {tag.tagName}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td>{item.createdByName}</td>
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
        title="Delete news"
        message="Are you sure you want to delete this news article?"
        onCancel={() => setConfirm({ show: false, id: null })}
        onConfirm={handleDelete}
      />

      <AppToast toast={toast} onClose={hideToast} />

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal custom-modal-lg">
            <h4>{editing ? "Edit News Article" : "Create News Article"}</h4>
            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={form.newsTitle}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      newsTitle: event.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  value={form.headline}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      headline: event.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={form.newsContent}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      newsContent: event.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Source</Form.Label>
                <Form.Control
                  value={form.newsSource}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      newsSource: event.target.value,
                    }))
                  }
                />
              </Form.Group>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={form.categoryId}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          categoryId: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={form.newsStatus ? "true" : "false"}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          newsStatus: event.target.value === "true",
                        }))
                      }
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-4">
                <Form.Label>Tags</Form.Label>
                <div className="tag-grid">
                  {tags.map((tag) => (
                    <Button
                      key={tag.id}
                      size="sm"
                      variant={
                        form.tagIds.includes(tag.id)
                          ? "primary"
                          : "outline-secondary"
                      }
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.tagName}
                    </Button>
                  ))}
                </div>
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

export default NewsPage;
