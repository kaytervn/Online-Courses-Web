import React, { useState, useContext } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './MyProfilePage.css';
import { UserContext } from "../../../contexts/UserContext";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const MyProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (files) => {
        const file = files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('URL_API_UPLOAD', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser({ ...user, picture: response.data.imageUrl });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage className="rounded-circle my-5" src={user.picture}
                                        alt="Avatar" style={{ width: '80px' }} fluid />
                                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                                    <MDBCardText tag="h6">{user.role}</MDBCardText>
                                    {/* <useDropzone onChange={handleFileChange} acceptedFiles={['image/*']} maxFileSize={10000000} />
                                    <button onClick={handleUpload}>Upload</button> */}
                                    <MDBIcon far icon="edit mb-5" onClick={handleUpload} />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default MyProfilePage;
