import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OrchidForm from "../components/orchid/OrchidForm.jsx";

export default function OrchidEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/orchids/${id}`)
      .then((res) => {
        setOrchid(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!orchid) return <p className="text-danger text-center">Not found</p>;

  return (
    <OrchidForm
      initialData={orchid}
      onSubmit={async (data) => {
        await axios.put(`http://localhost:8080/orchids/${id}`, data);
        navigate("/");
      }}
    />
  );
}
