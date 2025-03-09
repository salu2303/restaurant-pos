import pool from "../config/db.js";

// ✅ Get All Payments
export const getPayments = async (req, res) => {
    try {
        const [payments] = await pool.query("SELECT * FROM payments");
        console.log(payments);
        res.json(payments);
    } catch (error) {
        console.error("🔥 Error fetching payments:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Add a New Payment
export const addPayment = async (req, res) => {
    try {
        const { order_id, payment_method, amount } = req.body;

        if (!order_id || !payment_method || !amount) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO payments (order_id, payment_method, amount, payment_status) VALUES (?, ?, ?, 'completed')",
            [order_id, payment_method, amount]
        );

        res.status(201).json({ message: "Payment recorded successfully", id: result.insertId });
    } catch (error) {
        console.error("🔥 Error adding payment:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get Payments for a Specific Order
export const getPaymentByOrder = async (req, res) => {
    try {
        const { order_id } = req.params;

        const [payments] = await pool.query("SELECT * FROM payments WHERE order_id = ?", [order_id]);

        if (payments.length === 0) {
            return res.status(404).json({ message: "No payments found for this order" });
        }

        res.json(payments);
    } catch (error) {
        console.error("🔥 Error fetching payment:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
