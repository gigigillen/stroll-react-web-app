import { useState, useEffect } from "react";
import './styles.css';
import * as client from "./client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export default function UserProfile() {
    const { uid } = useParams();

    const [profile, setProfile] = useState<any>({});

    const fetchProfile = async () => {
        if (!uid) return;
        const account = await client.findProfileById(uid);
        setProfile(account);
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
                    <h3>{`${profile.firstName} ${profile.lastName}`}</h3>
                    <h4>{profile.username}</h4>
                    <h4>{profile.email}</h4>
                    <h4>{profile.city}</h4>
                </div>
                <div className="col-2">
                </div>
            </div>
            <hr />

            {/* DATA */}
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
                    {/* Ensure favoriteLocations is defined */}
                    {profile.favoriteLocations && profile.favoriteLocations.length > 0 ? (
                        profile.favoriteLocations.map((location: any, index: number) => (
                            <Link to={`/Stroll/Search/${location.id}`} >
                                <div key={index} className="row mb-3 d-flex justify-content-center align-items-center">
                                    <span className="data-container p-0">
                                        <img className="profile-picture" src={location.picture} alt={location.name} />
                                    </span>
                                    <h3>{location.name}</h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>None yet!</p>
                    )}
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}