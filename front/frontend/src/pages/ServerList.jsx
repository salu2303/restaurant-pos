import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";
import AdminNavbar from "../components/AdminNavbar";

const ServerList = () => {
    const [ser, setServers] = useState([]);
  
    useEffect(() => {
      apiClient.get("/serverlist")
        .then(response => setServers(response.data))
        .catch(error => console.error("Error:", error));
    }, []);

  return (
    <Home>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Servers</h1>
      <ul className="mt-4">
         hy
      </ul>
    </Home>
  );
};

export default ServerList;
