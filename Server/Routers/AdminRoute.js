import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()
/**
 * @swagger
 * /auth/adminlogin:
 *   post:
 *     summary: Admin login
 *     description: Login as admin with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email }, 
                "jwt_secret_key",
                { expiresIn: '1d' }
            ); 
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" })
        }
    });
});

/**
 * @swagger
 * /auth/category:
 *   get:
 *     summary: Get categories
 *     description: Retrieve all categories.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

/**
 * @swagger
 * /auth/add_category:
 *   post:
 *     summary: Add a new category
 *     description: Create a new category with a given name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Tech"
 *     responses:
 *       200:
 *         description: Category added successfully
 */
router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

//
//can add category here

//add new event
/**
 * @swagger
 * /auth/add_event:
 *   post:
 *     summary: Add a new event
 *     description: Add a new event with details such as name, type, date, time, location, and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_name:
 *                 type: string
 *                 example: "Tech Conference"
 *               event_type:
 *                 type: string
 *                 example: "Conference"
 *               event_date:
 *                 type: string
 *                 example: "2024-10-01"
 *               starting_time:
 *                 type: string
 *                 example: "09:00"
 *               ending_time:
 *                 type: string
 *                 example: "17:00"
 *               event_location:
 *                 type: string
 *                 example: "Conference Hall"
 *               event_description:
 *                 type: string
 *                 example: "A technology-focused conference."
 *     responses:
 *       200:
 *         description: Event added successfully
 */
router.post('/add_event', (req, res) => {
    console.log(req.body)
    const { event_name, event_type, event_date, starting_time, ending_time, event_location, event_description } = req.body;

    // Check if all fields are provided
    if (!event_name || !event_type || !event_date || !starting_time || !ending_time || !event_location || !event_description) {
        return res.status(400).json({ Status: false, Error: "Please fill all fields" });
    }

    // Prepare SQL query
    const sql = "INSERT INTO event (event_name, event_type, event_date, starting_time, ending_time, event_location, event_description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [event_name, event_type, event_date, starting_time, ending_time, event_location, event_description];

    // Execute query
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting event: ", err);
            return res.status(500).json({ Status: false, Error: "Server error while adding event" });
        }

        // Successful insert
        return res.status(200).json({ Status: true, message: "Event added successfully", eventId: result.insertId });
    });
});

/**
 * @swagger
 * /auth/event:
 *   get:
 *     summary: Get events
 *     description: Retrieve all events.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/event', (req, res) => {
    const sql = "SELECT * FROM event";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


//get by event id
/**
 * @swagger
 * /auth/event/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Retrieve a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 Result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       event_name:
 *                         type: string
 *                         example: "Tech Conference"
 *                       event_type:
 *                         type: string
 *                         example: "Conference"
 *                       event_date:
 *                         type: string
 *                         example: "2024-10-01"
 *                       starting_time:
 *                         type: string
 *                         example: "09:00"
 *                       ending_time:
 *                         type: string
 *                         example: "17:00"
 *                       event_location:
 *                         type: string
 *                         example: "Conference Hall"
 *                       event_description:
 *                         type: string
 *                         example: "A technology-focused conference."
 */
router.get('/event/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM event WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

/**
 * @swagger
 * /auth/edit_event/{id}:
 *   put:
 *     summary: Edit event by ID
 *     description: Update an event's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_name:
 *                 type: string
 *                 example: "Tech Conference"
 *               event_type:
 *                 type: string
 *                 example: "Conference"
 *               event_date:
 *                 type: string
 *                 example: "2024-10-01"
 *               starting_time:
 *                 type: string
 *                 example: "09:00"
 *               ending_time:
 *                 type: string
 *                 example: "17:00"
 *               event_location:
 *                 type: string
 *                 example: "Conference Hall"
 *               event_description:
 *                 type: string
 *                 example: "A technology-focused conference."
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/edit_event/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE event 
        set event_name = ?, event_type = ?, event_date = ?, starting_time = ?, ending_time = ?, event_location = ?, event_description = ? 
        Where id = ?`
    const values = [
        req.body.event_name,
        req.body.event_type,
        req.body.event_date,
        req.body.starting_time,
        req.body.ending_time,
        req.body.event_location,
        req.body.event_description
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

/**
 * @swagger
 * /auth/delete_event/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     description: Delete an event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.delete('/delete_event/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from event where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})



export { router as adminRouter }