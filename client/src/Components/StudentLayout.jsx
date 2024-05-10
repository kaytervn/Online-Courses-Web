import { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import { getCart } from "../services/cartsService";

const StudentLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0); 

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

          const count = data.courseDetails.length;
          setItemCount(count);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Nav.Item>
        <Nav.Link href="/list-course">List Course</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button className="btn-light" href="/cart">
          <i className="fa fa-shopping-cart me-1" aria-hidden="true"></i>
          Cart
          <span className="badge bg-danger ms-1">{itemCount}</span>{" "}
          {/* Hiển thị số lượng item */}
        </Button>
      </Nav.Item>
    </>
  );
};

export default StudentLayout;
