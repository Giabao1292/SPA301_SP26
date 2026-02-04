import { Card } from "react-bootstrap";
import SectionHeader from "../components/SectionHeader";

const SettingsPage = () => {
  return (
    <div>
      <SectionHeader
        title="Settings"
        subtitle="Configure system preferences and policies."
      />
      <Card>
        <Card.Body>
          <p className="text-muted">
            Settings area is reserved for future enhancements. You can extend
            this section with approval workflows, audit logs, or notification
            templates.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SettingsPage;
