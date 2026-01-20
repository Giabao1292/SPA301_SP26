import { Modal, Button, ListGroup } from "react-bootstrap";

function CustomModal({
  show,
  onClose,
  onConfirm,
  type = "default",
  data = null,
  title = "",
  children,
}) {
  const renderBody = () => {
    switch (type) {
      case "orchid":
        if (!data) return null;
        return (
          <>
            <img
              src={data.image}
              alt={data.name}
              style={{ width: "100%", marginBottom: 10 }}
            />
            <p>{data.description}</p>
            <strong>Price: ${data.price}</strong>
          </>
        );
      case "confirm":
        if (!data) return null;
        return (
          <ListGroup variant="flush">
            {Object.entries(data).map(([key, value]) => (
              <ListGroup.Item key={key}>
                <strong>{key}:</strong> {value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        );
      default:
        return children;
    }
  };

  const renderFooter = () => {
    switch (type) {
      case "orchid":
        return (
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        );
      case "confirm":
        return (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm Send
            </Button>
          </>
        );
      default:
        return (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        );
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderBody()}</Modal.Body>
      <Modal.Footer>{renderFooter()}</Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
