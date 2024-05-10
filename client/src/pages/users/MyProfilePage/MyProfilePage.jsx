import React, { useState, useContext } from 'react';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import './MyProfilePage.css';
import { UserContext } from "../../../contexts/UserContext";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import userImage from "../../../../images/user.png";

const MyProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState("");

    const convertToBase64 = (event) => {
        const file = event.target.files[0];
        // const imageUrl = URL.createObjectURL(file);
        // setImageUrl(imageUrl);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
            setImageUrl(reader.result);
        };
        reader.onerror = (error) => {
            console.error('Error:', error);
        };
    };

    const handleUpload = async () => {
        fetch(`http://localhost:3000/api/users/upload-image`, {
            method: "PATCH",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                base64: image,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
    };


    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col lg="6" className="mb-4 mb-lg-0">
                        <Card className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <Row className="g-0">
                                <Col md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <Card.Img
                                        className="rounded-circle my-5"
                                        src={imageUrl || (user.picture === null || user.picture === "" ? userImage : user.picture)}
                                        alt="Avatar"
                                        style={{ width: '80px' }}
                                    />

                                    <Card.Title as="h5">{user.name}</Card.Title>
                                    <Card.Text as="h6">{user.role}</Card.Text>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={convertToBase64}
                                        style={{ display: 'none' }}
                                        id="upload-image"
                                    />
                                    <label htmlFor="upload-image">
                                        <Button variant="outline-light" size="sm" as="span" onClick={handleUpload}>
                                            Upload
                                        </Button>
                                    </label>
                                    {/* <Button variant="outline-light" size="sm" onClick={handleSave}>Save </Button> */}
                                </Col>
                                <Col md="8">
                                    <Card.Body className="p-4">
                                        <Card.Title as="h6">Information</Card.Title>
                                        <hr className="mt-0 mb-4" />
                                        <Row className="pt-1">
                                            <Col size="6" className="mb-3">
                                                <Card.Title as="h6">Email</Card.Title>
                                                <Card.Text className="text-muted">{user.email}</Card.Text>
                                            </Col>
                                            <Col size="6" className="mb-3">
                                                <Card.Title as="h6">Phone</Card.Title>
                                                <Card.Text className="text-muted">123 456 789</Card.Text>
                                            </Col>
                                        </Row>

                                        <Card.Title as="h6">Information</Card.Title>
                                        <hr className="mt-0 mb-4" />
                                        <Row className="pt-1">
                                            <Col size="6" className="mb-3">
                                                <Card.Title as="h6">Email</Card.Title>
                                                <Card.Text className="text-muted">{user.email}</Card.Text>
                                            </Col>
                                            <Col size="6" className="mb-3">
                                                <Card.Title as="h6">Phone</Card.Title>
                                                <Card.Text className="text-muted">123 456 789</Card.Text>
                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-start">
                                            <a href="#!" className="me-3"><i className="fab fa-facebook fa-lg"></i></a>
                                            <a href="#!" className="me-3"><i className="fab fa-twitter fa-lg"></i></a>
                                            <a href="#!" className="me-3"><i className="fab fa-instagram fa-lg"></i></a>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MyProfilePage;
