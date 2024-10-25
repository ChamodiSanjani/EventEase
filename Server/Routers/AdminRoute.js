import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Add bcrypt for password hashing

const router = express.Router();

// Admin login
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const hashedPassword = result[0].password;
            // Compare the hashed password
            bcrypt.compare(req.body.password, hashedPassword, (err, isMatch) => {
                if (err) return res.json({ loginStatus: false, Error: "Password comparison error" });
                if (isMatch) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "admin", email: email },
                        process.env.JWT_SECRET || "jwt_secret_key", // Use environment variable for secret
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true });
                } else {
                    return res.json({ loginStatus: false, Error: "Invalid credentials" });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "Invalid credentials" });
        }
    });
});

// Fetch categories
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

// Add category
router.post('/add_category', (req, res) => {
    const { category } = req.body;
    if (!category || category.trim() === "") {
        return res.status(400).json({ Status: false, Error: "Category name is required" });
    }
    const sql = "INSERT INTO category (name) VALUES (?)";
    con.query(sql, [category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, message: "Category added successfully", categoryId: result.insertId });
    });
});

// Add event
router.post('/add_event', (req, res) => {
    const { event_name, event_type, event_date, starting_time, ending_time, event_location, event_description, category_id } = req.body;

    if (!event_name || !event_type || !event_date || !starting_time || !ending_time || !event_location || !event_description || !category_id) {
        return res.status(400).json({ Status: false, Error: "Please fill all fields" });
    }

    const sql = "INSERT INTO event (event_name, event_type, event_date, starting_time, ending_time, event_location, event_description, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [event_name, event_type, event_date, starting_time, ending_time, event_location, event_description, category_id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting event: ", err);
            return res.status(500).json({ Status: false, Error: "Server error while adding event" });
        }
        return res.status(200).json({ Status: true, message: "Event added successfully", eventId: result.insertId });
    });
});

// Fetch all events with pagination
router.get('/events', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const sql = "SELECT * FROM event LIMIT ?, ?";
    con.query(sql, [parseInt(offset), parseInt(limit)], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

// Edit event
router.put('/auth/edit_event/:id', (req, res) => {
    const { event_name, event_type, event_date, starting_time, ending_time, event_location, event_description, category_id } = req.body;
    
    // Validate input
    if (!event_name || !event_type || !event_date || !starting_time || !ending_time || !event_location || !event_description || !category_id) {
        return res.status(400).json({ Status: false, Error: "Please fill all fields" });
    }

    const sql = "UPDATE event SET event_name = ?, event_type = ?, event_date = ?, starting_time = ?, ending_time = ?, event_location = ?, event_description = ?, category_id = ? WHERE id = ?";
    const values = [event_name, event_type, event_date, starting_time, ending_time, event_location, event_description, category_id, req.params.id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating event: ", err);
            return res.status(500).json({ Status: false, Error: "Update Error" });
        }
        return res.json({ Status: true, message: "Event updated successfully" });
    });
});

// Delete event
router.delete('/auth/delete_event/:id', (req, res) => {
    const sql = "DELETE FROM event WHERE id = ?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting event: ", err);
            return res.status(500).json({ Status: false, Error: "Delete Error" });
        }
        return res.json({ Status: true, message: "Event deleted successfully" });
    });
});

export default router;
