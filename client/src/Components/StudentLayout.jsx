//import Button from "react-bootstrap/Button";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";

const StudentLayout = () => {
  return (
    <>
      <Nav.Item>
        <Nav.Link href="/list-course">List Course</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button className="btn-light" href="/cart">
          <i className="fa fa-shopping-cart me-1" aria-hidden="true"></i>
          Cart
          <span className="badge bg-danger ms-1">0</span>
        </Button>
      </Nav.Item>
    </>
  );
};

export default StudentLayout;
