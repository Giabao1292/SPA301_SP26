import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import "../styles/login.css";

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const emailError = touched.email && !form.email.trim();
  const passwordError = touched.password && !form.password.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setTouched({ email: true, password: true });
    if (!form.email.trim() || !form.password.trim()) {
      return;
    }
    setLoading(true);
    try {
      await signIn(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <Row className="login-card">
        <Col lg={6} className="login-hero">
          <div>
            <span className="pill">FU News Management</span>
            <h1>Welcome back!</h1>
            <p>
              Sign in to manage categories, news articles, and staff profiles in
              one elegant dashboard.
            </p>
            <div className="hero-metric">
              <div>
                <h3>120+</h3>
                <span>Articles managed</span>
              </div>
              <div>
                <h3>24/7</h3>
                <span>Visibility</span>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={6} className="login-form">
          <Card>
            <Card.Body>
              <div className="logo">NMS</div>
              <h2>Sign in</h2>
              <p className="text-muted">
                Use your staff credentials to continue.
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="staff@funews.edu"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={emailError}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Email không được để trống.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={passwordError}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Password không được để trống.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Form>
              <div className="login-footer">
                <span>Need to see public news?</span>
                <Button variant="link" onClick={() => navigate("/public-news")}>
                  View Public News
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
