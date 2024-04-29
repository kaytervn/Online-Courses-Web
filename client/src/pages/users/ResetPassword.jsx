import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from '../../Components/Alert';
import { useState } from 'react';
import React from 'react';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { resetPasswordUser } from '../../services/usersService';
import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    const { id, token } = useParams()
    const navigate = useNavigate()

    //error State
    const [error, setError] = useState(null)
    // Form data state
    const [password, setPassword] = useState('')

    // const {id, token} = useParams()


    //Handle login 
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPasswordUser(id, token, password)

            // Redirect to login page
            navigate('/login')
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

                <button className='btn btn-info mb-4'>Reset Password</button>
            </form>

            {error && <Alert msg={error} />}
        </section>
    );
}

export default ResetPassword;