// import { useEffect, useState } from "react";
// import apiClient from "../api/apiClient";

// const Inventory = () => {
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     apiClient.get("/inventory")
//       .then(response => setInventory(response.data))
//       .catch(error => console.error("Error:", error));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Inventory</h1>
//       <ul className="mt-4">
//         {inventory.map(item => (
//           <li key={item.id} className="p-2 border-b">
//             {item.item_name} - {item.quantity} units
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Inventory;
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";


const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    apiClient.get("/inventory")
      .then(response => setInventory(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <Home>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Inventory</h1>
      <ul className="mt-4">
         {inventory.map(item => (
          <li key={item.id} className="p-2 border-b">
            {item.item_name} - {item.quantity} units
          </li>
        ))}
      </ul>
    </Home>
  );
};

export default Inventory;
