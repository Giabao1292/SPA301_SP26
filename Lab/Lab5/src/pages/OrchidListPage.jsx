import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import * as api from "../api/orchidApi";
import OrchidModal from "../components/orchid/OrchidModal";
import DeleteConfirmModal from "../components/orchid/DeleteConfirmModal";

export default function OrchidListPage() {
  const [orchids, setOrchids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    const res = await api.getAll();
    setOrchids(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setSelected(null);
    setShowModal(true);
  };

  const handleEdit = (o) => {
    setSelected(o);
    setShowModal(true);
  };

  const handleDelete = (o) => {
    setSelected(o);
    setShowDelete(true);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🌸 Orchid Gallery</h2>
        <Button onClick={handleCreate}>+ New Orchid</Button>
      </div>

      <Row className="g-4">
        {orchids.map((o) => (
          <Col key={o.id} md={6} lg={4} xl={3}>
            <Card className="h-100 shadow-sm border-0 orchid-card">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={
                    o.orchidUrl ||
                    "https://images.unsplash.com/photo-1611078489935-0cb964de46c5"
                  }
                  style={{ height: 220, objectFit: "cover" }}
                />

                <div className="position-absolute top-0 end-0 p-2">
                  {o.isNatural && (
                    <Badge bg="success" className="me-1">
                      Natural
                    </Badge>
                  )}
                  {o.isAttractive && <Badge bg="warning">Hot</Badge>}
                </div>
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{o.name}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {o.orchidDescription?.slice(0, 80)}...
                </Card.Text>

                <div className="d-flex justify-content-between">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleEdit(o)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(o)}
                  >
                    🗑 Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CREATE + EDIT */}
      <OrchidModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={selected ? "Edit Orchid" : "Create Orchid"}
        data={selected}
        onSubmit={async (data) => {
          if (selected) await api.update(selected.id, data);
          else await api.create(data);

          setShowModal(false);
          loadData();
        }}
      />

      {/* DELETE */}
      <DeleteConfirmModal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onConfirm={async () => {
          await api.remove(selected.id);
          setShowDelete(false);
          loadData();
        }}
      />
    </Container>
  );
}
