import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiClient.get("/users/me")
      .then(response => setUser(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      {user ? (
        <div className="mt-4">
          <p>Name: {user.full_name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
