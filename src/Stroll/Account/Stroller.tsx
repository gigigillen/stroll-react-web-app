import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import React, { useState } from "react";
import * as client from "./client";

export default function StrollerRegister() {
    const [user, setUser] = useState<any>({});

    const navigate = useNavigate();

    const signup = async () => {
        setUser({ ...user, userType: "STROLLER" })
        await client.signup(user);
        navigate("/Stroll/Account/Profile");
    };

    return (
        <div>
            <div className="account-contaner">
                {/* FIRST NAME */}
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="firstName" className="form-control"
                        id="firstName" placeholder="first name"
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                </div>

                {/* LAST NAME */}
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="lastName" className="form-control"
                        id="lastName" placeholder="last name"
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control"
                        id="email" placeholder="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>

                {/* USERNAME */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control"
                        id="username" placeholder="username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>


                {/* PASSWORD */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"
                        id="password" placeholder="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>

                {/* CITY */}
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Select your city</label>
                    <select className="form-select">
                        <option selected>Boston</option>
                    </select>
                </div>

                <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={signup}>
                    sign up
                </button>

            </div>
        </div>
    );

}