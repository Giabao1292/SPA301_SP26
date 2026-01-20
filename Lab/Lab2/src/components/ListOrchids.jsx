import { useState, useMemo } from "react";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";
import CustomModal from "./CustomModal";

export default function ListOrchids({ orchids, searchKeyword }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const categories = useMemo(() => {
    return [...new Set(orchids.map((o) => o.category))];
  }, [orchids]);

  const filteredOrchids = useMemo(() => {
    let result = [...orchids];

    // 🔍 SEARCH (từ Header)
    if (searchKeyword) {
      result = result.filter((o) =>
        o.orchidName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // 🏷 FILTER
    if (selectedCategory) {
      result = result.filter((o) => o.category === selectedCategory);
    }

    // 🔃 SORT
    switch (sortType) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.orchidName.localeCompare(b.orchidName));
        break;
      case "name-desc":
        result.sort((a, b) => b.orchidName.localeCompare(a.orchidName));
        break;
      default:
        break;
    }

    return result;
  }, [orchids, searchKeyword, selectedCategory, sortType]);

  return (
    <>
      <FilterSort
        categories={categories}
        onFilterChange={setSelectedCategory}
        onSortChange={setSortType}
      />

      <div className="orchid-grid">
        {filteredOrchids.map((orchid) => (
          <Orchid key={orchid.id} orchid={orchid} />
        ))}
      </div>

      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        type="orchid"
        title={selectedOrchid?.name}
        data={selectedOrchid}
      />
    </>
  );
}
