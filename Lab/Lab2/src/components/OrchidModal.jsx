import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function OrchidModal({ show, onClose, orchid }) {
  if (!orchid) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{orchid.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <img
          src={orchid.image}
          alt={orchid.name}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <p>{orchid.description}</p>
        <strong>Price: ${orchid.price}</strong>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrchidModal;
