import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import { loginReducer } from "../data/login/loginAction";
import {
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../data/login/loginAction";

export default function LoginPage() {
  const loginInitialState = {
    email: "",
    password: "",
    loading: false,
    error: "",
  };
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);
  const { email, password, loading, error } = state;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: LOGIN_START });

    setTimeout(() => {
      if (email === "admin" && password === "123456") {
        dispatch({ type: LOGIN_SUCCESS });
        navigate("/");
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: "Email hoặc mật khẩu không đúng",
        });
      }
    }, 1000);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow-lg rounded-4">
            <Card.Body className="p-4">
              <h3 className="text-center mb-2">Đăng nhập</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) =>
                      dispatch({
                        type: SET_EMAIL,
                        payload: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) =>
                      dispatch({
                        type: SET_PASSWORD,
                        payload: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Button type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
