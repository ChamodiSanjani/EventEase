import express from "express";
import cors from 'cors'
import { adminRouter} from "./Routers/AdminRoute.js";
//convert the data to json format when passing through the frontend
const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', adminRouter)

app.listen(3000, () => {
    console.log("Server is running")
})