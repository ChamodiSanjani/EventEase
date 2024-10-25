import express from "express";
import cors from 'cors'
import { adminRouter} from "./Routers/AdminRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//convert the data to json format when passing through the frontend
const app = express()

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Eventease Event Planner API",
            version: "1.0.0",
            description: "API for managing events.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./Routers/AdminRoute.js"], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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