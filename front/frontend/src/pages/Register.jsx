import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("waiter"); // Default role is "Waiter"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }

    await register(name, email, password, role); // Pass role to register function
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block p-2 border mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block p-2 border mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block p-2 border mb-2 w-full"
        />
        
        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block p-2 border mb-2 w-full"
        >
          <option value="waiter">Waiter</option>
          <option value="admin">Admin</option>
          <option value="cashier">Cashier</option>
        </select>

        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
