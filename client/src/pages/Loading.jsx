import Container from "react-bootstrap/Container";
import loading from "../../images/loading.png";
import Image from "react-bootstrap/Image";

const Loading = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Image
        src={loading}
        className="img-fluid"
        style={{ maxWidth: "200px", maxHeight: "200px" }}
      />
    </Container>
  );
};

export default Loading;
