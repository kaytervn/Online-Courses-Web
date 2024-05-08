import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "../../Components/Alert";
import { useState } from "react";
import React from "react";
import { CDBBtn, CDBIcon } from "cdbreact";
import { checkEmailUser } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const ForgotPassword = () => {
  const navigate = useNavigate();

  //error State
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);
  // Form data state
  const [email, setEmail] = useState("");

  //Handle login
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await checkEmailUser(email);

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <section className="card shadow-lg p-5 mb-5 bg-body-tertiary rounded-4" style={{ maxWidth: '400px' }}>
        <h3 className="title fw-medium mb-5 text-center"> Forgot Password</h3>
        <form onSubmit={handleForgotPassword} className="d-flex flex-column align-items-center">
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email"
              className="input p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-info mb-4">Send</button>
        </form>

        {error && <Alert msg={error} type="error" />}
        {success && <Alert msg={success} type="success" />}
      </section>
    </Container>

  );
};

export default ForgotPassword;
