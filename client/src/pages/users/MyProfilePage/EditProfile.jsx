import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Container, Row, Card, Form } from 'react-bootstrap'; // Thêm Form từ react-bootstrap
import './MyProfilePage.css';
import { UserContext } from "../../../contexts/UserContext";
import userImage from "../../../../images/user.png";
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../../services/usersService';


const EditProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: user.name || '',
        picture: user.picture || '',
        email: user.email || '',
        phone: user.phone || '',
    });

    useEffect(() => {
        setUserData({
            name: user.name || '',
            picture: user.picture || '',
            email: user.email || '',
            phone: user.phone || '',
        });
    }, [user]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error('Error:', error);
        };

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(userData, selectedImage);
            setUser({
                token: localStorage.getItem('token'),
                email: userData.email,
                name: userData.name,
                picture: selectedImage,
                phone: userData.phone,
            })
            navigate('/my-profile')
        }
        catch (error) {
            console.log("Error saving:", error);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col lg="6" className="mb-4 mb-lg-0">
                        <Card className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <Row className="g-0" style={{ height: "450px" }}>
                                <Col md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <Card.Img
                                        className="rounded-circle my-5"
                                        src={selectedImage || (user.picture === null || user.picture === "" ? userImage : user.picture)}
                                        alt="Avatar"
                                        style={{ width: '80px' }}
                                    />

                                    <Card.Title as="h5">{user.name}</Card.Title>
                                    <Card.Text as="h6">{user.role}</Card.Text>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="upload-image"
                                        onChange={(e) => handleImageChange(e)}
                                    />
                                    <label htmlFor="upload-image">
                                        <Button className='mt-5' variant="outline-light" size="sm" as="span">
                                            Upload
                                        </Button>
                                    </label>
                                </Col>
                                <Col md="8">
                                    <Card.Body className="p-4">
                                        <Card.Title as="h4">Information</Card.Title>
                                        <hr className="mt-0 mb-4" />
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={userData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={userData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Form>

                                        <div className="d-flex justify-content-start mt-5">
                                            <a href="#!" className="me-3"><i className="fab fa-facebook fa-lg"></i></a>
                                            <a href="#!" className="me-3"><i className="fab fa-twitter fa-lg"></i></a>
                                            <a href="#!" className="me-3"><i className="fab fa-instagram fa-lg"></i></a>
                                        </div>

                                        <Row className='d-flex justify-content-center text-align'>
                                            <Button variant="outline-primary" size="sm" className="col-3 mt-1" onClick={handleSave}>
                                                Save
                                            </Button>
                                        </Row>
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

export default EditProfile;
