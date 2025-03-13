import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Home from "./Home";

const ServerList = () => {
  const [servers, setServers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editServer, setEditServer] = useState(null);
  const [newServer, setNewServer] = useState({ full_name: "", email: "" ,password: ""});

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = () => {
    apiClient
      .get("/users/servers")
      .then((response) => setServers(response.data))
      .catch((error) => console.error("Error fetching servers:", error));
  };

  const handleAddOrUpdateServer = () => {
    if (!newServer.full_name || !newServer.email || !newServer.password) {
      alert("Full name and email password are required.");
      return;
    }

    if (editServer) {
      apiClient
        .put(`/users/servers/${editServer.id}`, newServer)
        .then(() => {
          fetchServers();
          setEditServer(null);
          setShowForm(false);
          setNewServer({ full_name: "", email: "" , password: ""});
        })
        .catch((error) => console.error("Error updating server:", error));
    } else {
      apiClient
        .post("/users/servers", newServer)
        .then(() => {
          fetchServers();
          setShowForm(false);
          setNewServer({ full_name: "", email: "" ,password: ""});
        })
        .catch((error) => console.error("Error adding server:", error));
    }
  };

  const handleEditServer = (server) => {
    setEditServer(server);
    setNewServer(server);
    setShowForm(true);
  };

  const handleDeleteServer = (id) => {
    if (window.confirm("Are you sure you want to delete this server?")) {
      apiClient
        .delete(`/users/servers/${id}`)
        .then(() => fetchServers())
        .catch((error) => console.error("Error deleting server:", error));
    }
  };

  return (
    <Home>
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Server List</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditServer(null);
          setNewServer({ full_name: "", email: "" });
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        {showForm ? "Cancel" : "Add Server"}
      </button>

      {showForm && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
          <h2 className="text-lg font-semibold">{editServer ? "Edit Server" : "Add Server"}</h2>
          <input
            type="text"
            placeholder="Full Name *"
            value={newServer.full_name}
            onChange={(e) => setNewServer({ ...newServer, full_name: e.target.value })}
            className="border p-2 rounded-md w-full mt-2"
          />
          <input
            type="email"
            placeholder="Email *"
            value={newServer.email}
            onChange={(e) => setNewServer({ ...newServer, email: e.target.value })}
            className="border p-2 rounded-md w-full mt-2"
          />
          <input
            type="password"
            placeholder="Password *"
            value={newServer.password}
            onChange={(e) => setNewServer({ ...newServer, password: e.target.value })}
            className="border p-2 rounded-md w-full mt-2"
          />
          <button
            onClick={handleAddOrUpdateServer}
            className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editServer ? "Update Server" : "Save Server"}
          </button>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id} className="border-b">
              <td className="p-2 text-center">{server.id}</td>
              <td className="p-2 text-center">{server.full_name}</td>
              <td className="p-2 text-center">{server.email}</td>
              <td className="p-2 text-center">
                <button onClick={() => handleEditServer(server)} className="text-blue-500 mr-2">
                  <FiEdit size={18} />
                </button>
                <button onClick={() => handleDeleteServer(server.id)} className="text-red-500">
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Home>
  );
};

export default ServerList;
