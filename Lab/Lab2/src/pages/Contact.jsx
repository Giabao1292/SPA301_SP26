import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import CustomModal from "../components/CustomModal";
function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Validate
  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Khi nhập → clear lỗi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    alert("Contact information sent successfully!");
    setForm({ firstName: "", lastName: "", phone: "", email: "" });
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: 600 }}>
        <Card.Body>
          <h2 className="text-center mb-4">📞 Contact Us</h2>

          <Form onSubmit={handleSubmit}>
            {/* First Name */}
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label>SDT</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100">
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Confirm Modal */}

      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        type="confirm"
        title="Confirm Your Information"
        data={form}
      />
    </Container>
  );
}

export default Contact;
