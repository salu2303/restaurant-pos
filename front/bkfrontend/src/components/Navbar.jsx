import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 text-gray-800 shadow-sm z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <ul className="flex space-x-6">
          {user ? (
            <>
              
              <li><Link to="/menu" className="hover:text-gray-600">Menu</Link></li>
              <li><Link to="/orders" className="hover:text-gray-600">Orders</Link></li>
              <li><Link to="/payments" className="hover:text-gray-600">Payments</Link></li>
              <li><Link to="/inventory" className="hover:text-gray-600">Inventory</Link></li>
              <li><Link to="/profile" className="hover:text-gray-600">Profile</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-600">Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-600">Register</Link></li>
            </>
          )}
        </ul>
        {user && (
          <button 
            onClick={logout} 
            className="border border-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
