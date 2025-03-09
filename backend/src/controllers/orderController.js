import pool from "../config/db.js";

// ✅ Get All Orders
export const getOrders = async (req, res) => {
    try {
        const [orders] = await pool.query("SELECT * FROM orders");
        res.json(orders);
    } catch (error) {
        console.error("🔥 Error fetching orders:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Create New Order
export const createOrder = async (req, res) => {
    try {
        const { table_number, user_id, total_price } = req.body;

        if (!table_number || !user_id || !total_price) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO orders (table_number, user_id, total_price, status) VALUES (?, ?, ?, 'pending')",
            [table_number, user_id, total_price]
        );

        res.status(201).json({ message: "Order created successfully", id: result.insertId });
    } catch (error) {
        console.error("🔥 Error creating order:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const [result] = await pool.query(
            "UPDATE orders SET status=? WHERE id=?",
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error("🔥 Error updating order:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
