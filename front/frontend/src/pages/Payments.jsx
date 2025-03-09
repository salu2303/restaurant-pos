// import { useEffect, useState } from "react";
// import apiClient from "../api/apiClient";

// const Payments = () => {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     apiClient.get("/payments")
//       .then(response => setPayments(response.data))
//       .catch(error => console.error("Error:", error));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Payments</h1>
//       <ul className="mt-4">
//         {payments.map(payment => (
//           <li key={payment.id} className="p-2 border-b">
            
//             Payment ID: {payment.method} - Amount: ${payment.amount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Payments;
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Home from "../pages/Home";

const Payments = () => {
    const [payments, setPayments] = useState([]);
  
    useEffect(() => {
      apiClient.get("/payments")
        .then(response => setPayments(response.data))
        .catch(error => console.error("Error:", error));
    }, []);

  return (
    <Home>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payments</h1>
      <ul className="mt-4">
         {payments.map(payment => (
          <li key={payment.id} className="p-2 border-b">
            
            Payment ID: {payment.method} - Amount: ${payment.amount}
          </li>
        ))}
      </ul>
    </Home>
  );
};

export default Payments;
