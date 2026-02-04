import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as categoryApi from "../../api/categoryApi";

export default function OrchidForm({ initialData, onSubmit }) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    orchidDescription: "",
    orchidUrl: "",
    isAttractive: false,
    isNatural: false,
    category: null,
  });

  useEffect(() => {
    categoryApi.getAll().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        category: initialData.category || null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleCategoryChange = (e) => {
    setForm({
      ...form,
      category: { id: Number(e.target.value) },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={form.category?.id || ""}
          onChange={handleCategoryChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="orchidDescription"
          value={form.orchidDescription || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          name="orchidUrl"
          value={form.orchidUrl || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="Attractive"
        name="isAttractive"
        checked={!!form.isAttractive}
        onChange={handleChange}
      />
      <Form.Check
        type="checkbox"
        label="Natural"
        name="isNatural"
        checked={!!form.isNatural}
        onChange={handleChange}
      />

      <div className="text-end mt-3">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
