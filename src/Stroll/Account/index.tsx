import { Navigate, Route, Routes } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import UserProfile from "./User";

export default function Account() {
    return (
        <div>
            <div className="">
                <Routes>
                    <Route path="/" element={<Navigate to="Signin" />} />
                    <Route path="/Signin" element={<Signin />}/>
                    <Route path="/Register" element={<Signup />}/>
                    <Route path="/Profile/*" element={<Profile />}/>
                    <Route path="/Profile/:uid" element={<UserProfile />}/>
                </Routes>
            </div>
        </div>
    )
}