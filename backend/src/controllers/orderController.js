import pool from "../config/db.js";




// ✅ Fetch all orders with waiter name, order items, and payment details
export const getOrdersBy = async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT 
                orders.id AS order_id,
                orders.table_name,
                orders.order_time,
                orders.status AS order_status,
                users.full_name AS waiter_name,
                payments.payment_method,
                payments.amount AS payment_amount,
                payments.status AS payment_status
            FROM orders
            LEFT JOIN users ON orders.waiter_id = users.id
            LEFT JOIN payments ON orders.id = payments.order_id
            ORDER BY orders.order_time DESC;
        `);

        // Fetch order items separately and group by order_id
        const [orderItems] = await pool.query(`
            SELECT 
                order_items.order_id,
                menu_items.item_name,
                order_items.quantity,
                order_items.total_price
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
