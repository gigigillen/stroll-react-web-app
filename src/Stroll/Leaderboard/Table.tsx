import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";

export default function Table() {
    const [users, setUsers] = useState<any[]>([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>place</th>
                        <th>name</th>
                        <th>username</th>
                        <th>streak</th>
                    </tr>
                </thead>

                <tbody>
                    {users
                        .filter((user) => user.userType === "STROLLER")
                        .sort((a: any, b: any) => b.streak - a.streak)
                        .map((user: any, index: number) => (
                            <tr key={user._id}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">
                                    <Link to={`/Stroll/Account/Profile/${user._id}`} className="text-decoration-none text-reset">
                                        <span className="wd-first-name">{user.firstName} </span>
                                        <span className="wd-last-name">{user.lastName}</span>
                                    </Link>
                                </td>
                                <td className="align-middle">
                                    <img src="profile-pic.webp" width="40" height="40" className="me-2" />
                                    {user.username}
                                </td>
                                <td className="align-middle">
                                    {user.streak}
                                </td>
                            </tr>
                        ))}
                </tbody>

            </table>
        </div>
    )
}