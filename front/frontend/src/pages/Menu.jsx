// import { useEffect, useState } from "react";
// import apiClient from "../api/apiClient";
// import Home from "../pages/Home";
// import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons

// const Menu = () => {
//   const [menu, setMenu] = useState([]);
//   const [filteredMenu, setFilteredMenu] = useState([]); // Stores filtered items
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All"); // Default: Show all
//   const [newItem, setNewItem] = useState({
//     item_name: "",
//     category: "",
//     price: "",
//     image_url: "",
//   });

//   const categories = [
//     "All", // ✅ This allows showing all items
//     "Beverages",
//     "Burger",
//     "Pasta",
//     "Pizza",
//     "Donuts",
//     "Beers & Alcohols",
//     "Salads",
//     "Desserts",
//   ]; 

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const fetchMenu = () => {
//     apiClient
//       .get("/menu")
//       .then((response) => {
//         setMenu(response.data);
//         setFilteredMenu(response.data); // Show all initially
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleFilterChange = (category) => {
//     setSelectedCategory(category);
//     if (category === "All") {
//       setFilteredMenu(menu);
//     } else {
//       const filteredItems = menu.filter(item => item.category === category);
//       setFilteredMenu(filteredItems);
//     }
//   };

//   return (
//     <Home>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Menu</h1>
//         <button
//           onClick={() => setShowAddForm(!showAddForm)}
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//         >
//           {showAddForm ? "-" : "+ "}
//         </button>
//       </div>

//       {/* ✅ Filters Dropdown */}
//       <div className="mb-4">
//         <label className="text-sm font-medium">Filters:</label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => handleFilterChange(e.target.value)}
//           className="border p-2 rounded-md w-full mt-1"
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Minimal List View */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredMenu.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-md p-3 flex items-center space-x-4 border border-gray-300"
//           >
//             <div className="flex-1">
//               <h3 className="text-base font-medium">{item.item_name}</h3>
//               <p className="text-xs text-gray-500">{item.category}</p>
//               <p className="text-sm font-semibold text-gray-700">${item.price}</p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-3">
//               <button
//                 className="text-gray-600 hover:text-gray-900 focus:outline-none"
//                 onClick={() => handleEditItem(item)}
//               >
//                 <FiEdit size={18} />
//               </button>
//               <button
//                 className="text-gray-600 hover:text-red-500 focus:outline-none"
//                 onClick={() => handleDeleteItem(item.id)}
//               >
//                 <FiTrash2 size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Home>
//   );
// };

// export default Menu;
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState(null); // Stores item being edited
  const [newItem, setNewItem] = useState({
    item_name: "",
    category: "",
    price: "",
    image_url: "",
  });

  const categories = [
    "Beverages",
    "Burger",
    "Pasta",
    "Pizza",
    "Donuts",
    "Beers & Alcohols",
    "Salads",
    "Desserts",
  ]; // ✅ Predefined category options

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    apiClient
      .get("/menu")
      .then((response) => setMenu(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const handleAddItem = () => {
    if (!newItem.item_name || !newItem.price || !newItem.category) {
      alert("Please fill all required fields.");
      return;
    }

    apiClient
      .post("/menu", newItem)
      .then(() => {
        fetchMenu();
        setShowAddForm(false);
        setNewItem({ item_name: "", category: "", price: "", image_url: "" });
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      apiClient
        .delete(`/menu/${id}`)
        .then(() => fetchMenu())
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
  };

  const handleSaveEdit = () => {
    apiClient
      .put(`/menu/${editItem.id}`, editItem)
      .then(() => {
        fetchMenu();
        setEditItem(null);
      })
      .catch((error) => console.error("Error updating item:", error));
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

      {/* Add Item Form */}
      {showAddForm && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <h2 className="text-lg font-semibold mb-2">Add New Menu Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Item Name *"
              value={newItem.item_name}
              onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
              className="border p-2 rounded-md w-full"
              required
            />
            {/* ✅ Dropdown for Category */}
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="border p-2 rounded-md w-full"
              required
            >
              <option value="" disabled>Select Category *</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price *"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
          <button
            onClick={handleAddItem}
            className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Item
          </button>
        </div>
      )}

      {/* Edit Item Form */}
      {editItem && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <h2 className="text-lg font-semibold mb-2">Edit Menu Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={editItem.item_name}
              onChange={(e) => setEditItem({ ...editItem, item_name: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
            {/* ✅ Dropdown for Editing Category */}
            <select
              value={editItem.category}
              onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
              className="border p-2 rounded-md w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={editItem.price}
              onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <button
            onClick={handleSaveEdit}
            className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditItem(null)}
            className="ml-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Minimal List View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map((item) => (
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
