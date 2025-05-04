import pool from "../config/db.js";




// ✅ Fetch all orders with waiter name, order items, and payment details
export const getOrdersBy = async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT 
                orders.id AS order_id,
                orders.table_name,
                orders.status AS order_status,
                
                payments.payment_method,
                payments.amount AS payment_amount,
                payments.status AS payment_status
            FROM orders
            
            LEFT JOIN payments ON orders.id = payments.order_id;
            
        `);

        // Fetch order items separately and group by order_id
        const [orderItems] = await pool.query(`
            SELECT 
                order_items.order_id,
                menu_items.item_name,
                order_items.quantity,
                order_items.price
            FROM order_items
            JOIN menu_items ON order_items.menu_item_id = menu_items.id;
        `);

        // Organize order items under their respective order
        const ordersWithItems = orders.map(order => {
            return {
                ...order,
                items: orderItems.filter(item => item.order_id === order.order_id)
            };
        });

        res.json(ordersWithItems);
    } catch (error) {
        console.error("🔥 Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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
    // try {
    //     const { table_number, user_id, total_price } = req.body;

    //     if (!table_number || !user_id || !total_price) {
    //         return res.status(400).json({ message: "All fields are required." });
    //     }

    //     const [result] = await pool.query(
    //         "INSERT INTO orders (table_number, user_id, total_price, status) VALUES (?, ?, ?, 'pending')",
    //         [table_number, user_id, total_price]
    //     );

    //     res.status(201).json({ message: "Order created successfully", id: result.insertId });
    // } catch (error) {
    //     console.error("🔥 Error creating order:", error.message);
    //     res.status(500).json({ error: "Internal Server Error" });
    // }
    try {
        const { id, tableId, tableName, items, status, total, createdAt } = req.body;
        
        // ✅ Convert `createdAt` to MySQL `DATETIME` format
        const formattedCreatedAt = new Date(createdAt).toISOString().slice(0, 19).replace("T", " ");
    
        // Insert order into orders table
        const [result] = await pool.query(
          "INSERT INTO orders (id, table_id, table_name, status, total, created_at) VALUES (?, ?, ?, ?, ?, ?)",
          [id, tableId, tableName, status, total, formattedCreatedAt] // ✅ Use formatted date
        );
    
        // Insert order items into order_items table
        for (let item of items) {
          await pool.query(
            "INSERT INTO order_items (order_id, menu_item_id, name, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?, ?)",
            [id, item.menuItemId, item.name, item.price, item.quantity, item.subtotal]
          );
        }
    
        res.status(201).json({ message: "Order saved successfully", orderId: result.insertId });
    
      } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to save order" });
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

export const completeOrder = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount } = req.body;

        // ✅ Update order status to "completed"
        await pool.query(
            "UPDATE orders SET status = 'completed' WHERE id = ?",
            [orderId]
        );

        // ✅ Insert payment details into `payments` table
        const paymentTime = new Date().toISOString().slice(0, 19).replace("T", " "); // Convert to MySQL format
        const paymentStatus = "paid";

        const [result] = await pool.query(
            "INSERT INTO payments (order_id, payment_method, amount, payment_time, status) VALUES (?, ?, ?, ?, ?)",
            [orderId, paymentMethod, amount, paymentTime, paymentStatus]
        );

        res.status(200).json({
            message: "Payment completed successfully",
            paymentId: result.insertId
        });

    } catch (error) {
        console.error("Error completing payment:", error);
        res.status(500).json({ error: "Failed to complete payment" });
    }
};

export const getCompletedOrdersCount = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT COUNT(*) AS count FROM orders WHERE status = 'completed'"
        );

        res.json({ count: rows[0].count });
    } catch (error) {
        console.error("Error fetching completed orders count:", error);
        res.status(500).json({ error: "Failed to fetch completed orders count" });
    }
};

export const fetchOrderStats = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
    
        // Get completed orders count
        const [countResult] = await pool.query(
          "SELECT COUNT(*) AS count FROM orders WHERE status = 'completed' AND DATE(created_at) = ?",
          [today]
        );
    
        // Get daily sales total
        const [totalResult] = await pool.query(
          "SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE status = 'completed' AND DATE(created_at) = ?",
          [today]
        );
    
        res.json({
          completedOrdersCount: countResult[0].count || 0,
          dailyTotal: totalResult[0].total || 0, // Ensure this is always a number
        });
      } catch (error) {
        console.error("Error fetching order stats:", error);
        res.status(500).json({ error: "Failed to fetch order stats" });
      }


};