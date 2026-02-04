import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import "../styles/topbar.css";

const Topbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div>
        <h2>Hello, {user?.accountName ?? "User"}</h2>
        <p>Manage all news operations from one place.</p>
      </div>
      <div className="topbar-actions">
        <div className="topbar-profile">
          <span className="badge">{user?.role === 1 ? "Admin" : "Staff"}</span>
          <span>{user?.email}</span>
        </div>
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
