import { useSelector } from 'react-redux';
import './styles.css';
import { Link } from 'react-router-dom';

export default function StrollNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div>
            <div className="row nav-bar">
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <h1>STROLL</h1>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    <Link key="/Stroll/Home" to="/Stroll/Home" className="text-decoration-none text-reset">
                        <h6>home</h6>
                    </Link>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    <Link key="/Stroll/Search" to="/Stroll/Search" className="text-decoration-none text-reset">
                        <h6>search</h6>
                    </Link>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    <Link
                        key="/Stroll/Leaderboard"
                        to={ (currentUser && currentUser.userType !== "BUSINESS") ? "/Stroll/Leaderboard" : "/Stroll/Search" }
                        className="text-decoration-none text-reset">
                        <h6>leaderboard</h6>
                    </Link>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    {/* Conditionally render the profile link */}
                    <Link
                        key="/Stroll/Profile"
                        to={currentUser ? "/Stroll/Account/Profile" : "/Stroll/Account/Signin"}
                        className="text-decoration-none text-reset"
                    >
                        <h6>profile</h6>
                    </Link>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}
