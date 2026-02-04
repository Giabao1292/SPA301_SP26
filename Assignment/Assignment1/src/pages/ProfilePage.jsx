import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import SectionHeader from "../components/SectionHeader";
import AppToast from "../components/AppToast";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/AuthContext";
import { updateProfile } from "../api/profileService";

const ProfilePage = () => {
  const { user, signIn } = useAuth();
  const [form, setForm] = useState({
    accountName: "",
    email: "",
    password: "",
    role: user?.role ?? 2,
  });
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (user) {
      setForm({
        accountName: user.accountName,
        email: user.email,
        password: "",
        role: user.role,
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updated = await updateProfile(user.id, {
        accountName: form.accountName,
        email: form.email,
        password: form.password || "123456",
        role: user.role,
      });
      await signIn({
        email: updated.email,
        password: form.password || "123456",
      });
      showToast("Profile updated");
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  return (
    <div>
      <SectionHeader title="Profile" subtitle="Manage your personal details." />
      <Card className="profile-card">
        <Card.Body>
          <Form>
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
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Leave blank to keep current"
              />
            </Form.Group>
            <Button onClick={handleSave}>Save changes</Button>
          </Form>
        </Card.Body>
      </Card>
      <AppToast toast={toast} onClose={hideToast} />
    </div>
  );
};

export default ProfilePage;
