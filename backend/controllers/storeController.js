const db = require("../db");

exports.getStores = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { name, address } = req.query;

    let query = `
    SELECT
      s.id,
      s.name,
      s.address,
      COALESCE(AVG(r.rating), 0) as "overallRating"
      ${userId ? `, (SELECT rating FROM ratings WHERE store_id = s.id AND user_id = $1) as "userRating"` : ''}
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `;
    const params = userId ? [userId] : [];

    if (name) {
        params.push(`%${name}%`);
        query += ` AND s.name ILIKE $${params.length}`;
    }
    if (address) {
        params.push(`%${address}%`);
        query += ` AND s.address ILIKE $${params.length}`;
    }

    query += " GROUP BY s.id ORDER BY s.name";

    try {
        const storesResult = await db.query(query, params);
        res.json(storesResult.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

exports.createStore = async (req, res) => {
    const { name, address, owner_id } = req.body;

    if (!name || !address) {
        return res
            .status(400)
            .json({ message: "Store name and address are required." });
    }

    try {
        const newStore = await db.query(
            "INSERT INTO stores (name, address, owner_id) VALUES ($1, $2, $3) RETURNING *",
            [name, address, owner_id || null]
        );
        res.status(201).json(newStore.rows[0]);
    } catch (err) {
        console.error("Error creating a new store:", err.message);
        res.status(500).send("Server Error");
    }
};

exports.updateStore = async (req, res) => {
    const { name, address } = req.body;
    const storeId = req.params.id;

    try {
        // Owner specific updating
        const updateResult = await db.query(
            "UPDATE stores SET name = COALESCE($1, name), address = COALESCE($2, address) WHERE id = $3 AND owner_id = $4 RETURNING *",
            [name, address, storeId, req.user.id]
        );

        if (updateResult.rows.length === 0) {
            return res.status(403).json({ message: "Forbidden: You do not own this store." });
        }

        res.json(updateResult.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.getOwnerDashboard = async (req, res) => {
    try {
        const storeResult = await db.query(
            "SELECT * FROM stores WHERE owner_id = $1",
            [req.user.id]
        );

        if (storeResult.rows.length === 0) {
            return res.status(404).json({ message: "You do not own a store." });
        }

        const store = storeResult.rows[0];

        const avgRatingResult = await db.query(
            'SELECT COALESCE(AVG(rating), 0) as "averageRating" FROM ratings WHERE store_id = $1',
            [store.id]
        );

        const ratersResult = await db.query(
            `SELECT u.name, u.email, r.rating
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1`,
            [store.id]
        );

        res.json({
            storeName: store.name,
            averageRating: parseFloat(avgRatingResult.rows[0].averageRating).toFixed(2),
            raters: ratersResult.rows,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
