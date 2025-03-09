import pool from "../config/db.js";

// ✅ Get All Inventory Items
export const getInventoryItems = async (req, res) => {
    try {
        const [items] = await pool.query("SELECT * FROM inventory");
        res.json(items);
    } catch (error) {
        console.error("🔥 Error fetching inventory:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Add a New Inventory Item
export const addInventoryItem = async (req, res) => {
    try {
        const { item_name, quantity, unit } = req.body;

        if (!item_name || !quantity || !unit) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO inventory (item_name, quantity, unit) VALUES (?, ?, ?)",
            [item_name, quantity, unit]
        );

        res.status(201).json({ message: "Inventory item added successfully", id: result.insertId });
    } catch (error) {
        console.error("🔥 Error adding inventory item:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Update Inventory Item
export const updateInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).json({ message: "Quantity is required." });
        }

        const [result] = await pool.query(
            "UPDATE inventory SET quantity = ? WHERE id = ?",
            [quantity, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        res.json({ message: "Inventory updated successfully" });
    } catch (error) {
        console.error("🔥 Error updating inventory:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Delete Inventory Item
export const deleteInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM inventory WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        res.json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        console.error("🔥 Error deleting inventory item:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
