const bcrypt = require("bcryptjs");
const db = require("../db");

const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/.test(password);

exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const userResult = await db.query(
            "SELECT password FROM users WHERE id = $1",
            [userId]
        );
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const storedPassword = userResult.rows[0].password;
        const isMatch = await bcrypt.compare(currentPassword, storedPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password." });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                message: "New password does not meet complexity requirements.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        await db.query("UPDATE users SET password = $1 WHERE id = $2", [
            hashedNewPassword,
            userId,
        ]);

        res.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await db.query(
            "SELECT name, email, address, role FROM users WHERE id = $1",
            [req.user.id]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

exports.getUsers = async (req, res) => {
    const { name, email, role } = req.query;

    let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
    const params = [];

    if (name) {
        params.push(`%${name}%`);
        query += ` AND name ILIKE $${params.length}`;
    }
    if (email) {
        params.push(`%${email}%`);
        query += ` AND email ILIKE $${params.length}`;
    }
    if (role) {
        params.push(role);
        query += ` AND role = $${params.length}`;
    }

    try {
        const users = await db.query(query, params);
        res.json(users.rows);
    } catch (err) {
        console.error("Error fetching users for admin:", err.message);
        res.status(500).send("Server Error");
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            "INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role",
            [name, email, hashedPassword, address, role]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error("Error creating a new user:", err.message);
        if (err.code === "23505") {
            return res
                .status(400)
                .json({ message: "An account with this email already exists." });
        }
        res.status(500).send("Server Error");
    }
};

exports.getAdminDashboardStats = async (req, res) => {
    try {
        const userCount = await db.query("SELECT COUNT(*) FROM users");
        const storeCount = await db.query("SELECT COUNT(*) FROM stores");
        const ratingCount = await db.query("SELECT COUNT(*) FROM ratings");

        res.json({
            users: parseInt(userCount.rows[0].count),
            stores: parseInt(storeCount.rows[0].count),
            ratings: parseInt(ratingCount.rows[0].count),
        });
    } catch (err) {
        console.error("Error fetching admin dashboard stats:", err.message);
        res.status(500).send("Server Error");
    }
};
