import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListOrchids from "./components/ListOrchids";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Routes, Route } from "react-router-dom";
import listOfOrchids from "./data/ListOfOrchids";
import "./App.css";
import OrchidDetail from "./components/OrchidDetail";
function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <div className="app-wrapper">
        <Header onSearch={setSearchKeyword} />

        <main className="main-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>🌸 Orchid Store</h1>
                  <ListOrchids
                    orchids={listOfOrchids}
                    searchKeyword={searchKeyword}
                  />
                </>
              }
            />
            <Route
              path="/orchid/:id"
              element={<OrchidDetail orchids={listOfOrchids} />}
            />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer
          avatar="/images/whynot.jpg"
          name="Lê Bảo"
          email="lebao@gmail.com"
        />
      </div>
    </>
  );
}

export default App;
