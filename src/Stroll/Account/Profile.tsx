import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);

    //editing properties
    const [name, setName] = useState("");

    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    const dispatch = useDispatch();
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Stroll/Account/Signin");
    };

    const saveProfile = async () => {
        const updatedProfile = { ...profile, firstName: name };
        await client.updateUser(updatedProfile);  // No need to send the userId
        setProfile(updatedProfile);
        setEditing(false);
        fetchProfile();  // Refresh the profile data
    };

    const removeFavorite = async (locationId: string) => {
        const updatedFavoriteLocations = profile.favoriteLocations.filter(
            (location: any) => location.id !== locationId
        );

        const updatedProfile = {
            ...profile,
            favoriteLocations: updatedFavoriteLocations
        };

        // Update user profile in the backend
        await client.updateUser(updatedProfile);

        // Update the local state
        setProfile(updatedProfile);
    };



    useEffect(() => { fetchProfile(); }, []);


    return (
        <div>
            <div className="row mt-3">
                <div className="col-2">
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <span className="data-container">
                        <img className="profile-picture"
                            src="/profile-pic.webp"
                        />
                    </span>
                </div>
                <div className="col-4">
                    {/* if not in editing, display first name */}
                    {
                        !editing && (
                            <h3>{`Welcome, ${profile.firstName}`}</h3>

                        )
                    }
                    {/* editing mode */}
                    {
                        profile && editing && (
                            <input
                                className="form-control"
                                defaultValue={profile.firstName}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") { saveProfile() }
                                }}>
                            </input>
                        )
                    }
                    <h4>{profile.username}</h4>
                    <h4>{profile.email}</h4>
                    <h4>{profile.city}</h4>
                    <span className="">
                        {!editing && (
                            <h5 className="edit-button btn me-3"
                                onClick={() => {
                                    setEditing(true);
                                }
                                }>edit</h5>
                        )}
                        {editing && (
                            <h5 className="btn me-3 btn-success"
                                onClick={() => {
                                    saveProfile();
                                    setEditing(false);
                                }}>save</h5>
                        )}
                        <h5 className="sign-out-button btn text-danger" onClick={signout}>sign out</h5>
                    </span>
                </div>
                <div className="col-2">
                </div>
            </div>
            <hr />

            {/* DATA */}
            {profile.userType === "STROLLER" && (
                <div>
                    <div className="row mt-5">
                        <div className="col-12 col-sm-4 mb-3 d-flex justify-content-center align-items-center">
                            <span className="data-container d-flex flex-column align-items-center">
                                <h3>{profile.streak} days</h3>
                                <h4>STREAK</h4>
                            </span>
                        </div>
                        <div className="col-12 col-sm-4 mb-3 d-flex justify-content-center align-items-center">
                            <span className="data-container d-flex flex-column align-items-center">
                                <h3>{profile.completed} strolls</h3>
                                <h4>COMPLETED</h4>
                            </span>
                        </div>
                        <div className="col-12 col-sm-4 mb-3 d-flex justify-content-center align-items-center">
                            <span className="data-container d-flex flex-column align-items-center">
                                <h3>{profile.totalMiles} miles</h3>
                                <h4>TOTAL MILES</h4>
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-5">
                        <div className="col text-center ">
                            <h3 className="mb-3">
                                TOP LOCATIONS
                            </h3>
                            {profile.favoriteLocations && profile.favoriteLocations.length > 0 ? (
                                profile.favoriteLocations.map((location: any, index: number) => (
                                    <div>
                                        <div className="edit-button btn mb-3" onClick={() => removeFavorite(location.id)}>remove {location.name}</div>
                                        <Link to={`/Stroll/Search/${location.id}`} >
                                            <div key={location._id} className="row mb-3 d-flex justify-content-center align-items-center">
                                                <span className="data-container p-0">
                                                    <img className="profile-picture" src={location.picture} alt={location.name} />
                                                </span>
                                                <h3>{location.name}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>None yet!</p>
                            )}
                            <div className="btn btn-primary">
                                <Link to="/Stroll/Search" className="text-decoration-none text-reset">
                                    Add a location
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {profile.userType === "BUSINESS" && (
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        request your location to be featured on stroll
                    </div>
                </div>
            )}
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}