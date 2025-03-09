import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigation } from "wouter";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("waiter");
    const [error, setError] = useState(null);
    const [location, navigate] = useNavigation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password, role });
            navigate("/login"); // Redirect to login page
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-8 text-white border border-white/30">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                {error && (
                    <div className="mb-4 bg-red-500 text-white text-sm p-3 rounded-md shadow-md">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-white/20 text-white border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-white/20 text-white border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-white/20 text-white border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-white/20 text-white border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30">
                        <option value="waiter">Waiter</option>
                        <option value="cashier">Cashier</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg">Register</button>
                </form>
                <p className="mt-4 text-center text-white/80 text-sm">Already have an account? <a href="/login" className="text-blue-300 hover:underline">Login</a></p>
            </div>
        </div>
    );
};

export default Register;