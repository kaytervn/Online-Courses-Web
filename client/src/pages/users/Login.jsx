import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "../../Components/Alert";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CDBBtn, CDBIcon } from "cdbreact";
import { getUser, loginUser } from "../../services/usersService";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Container from "react-bootstrap/esm/Container";

const Login = () => {
  const { setUser } = useContext(UserContext);

  //error State
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      
      const token = data.token;

      const user = await getUser(token);
      setUser({
        token,
        email:user.email,
        name: user.name,
        picture: user.picture,
        role: user.role,
      });
      
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };




  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleFacebookLogin = async () => {
    try {
      window.open(`http://localhost:5000/auth/facebook`, "_self");
    } catch (err) {
      console.error("Error logging in with Facebook:", err);
    }
  };

  const handleGithubLogin = async () => {
    try {
      window.open(`http://localhost:5000/auth/github`, "_self");
    } catch (err) {
      console.error("Error logging in with Github:", err);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <section className="card shadow-lg p-5 bg-body-tertiary rounded-4" style={{ width: '400px' }}>
        <h3 className="title fw-medium mb-5 d-flex justify-content-center"> Log in</h3>
        <form onSubmit={handleLogin} >
          <div className="mb-5 row">
            <input
              type="email"
              placeholder="Email"
              className="input p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-5 row ">
            <input
              type="password"
              placeholder="Password"
              className="input p-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-success mb-4 d-flex justify-content-center" style={{ marginLeft: '38%' }}> Login</button>

          <div className="other-login">
            <p className="text-center"> or sign up with</p>
            <div className="flex-row mb-3 d-flex justify-content-center">
              <CDBBtn
                color="white"
                className="m-0"
                style={{ boxShadow: "none" }}
                onClick={handleFacebookLogin}
              >
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn
                color="white"
                className="m-0"
                style={{ boxShadow: "none" }}
                onClick={handleGithubLogin}
              >
                <CDBIcon fab icon="github" />
              </CDBBtn>
              <CDBBtn
                color="white"
                className="m-0"
                style={{ boxShadow: "none" }}
                onClick={handleGoogleLogin}
              >
                <CDBIcon fab icon="google-plus-g" />
              </CDBBtn>
            </div>
          </div>
          <Link to="/forgot-password" className="fs-6 fst-italic fw-lighter d-flex justify-content-center" style={{ textDecoration: 'none' }}>
            Forgot password
          </Link>
        </form>

        {error && <Alert msg={error} type="error" />}
      </section>
    </Container>

  );
};

export default Login;
