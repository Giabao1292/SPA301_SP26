import { Card, Col, Row } from "react-bootstrap";
import SectionHeader from "../components/SectionHeader";

const DashboardPage = () => {
  return (
    <div>
      <SectionHeader
        title="Dashboard"
        subtitle="Overview of your news management activity."
      />
      <Row className="g-4">
        {[
          { title: "Total Articles", value: "128" },
          { title: "Active Categories", value: "14" },
          { title: "Staff Accounts", value: "6" },
        ].map((card) => (
          <Col key={card.title} md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h6>{card.title}</h6>
                <h2>{card.value}</h2>
                <span className="text-muted">Updated just now</span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardPage;
