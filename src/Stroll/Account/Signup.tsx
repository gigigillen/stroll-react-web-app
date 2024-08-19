import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import React, { useState } from "react";
import * as client from "./client";

import StrollerRegister from './Stroller';
import BuisnessRegister from './Business';

export default function Signup() {

    const [user, setUser] = useState<any>({});
    const [accountType, setAccountType] = useState("");

    const navigate = useNavigate();

    const signup = async () => {
        await client.signup(user);
        navigate("/Stroll/Account/Profile");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="account-contaner">
                <h3>SIGN UP</h3>

                {/* TYPE OF USER */}
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Account type</label>
                    <select
                        className="form-select"
                        value={accountType}
                        onChange={(e) => {setAccountType(e.target.value)}}
                    >
                        <option value="STROLLER">Stroller</option>
                        <option value="BUISNESS">Business Owner</option>
                    </select>
                </div>

                {accountType === "STROLLER" ? (
                    <StrollerRegister />
                ) : (
                    <BuisnessRegister />
                )}

                <Link to="/Stroll/Account/Signin">sign in</Link>
            </div>
        </div>
    )
}