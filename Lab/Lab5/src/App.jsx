import NavBar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container-fluid px-4 py-3 bg-light min-vh-100">
        <AppRoutes />
      </div>
    </>
  );
}
