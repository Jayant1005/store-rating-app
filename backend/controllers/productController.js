const db = require("../db");

exports.getOwnerProducts = async (req, res) => {
    try {
        const storeResult = await db.query(
            "SELECT id FROM stores WHERE owner_id = $1",
            [req.user.id]
        );

        if (storeResult.rows.length === 0) {
            return res
                .status(404)
                .json({ message: "Store not found for this owner." });
        }
        const storeId = storeResult.rows[0].id;

        const productsResult = await db.query(
            "SELECT * FROM products WHERE store_id = $1 ORDER BY name",
            [storeId]
        );
        res.json(productsResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.getStoreProducts = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const productsResult = await db.query(
            "SELECT id, name, price FROM products WHERE store_id = $1 ORDER BY name",
            [storeId]
        );
        res.json(productsResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.createProduct = async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res
            .status(400)
            .json({ message: "Product name and price are required." });
    }

    try {
        const storeResult = await db.query(
            "SELECT id FROM stores WHERE owner_id = $1",
            [req.user.id]
        );

        if (storeResult.rows.length === 0) {
            return res
                .status(404)
                .json({ message: "Store not found for this owner." });
        }
        const storeId = storeResult.rows[0].id;

        const newProduct = await db.query(
            "INSERT INTO products (store_id, name, price) VALUES ($1, $2, $3) RETURNING *",
            [storeId, name, price]
        );

        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const ownerId = req.user.id;
        const { name, price } = req.body;

        const productCheck = await db.query(
            `SELECT p.id FROM products p JOIN stores s ON p.store_id = s.id
       WHERE p.id = $1 AND s.owner_id = $2`,
            [productId, ownerId]
        );

        if (productCheck.rows.length === 0) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to edit this product.",
            });
        }

        const updatedProduct = await db.query(
            "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
            [name, price, productId]
        );

        res.json(updatedProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const ownerId = req.user.id;

        const productCheck = await db.query(
            `SELECT p.id FROM products p JOIN stores s ON p.store_id = s.id
       WHERE p.id = $1 AND s.owner_id = $2`,
            [productId, ownerId]
        );

        if (productCheck.rows.length === 0) {
            return res.status(403).json({
                message:
                    "Forbidden: You do not have permission to delete this product.",
            });
        }

        await db.query("DELETE FROM products WHERE id = $1", [productId]);

        res.json({ message: "Product deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
