import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { useState } from "react";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const signin = async () => {
        const currentUser = await client.signin(credentials);
        dispatch(setCurrentUser(currentUser));
        navigate("/Stroll/Account/Profile");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="account-contaner ">
                <h3>SIGN IN</h3>
                <span>
                    <input
                        className="form-control mb-2"
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        value={credentials.username}
                        placeholder="username"
                    />

                    <input
                        className="form-control mb-2"
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        value={credentials.password}
                        placeholder="password"
                        type="password"
                    />

                    <button className="btn btn-primary w-100 mb-2" onClick={signin}>sign in</button>
                    <Link to="/Stroll/Account/Register">Sign up</Link>
                </span>
            </div>
        </div>
    )
}