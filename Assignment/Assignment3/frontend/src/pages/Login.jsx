import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const Login = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const nextFieldErrors = {};

    if (!email.trim()) {
      nextFieldErrors.email = "Vui lòng nhập email.";
    } else if (!emailRegex.test(email.trim())) {
      nextFieldErrors.email = "Email không đúng định dạng.";
    }
    if (!password) {
      nextFieldErrors.password = "Vui lòng nhập mật khẩu.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    try {
      const { data } = await api.post("/auth/login", { email, password });
      onAuth(data);
      navigate("/");
    } catch (err) {
      setError(
        "Đăng nhập không thành công. Vui lòng kiểm tra email hoặc mật khẩu.",
      );
      if (import.meta?.env?.DEV) {
        console.error("Login error response:", err?.response || err);
      }
    }
  };

  return (
    <Container className="page-section">
      <Card className="card-shadow border-0 form-card">
        <Card.Body>
          <div className="text-center mb-3">
            <Card.Title className="mb-0">Welcome back</Card.Title>
            <div className="text-muted small">
              Sign in to manage your bookings
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
                }}
                isInvalid={Boolean(fieldErrors.email)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }}
                isInvalid={Boolean(fieldErrors.password)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {error && <div className="form-error-text mb-3">{error}</div>}
            <Button type="submit" variant="primary" className="w-100">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
