import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const tabData = [
  { title: "Menu", path: "/menu" },
  { title: "Orders", path: "/orders" },
  { title: "Payments", path: "/payments" },
  { title: "Inventory", path: "/inventory" },
  { title: "Server List", path: "/serverlist" },
];

const Home = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTab = tabData.find((tab) => tab.path === location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center w-full">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Tab Bar */}
      <div className="bg-white shadow-md rounded-lg mx-10 mt-20 p-3 flex space-x-4">
        {tabData.map((tab, index) => (
          <button
            key={index}
            onClick={() => navigate(tab.path)}
            className={`px-6 py-2 font-medium rounded-lg transition-all ${
              selectedTab?.title === tab.title
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Page Content */}
      <div className="p-10">{children}</div>
    </div>
  );
};

export default Home;
