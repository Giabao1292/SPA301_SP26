
import ListOrchids from "../components/ListOrchids";
import listOfOrchids from "../data/ListOfOrchids";

function Home({ searchKeyword }) {
  return (
    <>

      <h1>🌸 Orchid Store</h1>
      <h3>Chào mừng bạn đến với cửa hàng hoa lan của chúng tôi!</h3>
      <ListOrchids orchids={listOfOrchids} searchKeyword={searchKeyword} />
    </>
  );
}

export default Home;
