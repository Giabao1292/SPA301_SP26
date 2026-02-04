import { Modal } from "react-bootstrap";
import OrchidForm from "./OrchidForm";

export default function OrchidModal({ show, onHide, title, data, onSubmit }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <OrchidForm initialData={data} onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
}
