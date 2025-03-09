// import { useEffect, useState } from "react";
// import apiClient from "../api/apiClient";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     apiClient.get("/orders")
//       .then(response => setOrders(response.data))
//       .catch(error => console.error("Error:", error));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Orders</h1>
//       <ul className="mt-4">
//         {orders.map(order => (
//           <li key={order.id} className="p-2 border-b">
//             Order #{order.id} - {order.status} - ${order.total}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Orders;
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";

const Orders = () => {
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiClient.get("/orders")
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <Home>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
      <ul className="mt-4">
         {orders.map(order => (
          <li key={order.id} className="p-2 border-b">
            Order #{order.id} - {order.status} - ${order.total}
          </li>
        ))}
      </ul>
    </Home>
  );
};

export default Orders;
