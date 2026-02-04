import { Routes, Route } from "react-router-dom";
import OrchidListPage from "../pages/OrchidListPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OrchidListPage />} />
    </Routes>
  );
}
