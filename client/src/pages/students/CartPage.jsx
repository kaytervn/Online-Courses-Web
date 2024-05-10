import React, { useEffect, useState } from "react";
import { getCart } from "../../services/cartsService";
import CartItem from "../../Components/CartItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCart();
        if (data) {
          setCartItems(data.courseDetails);
          const total = data.courseDetails.reduce(
            (acc, item) => acc + item.course.price,
            0
          );
          setTotalPrice(total);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Cart Items</h2>
      <Row>
        <Col md={8}>
          {cartItems.map((cartItem) => (
            <Row key={cartItem._id} className="mb-4">
              <CartItem cartItem={cartItem} />
            </Row>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text>
                Total Price: <strong>${totalPrice.toFixed(2)}</strong>
              </Card.Text>
              <Button variant="primary" block>
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
