import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import OrchidDetail from "./components/OrchidDetail";

import listOfOrchids from "./data/ListOfOrchids";
import "./App.css";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Routes>
      <Route element={<Layout onSearch={setSearchKeyword} />}>
        <Route path="/" element={<Home searchKeyword={searchKeyword} />} />

        <Route
          path="/orchid/:id"
          element={<OrchidDetail orchids={listOfOrchids} />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
