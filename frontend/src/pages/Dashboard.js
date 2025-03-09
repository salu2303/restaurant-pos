import React, { useEffect, useState } from "react";
import { getMenuItems } from "../api";

const Dashboard = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await getMenuItems();
                setMenu(response.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, []);

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>{item.name} - ${item.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
