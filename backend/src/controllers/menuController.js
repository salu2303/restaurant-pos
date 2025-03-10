import pool from "../config/db.js";

// ✅ Get All Menu Items
export const getMenuItems = async (req, res) => {
    try {
        const [items] = await pool.query("SELECT * FROM menu_items");
        res.json(items);
    } catch (error) {
        console.error("🔥 Error fetching menu:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get All Menu Items by category
export const getMenuItemsByCategory = async (req, res) => {
    try {
        const [items] = await pool.query("SELECT * FROM menu_items where category = ?", [req.params.category]);
        res.json(items);
    } catch (error) {
        console.error("🔥 Error fetching menu:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// ✅ Add a New Menu Item
export const addMenuItem = async (req, res) => {
    try {
        const { item_name, price, category, status } = req.body;
        if (!item_name || !price || !category) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        const [result] = await pool.query(
            "INSERT INTO menu_items (item_name, price, category, status) VALUES (?, ?, ?, ?)",
            [item_name, price, category, status || true]
        );

        res.status(201).json({ message: "Menu item added successfully", id: result.insertId });
    } catch (error) {
        console.error("🔥 Error adding menu item:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Update a Menu Item
export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        const { item_name, price, category, status } = req.body;

        const [result] = await pool.query(
            "UPDATE menu_items SET item_name=?, price=?, category=?, status=? WHERE id=?",
            [item_name, price, category, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.json({ message: "Menu item updated successfully" });
    } catch (error) {
        console.error("🔥 Error updating menu:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Delete a Menu Item
export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM menu_items WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("🔥 Error deleting menu item:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
