import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import api from "../api/client";

const Profile = () => {
  const [form, setForm] = useState({
    fullName: "",
    telephone: "",
    birthday: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    api
      .get("/customers/me")
      .then((res) => {
        const data = res.data || {};
        setForm({
          fullName: data.fullName || "",
          telephone: data.telephone || "",
          birthday: data.birthday || "",
        });
      })
      .catch(() => {
        setStatus({ type: "danger", message: "Unable to load profile." });
      });
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    try {
      const payload = {
        fullName: form.fullName,
        telephone: form.telephone || null,
        birthday: form.birthday || null,
      };
      await api.put("/customers/me", payload);
      setStatus({ type: "success", message: "Profile updated successfully." });
    } catch (error) {
      setStatus({ type: "danger", message: "Update failed. Please try again." });
    }
  };

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0 form-card">
        <Card.Body>
          <Card.Title className="text-center mb-3">My Profile</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
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
            {status.message && (
              <div className={`text-${status.type} mb-3`}>
                {status.message}
              </div>
            )}
            <Button type="submit" variant="primary" className="w-100">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;