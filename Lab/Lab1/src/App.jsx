import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Orchid from "./components/Orchid";
import "./App.css";
import listOfOrchids from "./components/ListOfOrchids";
import OrchidDetail from "./components/OrchidDetail";

const orchid = {
  id: "1",
  orchidName: "Ceasar 4N",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et.",
  category: "Dendrobium",
  isSpecial: true,
  price: 1200000, // 👈 thêm price (VND)
  image: "images/4n.jpg",
};
function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleViewDetail = (orchid) => {
    setSelectedOrchid(orchid);
    setShowModal(true);
  };

  return (
    <>
      <div
        style={{ minHeight: `100vh`, display: `flex`, flexDirection: `column` }}
      >
        <Header />

        <div style={{ padding: "24px" }}>
          <h1>🌸 Orchid Store</h1>

          <div className="orchid-grid">
            {listOfOrchids.map((orchid) => (
              <Orchid orchid={orchid} onViewDetail={handleViewDetail} />
            ))}
            <OrchidDetail
              show={showModal}
              orchid={selectedOrchid}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>

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
