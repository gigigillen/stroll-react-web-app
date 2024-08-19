import './styles.css';
import { useSelector } from 'react-redux';
import * as client from "../Search/client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [location, setLocation] = useState<any>({});
    const [weather, setWeather] = useState<string>("");

    const today = new Date();
    const formatDate = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}.${day}.${year}`;
    };

    const fetchLocationForToday = async () => {
        const formattedDate = formatDate(today);
        // Fetch all locations
        const locations = await client.fetchAllLocations();
        // Find the location with today's date
        const todayLocation = locations.find((location: any) => location.date === formattedDate);
        setLocation(todayLocation);
    };

    const fetchWeather = async () => {
        const url = `http://api.weatherapi.com/v1/current.json?key=68ced3c609cc47f18b2232642241808&q=Boston&aqi=no`;
    
        try {
            const response = await axios.get(url);
            // Access the correct path for the weather description and temperature
            const weatherDescription = response.data.current.condition.text; // Current weather description
            const temp = response.data.current.temp_c; // Temperature in Celsius
            setWeather(`Today's weather is ${weatherDescription} with a temperature of ${temp}°C`);
        } catch (error) {
            console.error('Error fetching weather:', error);
            setWeather('Unable to fetch weather data');
        }
    };

    useEffect(() => {
        fetchLocationForToday();
        fetchWeather();
    }, []);


    return (
        <div className="">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8"><h3>Welcome, {currentUser && <>{currentUser.firstName}</>}</h3></div>
                <div className="col-2"></div>
            </div>
            {/* IMAGE */}
            <div className="row">
                <div className="col-2">
                </div>
                <div className="col-8">
                    <span className="image-container">
                        <img className="location-image" src={location.photo} />
                    </span>
                </div>
                <div className="col-2">
                </div>
            </div>

            <div className="row">
                {/* TODAY'S LOCATION CONTENT */}
                <div className="col-12 col-md-3 d-none d-md-block">
                </div>
                <div className="col-12 col-md-3 location-info">
                    <div className="row">
                        <h2 className="todays-location-text">
                            TODAY'S<br />
                            LOCATION
                        </h2>
                    </div>
                    <div className={`row todays-location-p ${!currentUser ? 'blurred-text' : ''}`}>
                        <h4 className="mt-2">
                            {location.name}
                        </h4>
                        <p className="">
                            {location.description}
                        </p>
                    </div>
                </div>

                {/* ABOUT STROLL */}
                <div className="col-12 col-md-3 mt-2">
                    <div className="row about-stroll">
                        <span className="text-white">
                            {/* today's date */}
                            <h1>{formatDate(today)}</h1>
                        </span>
                        <span className="col-1">
                            <h2 className="about-stroll-t">
                                ABOUT STROLL
                            </h2>
                        </span>
                        <span className="col-11">
                            <p>
                                <span className="highlighted-text">we're dedicated to</span> helping
                                you discover the hidden gems in
                                your city with our daily updates on exciting new locations.
                                Our mission is to inspire activity, support local small
                                businesses, and connect you with the
                                beautiful <a href="https://en.wikipedia.org/wiki/Third_place">third places</a> near
                                you! Whether you're exploring vibrant neighborhoods
                                or enjoying serene parks, we're here to enhance your city
                                experience and foster a deeper connection with your community.
                                Join us in making every day an adventure and contribute to the
                                well-being of both your city and its local businesses.
                            </p>
                        </span>
                        <span>
                            <p>{weather}</p>
                        </span>
                    </div>
                </div>
                <div className="col-12 col-md-3 d-none d-md-block">
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-3 d-none d-md-block">
                </div>
                <div className="col-12 col-md-3">
                    <h3>Reviews</h3>
                    <ul className="">
                        {location.reviews && location.reviews.map((review: any, index: number) => (
                            <ol key={index}>
                                {review.user}: {review.reviewText}
                            </ol>
                        ))}
                    </ul>
                </div>
                <div className="col-12 col-md-3 d-none d-md-block">
                </div>
                <div className="col-12 col-md-3 d-none d-md-block">
                </div>
            </div>
            <hr />
        </div>
    )
}