import { Toast, ToastContainer } from "react-bootstrap";

const AppToast = ({ toast, onClose }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        bg={toast.variant}
        show={toast.show}
        onClose={onClose}
        delay={2500}
        autohide
      >
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AppToast;
