import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from '../../Components/Alert';
import { useState } from 'react';
import React from 'react';
import { resetPasswordUser } from '../../services/usersService';
import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    const { id, token } = useParams()
    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (!password || !confirmPassword) {
                throw new Error("Please fill all the fields!");
            }
            else if (password !== confirmPassword) {
                throw new Error("Passwords do not match!");
            } else {
                await resetPasswordUser(id, token, password)
                navigate('/login')
            }


        }
        catch (err) {
            setError(err.message)
        }
    };

    return (
        <section className='card shadow-lg p-5 mb-5 bg-body-tertiary rounded-4'>
            <h3 className='title fw-medium mb-5'> Reset Password</h3>
            <form onSubmit={handleResetPassword}>
                <div className="mb-5 row">
                    <input
                        type="password"
                        placeholder="Password"
                        className="input p-1"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="mb-5 row">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input p-1"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className='btn btn-info mb-4'>Reset Password</button>
            </form>

            {error && <Alert msg={error} type="error" />}
        </section>
    );
}

export default ResetPassword;
