import { Link } from "react-router-dom";

const LoginNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">POS</Link>
      </div>

      {/* About Us Link */}
      <div>
        <Link to="/about" className="text-gray-700 hover:text-blue-500 transition">
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default LoginNavbar;
