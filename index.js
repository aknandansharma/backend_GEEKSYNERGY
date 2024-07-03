import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routers/userRoutes.js"



// .env configure.
dotenv.config();


const app = express();


//database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan());
app.use(bodyParser.json());

// import 



// routes
app.use('/api/v1/auth', userRoutes)

// rest api check on the web.
app.get("/", (req, res) => {
    res.send(`<h1>This is GEEKSYNERGY backend</h1>`);
})

// Port 
const PORT = process.env.PORT || 5000;

// run listen.
app.listen(PORT, () => {
    console.log(`Server Running on the PORT ${PORT}`.bgGreen.white);
})
