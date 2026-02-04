import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 text-center">
        <h2>404</h2>
        <p className="text-muted">
          The page you are looking for does not exist.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;
