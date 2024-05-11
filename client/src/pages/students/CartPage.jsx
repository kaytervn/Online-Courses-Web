import React, { useContext, useEffect, useState } from "react";
import { getCart } from "../../services/cartsService";
import CartItem from "../../Components/CartItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { CartContext } from "../../contexts/CartContext";


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const { setItemCount } = useContext(CartContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCart();
      if (data) {
        setCartItems(data.courseDetails);
        updateTotalPrice(data.courseDetails);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.course.price, 0);
    setTotalPrice(total);
  };

  // Trong CartPage.jsx
  const handleRemoveItem = (courseId) => {
    const updatedItems = cartItems.filter(
      (item) => item.course._id !== courseId
    );
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems); // Cập nhật tổng giá trị dựa trên danh sách mới
    setShowToast(true); // Hiển thị toast
    setTimeout(() => setShowToast(false), 3000); // Ẩn toast sau 3 giây
    // Gọi setItemCount từ CartContext để cập nhật số lượng mặt hàng
    setItemCount(updatedItems.length);
  };

  return (
    <Container>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 5 }}
      >
        <Toast.Header>
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>Removed successfully!</Toast.Body>
      </Toast>
      <h2 className="my-4">Cart Items</h2>
      <Row>
        <Col md={8}>
          {cartItems.map((cartItem) => (
            <Row key={cartItem._id} className="mb-4">
              <CartItem cartItem={cartItem} onRemove={handleRemoveItem} />
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
