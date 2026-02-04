import { Button } from "react-bootstrap";

const SectionHeader = ({ title, subtitle, actionLabel, onAction }) => {
  return (
    <div className="section-header">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
