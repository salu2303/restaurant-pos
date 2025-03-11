import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ State for Modal

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    apiClient
      .get("/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  return (
   <Home> 
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Table</th>
              <th className="p-2 border">Waiter</th>
              <th className="p-2 border">Order Time</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id} className="border-b">
                <td className="p-2 text-center">{order.order_id}</td>
                <td className="p-2 text-center">{order.table_name}</td>
                <td className="p-2 text-center">{order.waiter_name}</td>
                <td className="p-2 text-center">{new Date(order.order_time).toLocaleString()}</td>

                {/* View Items Button */}
                <td className="p-2 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View Items
                  </button>
                </td>

                {/* Total Price Calculation */}
                <td className="p-2 text-center font-semibold">
                  ${order.items?.reduce((acc, item) => acc + (parseFloat(item.total_price) || 0), 0).toFixed(2)}
                </td>

                {/* Payment Details */}
                <td className="p-2 text-center">
                  {order.payment_method ? (
                    <>
                      <div>{order.payment_method}</div>
                      <div className="font-semibold">${order.payment_amount}</div>
                      <div className={`text-sm ${order.payment_status === "Paid" ? "text-green-500" : "text-red-500"}`}>
                        {order.payment_status}
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500">Not Paid</span>
                  )}
                </td>

                {/* Order Status */}
                <td className="p-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.order_status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {order.order_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal Popup for Order Items */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="border-b py-2">
                  {item.item_name} (x{item.quantity}) - <span className="font-semibold">${item.total_price}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </Home>
  );
};

export default Orders;
