import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import "../styles/layout.css";

const AppLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Topbar />
        <Container fluid className="page-container">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default AppLayout;
