import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import {
  getUserByOther,
  registerInstructor,
  registerUser,
} from "../../services/usersService";
import userImage from "../../../images/user.png";
import { UserDetailContext } from "../../contexts/UserDetailContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import AdminNavBar from "../../Components/AdminNavBar";
import Role from "../../../../server/models/RoleEnum";
import Alert from "../../Components/Alert";

const InstructorRegister = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      if (success || error) {
        const timer = setTimeout(() => {
          setSuccess("");
          setError("");
        }, 1500);

        // Xóa timeout
        return () => clearTimeout(timer);
      }
    }, 0);
  }, [success, error]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: Role.INSTRUCTOR,
  });
  //Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerInstructor(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.role
      );
      setSuccess("Register successfully");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Row className="ms-(-6) me-0">
      <Col md={3}>
        <AdminNavBar />
      </Col>
      <Col md={8}>
        <Container>
          <h1 className="mt-3"> Register Instructor</h1>
          <Container
            className="d-flex justify-content-center align-items-center mt-5"
            style={{ height: "" }}
          >
            <section
              className="card shadow-lg p-5 mb-5 bg-body-tertiary rounded-4 d-flex justify-content-center align-items-center"
              style={{ width: "500px" }}
            >
              <h3 className="title fw-medium mb-5"> Register</h3>
              <form onSubmit={handleRegister}>
                <div className="mb-5 row">
                  <input
                    type="input"
                    placeholder="Your Name"
                    className="input p-1"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    autoFocus
                  />
                </div>
                <div className="mb-5 row">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input p-1"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    autoFocus
                  />
                </div>
                <div className="mb-5 row ">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input p-1"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    autoFocus
                  />
                </div>

                <div className="mb-5 row ">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input p-1"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    autoFocus
                  />
                </div>

                <button className="btn btn-success mb-4 ms-5"> Register</button>
                <br />

                <a
                  href="#"
                  className="fs-6 fw-lighter"
                  style={{ textDecoration: "none" }}
                ></a>
              </form>
              {success && <Alert msg={success} type="success" />}
              {error && <Alert msg={error} type="error" />}
            </section>
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default InstructorRegister;
