import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ onSearch }) {
  return (
    <div className="app-wrapper">
      <Header onSearch={onSearch} />

      <main className="main-wrapper">
        <Outlet />
      </main>

      <Footer
        avatar="/images/whynot.jpg"
        name="Lê Bảo"
        email="lebao@gmail.com"
      />
    </div>
  );
}

export default Layout;
