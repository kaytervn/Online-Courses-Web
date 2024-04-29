import { Link, Outlet } from "react-router-dom"
import Button from 'react-bootstrap/Button';
// import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="m-5">
                            <Link to="/login">
                                <Button variant="success">Login</Button>
                            </Link>

                        </div>

                    </div>
                    <div className="col-6">
                        <div className="m-5">
                            <Link to="/register">
                                <Button variant="info">Register</Button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            <main>
                <Outlet />
            </main>
        </>
    )

}

export default Layout