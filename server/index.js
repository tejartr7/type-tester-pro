import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connectDb.js";
import router from "./routes/register.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/register",router);
app.listen(8000, () => {
    connectDB(process.env.MONGODB_URL);
    console.log('Server is running on port 8000');
});