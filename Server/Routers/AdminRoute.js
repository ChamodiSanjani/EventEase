import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()
//data recieved from frontend or not
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

//
//can add category here

//add new event
router.post('add_newevent', (req, res) => {
    const sql = "INSERT INTO events \
    (`event_name`, `event_type`, `event_date`, `starting_time`, `ending_time`, `event_location`, `event_description`) \
    VALUES (?)";
    const values = [event_name, event_type, event_date, starting_time, ending_time, event_location, event_description];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting event: ", err);
            return res.status(500).json({ message: "Server error while adding event" });
        }

        res.status(200).json({ message: "Event added successfully", eventId: result.insertId });
    });
});


// router.get('/event/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM event WHERE id = ?";
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })

router.put('/edit_event/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE event 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
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

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})



export { router as adminRouter }