import React, { useState } from "react";
import { useNavigation } from 'wouter';
import { loginUser } from "../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [location, navigate] = useNavigation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-xl rounded-xl p-10 text-white border border-white/30">
                <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
                
                {error && (
                    <div className="mb-4 bg-red-600 text-white text-sm p-3 rounded-md shadow-md">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full px-5 py-3 bg-white/20 text-white placeholder-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 transition-all"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full px-5 py-3 bg-white/20 text-white placeholder-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 transition-all"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-white/80 text-sm">Don't have an account? <a href="/register" className="text-blue-300 hover:underline">Sign up</a></p>
            </div>
        </div>
    );
};

export default Login;
