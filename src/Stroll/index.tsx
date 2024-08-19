import { Navigate, Routes, Route } from "react-router";
import HomePage from "./Home";
import StrollNavigation from "./Navigation";
import Leaderboard from "./Leaderboard";
import Account from "./Account";
import Search from "./Search";
import store from "./store";
import { Provider } from "react-redux";
import Session from './Account/Session';
import ProtectedRoute from "./ProtectedRoute";

export default function Stroll() {
    return (
        <Provider store={store}>
            <Session>
                <div className="container-fluid">
                    <StrollNavigation />
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home/*" element={<HomePage />} />
                        <Route path="Leaderboard/*" element={<ProtectedRoute ><Leaderboard /></ProtectedRoute>} />
                        <Route path="Account/*" element={<Account />} />
                        <Route path="Search/*" element={<Search />} />
                        <Route path="Search/:lid" element={<Search />} />
                    </Routes>
                </div>
            </Session>
        </Provider>
    );
}