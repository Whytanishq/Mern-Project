import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./database/dbconnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import morgan from "morgan";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Middlewares
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnection();

// Routes
app.use("/api/v1/reservation", reservationRouter);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

// Error handling
app.use(errorMiddleware);

export default app;