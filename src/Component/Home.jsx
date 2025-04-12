
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();

  const reg = () => navigate("/Reg");
  const login = () => navigate("/LoginForm");
  const admin = () => navigate("/AdminLogin");

  return (
    <div className="bg-light min-vh-100">
      {/* Dark Header */}
      <header className="bg-secondary text-white text-center py-4 mb-4">
        <h2>Secure Task Management System</h2>
      </header>

      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8}>
            <h3 className="text-black mb-3">Welcome to Task Management System</h3>
            <p className="text-dark fs-5">
              A task management system helps you organize, prioritize, and track your work.
              It keeps all your tasks in one place, making it easy to stay focused and productive.
            </p>

            <div className="mt-4">
              <Button variant="primary" size="lg" className="mx-2" onClick={reg}>
                Register
              </Button>
              <Button variant="success" size="lg" className="mx-2" onClick={login}>
                Login
              </Button>
              <Button variant="secondary" size="lg" className="mx-2" onClick={admin}>
                Admin Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
