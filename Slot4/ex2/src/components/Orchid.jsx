import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Orchid({ orchid }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    // Điều hướng sang trang detail và truyền id qua URL
    navigate(`/orchid/${orchid.id}`);
  };

  return (
    <div className="orchid-card">
      <div className="img-wrapper">
        <img src={orchid.image} alt={orchid.orchidName} />
      </div>

      <h3>{orchid.orchidName}</h3>

      <p className="price">{orchid.price.toLocaleString("vi-VN")} ₫</p>

      <p className="category">{orchid.category}</p>

      {orchid.isSpecial && <span className="badge">Special</span>}

      <Button onClick={handleViewDetail}>Xem chi tiết</Button>
    </div>
  );
}
