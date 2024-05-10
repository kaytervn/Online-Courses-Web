import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CartItem = ({ cartItem }) => {
  const courseDetails = cartItem;

  return (
    <Col xs={12}>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={3}>
              <Card.Img
                src={courseDetails.course.picture}
                alt={courseDetails.course.title}
                style={{ maxWidth: "200px", maxHeight: "150px" }}
              />
            </Col>
            <Col xs={9}>
              <Row>
                <Col>
                  <Card.Title>{courseDetails.course.title}</Card.Title>
                </Col>
                <Col className="text-right">
                  <Card.Text>Price: ${courseDetails.course.price}</Card.Text>
                </Col>
              </Row>
              <Card.Text>{courseDetails.course.description}</Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="primary">Remove from Cart</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartItem;
