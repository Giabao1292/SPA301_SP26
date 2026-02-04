import { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { fetchPublicNews } from "../api/newsService";
import AppToast from "../components/AppToast";
import { useToast } from "../hooks/useToast";
import "../styles/public.css";

const PublicNewsPage = () => {
  const [items, setItems] = useState([]);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPublicNews();
        setItems(data);
      } catch (err) {
        showToast(err.message, "danger");
      }
    };
    load();
  }, []);

  return (
    <div className="public-wrapper">
      <header className="public-hero">
        <Badge bg="light" text="dark">
          FU News Hub
        </Badge>
        <h1>Latest News & Announcements</h1>
        <p>Stay informed with the newest updates from our community.</p>
      </header>
      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.id} md={6} lg={4}>
            <Card className="news-card">
              <Card.Body>
                <Badge bg="primary">{item.categoryName}</Badge>
                <h5>{item.newsTitle}</h5>
                <p>{item.headline}</p>
                <div className="news-meta">
                  <span>{item.createdByName}</span>
                  <span>{new Date(item.createdDate).toLocaleDateString()}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <AppToast toast={toast} onClose={hideToast} />
    </div>
  );
};

export default PublicNewsPage;
