import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "../../Components/Alert";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import React from "react";
import { CDBBtn, CDBIcon } from "cdbreact";
import { checkOTPUser } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const OTPAuthentication = () => {
    const navigate = useNavigate();

    //error State
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const [success, setSuccess] = useState(null);
    const [otp, setOTP] = useState("");

    const handleOTPAuthentication = async (e) => {
        e.preventDefault();
        try {
            await checkOTPUser(user.email, otp);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <section
                className="card shadow-lg p-5 mb-5 bg-body-tertiary rounded-4"
                style={{ maxWidth: "400px" }}
            >
                <h3 className="title fw-medium mb-5 text-center"> OTP Authentication</h3>
                <form
                    onSubmit={handleOTPAuthentication}
                    className="d-flex flex-column align-items-center"
                >
                    <div className="mb-5">
                        <input
                            type="input"
                            placeholder="OTP code"
                            className="input p-1"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <button type="submit" className="btn btn-info mb-4">
                        Send
                    </button>
                </form>

                {error && <Alert msg={error} type="error" />}
                {success && <Alert msg={success} type="success" />}
            </section>
        </Container>
    );
};

export default OTPAuthentication;
