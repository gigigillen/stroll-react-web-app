import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";
import { updateUser } from "../Account/client";

import "./styles.css";
import { useSelector } from "react-redux";
import ProtectedContent from "../ProtectedContent";
import { current } from "@reduxjs/toolkit";

export default function LocationDetails() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { lid } = useParams();
  const [location, setLocation] = useState<any>({});
  const [review, setReview] = useState<any>({});
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(currentUser);

  const fetchLocation = async () => {
    if (!lid) return;
    const location = await client.findLocationById(lid);
    setLocation(location);
  };

  const updateFavorites = async () => {
    // Initialize user.favoriteLocations as an array if undefined
    const updatedUser = {
      ...user,
      favoriteLocations: [...(user.favoriteLocations || []), { name: location.name, picture: location.photo, id: location._id }]
    };
    await updateUser(updatedUser);
    navigate(`/Stroll/Account/Profile`);
  };
  


  const addReview = async () => {
    const updatedLocation = {
      ...location,
      reviews: [...location.reviews, review] // Correctly append the new review to the reviews array
    };

    // Update the state first
    setLocation(updatedLocation);

    // Then call the API to update the backend
    await client.updateLocation(updatedLocation);
    fetchLocation(); // Refresh the data
  };

  useEffect(() => {
    if (lid) fetchLocation();
  }, [lid]);

  if (!lid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25" style={{ zIndex: "1050" }}>
      <Link to={`/Stroll/Search`} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </Link>
      <div>
        <br />
        <h2>{location.name}</h2>
        <img src={location.photo} className="image-container-review mb-3" alt="Location" />
        <p>{location.description}</p>

        <ProtectedContent >
          <div className="btn btn-success mb-3" onClick={updateFavorites}>
            Add to favorites
          </div>
        </ProtectedContent>

        <h2>Reviews</h2>
        <ul className="mb-3">
          {location.reviews && location.reviews.map((review: any, index: number) => (
            <ol key={index}>
              <Link to={`/Stroll/Account/Profile/${review.id}`} className="text-decoration-none text-reset">{review.user}: {review.reviewText}</Link>
            </ol>
          ))}
        </ul>
        <ProtectedContent >
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Leave a comment</label>
            <input
              type="text"
              className="form-control"
              id="comment"
              placeholder="Comment"
              onChange={(e) => setReview({ user: currentUser.username, reviewText: e.target.value, id: currentUser._id })}
            />
          </div>
          <div className="btn btn-primary" onClick={addReview}>
            Leave a review
          </div>
        </ProtectedContent>
      </div>
    </div>
  );
}
