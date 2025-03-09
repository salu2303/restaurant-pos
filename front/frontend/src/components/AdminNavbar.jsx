import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 px-8 flex  justify-between items-center shadow-lg">
      {/* Logo / Brand Name */}
      <div className="text-2xl font-bold text-blue-400">
        <Link to="/">Admin Panel</Link>
      </div>

      {/* Admin Navigation Links */}
      <div className="flex items-center space-x-6">

        {/* <Link to="/menu" className="hover:text-blue-300 transition">Menu</Link>
        <Link to="/orders" className="hover:text-blue-300 transition">Orders</Link>
        <Link to="/payments" className="hover:text-blue-300 transition">Payments</Link>
        <Link to="/inventory" className="hover:text-blue-300 transition">Inventory</Link>
        <Link to="/server-list" className="hover:text-blue-300 transition">Server List</Link> */}
        <Link to="/profile" className="hover:text-blue-300 transition">Profile</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
