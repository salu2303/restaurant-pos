import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]); // Stores filtered items
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default: Show all
  const [newItem, setNewItem] = useState({
    item_name: "",
    category: "",
    price: "",
    image_url: "",
  });

  const categories = [
    "All", // ✅ This allows showing all items
    "Beverages",
    "Burger",
    "Pasta",
    "Pizza",
    "Donuts",
    "Beers & Alcohols",
    "Salads",
    "Desserts",
  ]; 

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    apiClient
      .get("/menu")
      .then((response) => {
        setMenu(response.data);
        setFilteredMenu(response.data); // Show all initially
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredMenu(menu);
    } else {
      const filteredItems = menu.filter(item => item.category === category);
      setFilteredMenu(filteredItems);
    }
  };

  return (
    <Home>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Menu</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          {showAddForm ? "-" : "+ "}
        </button>
      </div>

      {/* ✅ Filters Dropdown */}
      <div className="mb-4">
        <label className="text-sm font-medium">Filters:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border p-2 rounded-md w-full mt-1"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Minimal List View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-md p-3 flex items-center space-x-4 border border-gray-300"
          >
            <div className="flex-1">
              <h3 className="text-base font-medium">{item.item_name}</h3>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-sm font-semibold text-gray-700">${item.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => handleEditItem(item)}
              >
                <FiEdit size={18} />
              </button>
              <button
                className="text-gray-600 hover:text-red-500 focus:outline-none"
                onClick={() => handleDeleteItem(item.id)}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Home>
  );
};

export default Menu;
