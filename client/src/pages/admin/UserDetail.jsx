import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { getUserByOther } from "../../services/usersService";
import userImage from "../../../images/user.png";
import { UserDetailContext } from "../../contexts/UserDetailContext";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import AdminNavBar from "../../Components/AdminNavBar";

const UserDetail = () => {
  const { user, setUser } = useContext(UserDetailContext);
  const { state } = useLocation();
  const [userId] = useState({
    userId: state.userId,
  });
  console.log(userId.userId);
  useEffect(() => {
    setTimeout(async () => {
      const user = await getUserByOther(userId.userId);
      setUser(user);
    }, 0);
  }, []);

  return (
    <Row className="ms-(-6) me-0">
      <Col md={3}>
        <AdminNavBar />
      </Col>
      <Col md={8}>
        <Container>
          <h1 className="mt-3"> User Detail</h1>
          <section className="" style={{ backgroundColor: "#ffffff" }}>
            <Container className="py-5 h-100">
              <Row className="justify-content-center align-items-center h-100">
                <Col lg="6" className="mb-4 mb-lg-0">
                  <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
                    <Row className="g-0" style={{ height: "450px" }}>
                      <Col
                        md="4"
                        className="gradient-custom text-center text-white"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        <Card.Img
                          className="rounded-circle my-5"
                          src={
                            user.picture === null ||
                            (user.picture === "") | (user.picture === "false")
                              ? userImage
                              : user.picture
                          }
                          alt="Avatar"
                          style={{ width: "80px" }}
                        />

                        <Card.Title as="h5">{user.name}</Card.Title>
                        <Card.Text as="h6">{user.role}</Card.Text>
                      </Col>
                      <Col md="8">
                        <Card.Body className="p-4">
                          <Card.Title as="h4">Information</Card.Title>
                          <hr className="mt-0 mb-4" />
                          <Row className="pt-1">
                            <Col size="6" className="mb-3">
                              <Card.Title as="h6">Email</Card.Title>
                              <Card.Text className="text-muted">
                                {user.email}
                              </Card.Text>
                            </Col>
                            <Col size="6" className="mb-3">
                              <Card.Title as="h6">Description</Card.Title>
                              <Card.Text className="text-muted">
                                {user.description}
                              </Card.Text>
                            </Col>
                          </Row>

                          <Card.Title as="h5" style={{ marginTop: "10%" }}>
                            Contact via
                          </Card.Title>
                          <hr className="mt-0 mb-4" />
                          <Row className="pt-1">
                            <Col size="6" className="mb-3">
                              <Card.Title as="h6">Email</Card.Title>
                              <Card.Text className="text-muted">
                                {user.email}
                              </Card.Text>
                            </Col>
                            <Col size="6" className="mb-3">
                              <Card.Title as="h6">Phone</Card.Title>
                              <Card.Text className="text-muted">
                                {user.phone}
                              </Card.Text>
                            </Col>
                          </Row>

                          <div className="d-flex justify-content-start mt-5">
                            <a href="#!" className="me-3">
                              <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="#!" className="me-3">
                              <i className="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="#!" className="me-3">
                              <i className="fab fa-instagram fa-lg"></i>
                            </a>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </Container>
      </Col>
    </Row>
  );
};

export default UserDetail;
