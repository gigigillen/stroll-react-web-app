import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import * as client from "./client"
import { Link } from "react-router-dom";
import LocationDetails from "./Details";
import ProtectedRoute from "../ProtectedRoute";

export default function Search() {
    const [locations, setLocations] = useState<any[]>([]);
    const [name, setName] = useState("");

    const fetchLocations = async () => {
        const locations = await client.fetchAllLocations();
        setLocations(locations);
    }

    const filterLocationsByName = async (name: string) => {
        setName(name);
        if (name) {
            const locations = await client.findLocationsByPartialName(name);
            setLocations(locations);
        } else {
            fetchLocations();
        }
    };

    //on load
    useEffect(() => {
        fetchLocations();
    }, []);
    return (
        <div>
            <div><LocationDetails /></div>
            <h2>SERACH PREVIOUS LOCATIONS</h2>
            <div className="input-group mb-3">
                <span className="input-group-text"> <CiSearch /> </span>
                <input
                    type="text"
                    placeholder="Search for a location..."
                    className="form-control"
                    onChange={(e) => filterLocationsByName(e.target.value)} />
            </div>

            <div className="row row-cols-1 row-cols-md-5 g-4">
                {locations.map((location) => (
                    <div className="col" style={{ width: "300px"}}>
                        <Link to={`/Stroll/Search/${location._id}`} className="text-decoration-none" >
                            <div className="card overflow-hidden">
                                <img src={location.photo} style = {{ width: "100%", height: "160px", objectFit: "cover" }} />
                                <div className="card-body">
                                    <span className=""
                                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold", maxHeight: 20, overflow: "hidden" }} >
                                        {location.name}
                                    </span>
                                    <p className="card-text" style={{ maxHeight: 53, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                        {location.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>



    )
}