import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const UserManagement = () => {
  const { user } = useContext(AuthContext);

  // Redirect non-admin users
  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Management (Admin Only)</h1>
      <p>Here you can add/remove users.</p>
    </div>
  );
};

export default UserManagement;
