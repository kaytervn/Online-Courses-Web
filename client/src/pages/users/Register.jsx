import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from '../../Components/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { registerUser } from '../../services/usersService';


const Register = () => {

    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //Handle Register
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData.name, formData.email, formData.password, formData.confirmPassword);
            navigate('/login')
        }
        catch (error) {
            setError(error.message);
        }
        // console.log(formData);
    };
    return (
        <section className='card shadow-lg p-5 mb-5 bg-body-tertiary rounded-4'>
            <h3 className='title fw-medium mb-5'> Register</h3>
            <form onSubmit={handleRegister}>
                <div className="mb-5 row">
                    <input
                        type="input"
                        placeholder="Your Name"
                        className="input p-1"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        autoFocus
                    />
                </div>
                <div className="mb-5 row">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input p-1"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        autoFocus
                    />
                </div>
                <div className='mb-5 row '>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input p-1"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        autoFocus
                    />
                </div>

                <div className='mb-5 row '>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input p-1"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                        autoFocus
                    />
                </div>

                <button className='btn btn-success mb-4'> Register</button><br />


                <a href="#" className='fs-6 fw-lighter'>Already have an account?</a>
            </form>

            {error && <Alert msg={error} type="error" />}
        </section>
    );
}

export default Register;