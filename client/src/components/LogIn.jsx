import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/landing.css";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  Alert,
  Toast,
} from "react-bootstrap";
import catGIF from "../assets/landing/cat.gif";
import mainLogo from "../assets/landing/text.png";
import axiosInstance from "../api/axiosInstance";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [LoginModal, setLoginModal] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [UserExistsAlert, setUserExistsAlert] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [EnableSignInButton, setEnableSignInButton] = useState(false);
  const [EnableLogInButton, setEnableLogInButton] = useState(false);
  const [InvalidCredentialsAlert, setInvalidCredentialsAlert] = useState(false);

  const handleLogin = async (e) => {
    setEnableLogInButton(true);
    setInvalidCredentialsAlert(false);
    e.preventDefault();
    let credentials = {
      username: Username,
      password: Password,
    };
    const data = await login(credentials);
    if (data !== "FAILED") {
      navigate("/home");
    } else {
      setInvalidCredentialsAlert(true);
      setEnableLogInButton(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setUserExistsAlert(false);
    setEnableSignInButton(true);
    let credentials = {
      username: Username,
      password: Password,
    };
    const data = await axiosInstance.post("/user/create", credentials);
    if (data.status === "FAILED") {
      setUserExistsAlert(true);
      setEnableSignInButton(false);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="login-page-container">
      <Container className={LoginModal || SignUpModal ? "behind-modal" : ""}>
        <Row>
          <Col md={6} style={{ marginBottom: "4rem" }}>
            <Image fluid src={mainLogo} alt="" id="main-logo-landing" />
            <div>
              <span className="sign-up-span">
                <Button
                  className="main-button"
                  style={{ marginLeft: "1rem" }}
                  onClick={() => setLoginModal(true)}
                >
                  Log In
                </Button>
                or
                <span id="sign-up-link" onClick={() => setSignUpModal(true)}>
                  Sign Up
                </span>
              </span>
            </div>
          </Col>
          <Col md={6}>
            <Image fluid src={catGIF} alt="" id="cat-gif" />
          </Col>
        </Row>
      </Container>

      <Modal
        centered
        show={LoginModal}
        style={{ textAlign: "center" }}
        onHide={() => setLoginModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Welcome
          </h3>
          <Toast
            onClose={() => setInvalidCredentialsAlert(false)}
            show={InvalidCredentialsAlert}
            delay={10000}
            className="main-error-toast"
            autohide
          >
            <Toast.Header
              style={{
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <strong className="me-auto">Oops!</strong>
            </Toast.Header>
            <Toast.Body>Wrong username or password, try again.</Toast.Body>
          </Toast>
          <Container>
            <Form
              style={{ textAlign: "left" }}
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <Form.Group className="mb-3" controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
                <Form.Text className="text-muted">
                  Your password is always encrypted :)
                </Form.Text>
              </Form.Group>
              <Button
                className="main-button"
                type="submit"
                disabled={EnableLogInButton}
              >
                Log In
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={SignUpModal}
        onHide={() => setSignUpModal(false)}
        style={{ textAlign: "center" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Create your account
          </h3>
          <Container>
            <Form
              style={{ textAlign: "left" }}
              onSubmit={(e) => {
                handleSignUp(e);
              }}
            >
              <Form.Group className="mb-3" controlId="signUpUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signUpPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signUpConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Alert
                show={UserExistsAlert}
                onClose={() => setUserExistsAlert(false)}
                variant="danger"
                dismissible
              >
                <Alert.Heading>User already exists!</Alert.Heading>
                <p>Try with a different username</p>
              </Alert>
              <Alert
                show={Success}
                onClose={() => setSuccess(false)}
                variant="success"
                dismissible
              >
                <Alert.Heading>User created!</Alert.Heading>
                <p>Use your new username and password to login.</p>
              </Alert>
              <Button
                className="main-button"
                type="submit"
                disabled={EnableSignInButton}
              >
                Sign Up
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
