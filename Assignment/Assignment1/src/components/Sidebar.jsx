import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../utils/constants";
import { useAuth } from "../hooks/AuthContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-mark">FU</div>
        <div>
          <h1>News Hub</h1>
          <p>Management Suite</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.filter((item) =>
          item.roles ? item.roles.includes(user?.role) : true,
        ).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>{user?.accountName}</p>
        <span>{user?.email}</span>
      </div>
    </aside>
  );
};

export default Sidebar;
