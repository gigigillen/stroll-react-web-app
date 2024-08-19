import { BsSearch } from "react-icons/bs";

export default function SearchBar({ filterLocationsByName }: { filterLocationsByName: (name: any) => void; }) {
    return (
        <div className="col-2 d-flex justify-content-center align-items-center mb-3">
            <span className="input-group-append">
                <button className="btn border-end-0 border rounded-0">
                    <BsSearch />
                </button>
            </span>
            <input
                className="py-1 border-start-0 border"
                style={{ height: '38px', width: '200px' }}
                placeholder="Search..."
                onChange={(e) => filterLocationsByName(e.target.value)} />
        </div>
    )
}