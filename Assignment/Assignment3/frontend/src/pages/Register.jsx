import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const Register = ({ onAuth }) => {
  const [form, setForm] = useState({
    fullName: "",
    telephone: "",
    email: "",
    birthday: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextFieldErrors = {};

    if (!form.fullName.trim()) {
      nextFieldErrors.fullName = "Vui lòng nhập họ và tên.";
    }
    if (!form.email.trim()) {
      nextFieldErrors.email = "Vui lòng nhập email.";
    } else if (!emailRegex.test(form.email.trim())) {
      nextFieldErrors.email = "Email không đúng định dạng.";
    }
    if (!form.password) {
      nextFieldErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (form.password.length < 6) {
      nextFieldErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (form.telephone && !/^[0-9+\-\s]{8,15}$/.test(form.telephone)) {
      nextFieldErrors.telephone = "Số điện thoại không đúng định dạng.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    try {
      const payload = {
        ...form,
        birthday: form.birthday || null,
      };
      const { data } = await api.post("/auth/register", payload);
      onAuth(data);
      navigate("/");
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.";

      setFieldErrors((prev) => ({
        ...prev,
        email: "Email đã tồn tại hoặc không hợp lệ.",
        submit: backendMessage,
      }));
    }
  };

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0 form-card">
        <Card.Body>
          <div className="text-center mb-3">
            <Card.Title className="mb-0">Create your account</Card.Title>
            <div className="text-muted small">Join to book rooms faster</div>
          </div>
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
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.telephone)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.telephone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                isInvalid={Boolean(fieldErrors.password)}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {fieldErrors.submit && (
              <div className="form-error-text mb-3">{fieldErrors.submit}</div>
            )}
            <Button type="submit" variant="primary" className="w-100">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
