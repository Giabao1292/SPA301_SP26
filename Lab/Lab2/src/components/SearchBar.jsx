import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearchClick = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(keyword);
    }
  };

  return (
    <Form className="d-flex">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter orchid name..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="outline-light" onClick={handleSearchClick}>
          🔍 Search
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
