import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

// Load env vars BEFORE using them
dotenv.config({ path: "./.env" });

// Init express app
const app = express();

// Connect to DB
connectDB();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://your-frontend-domain.vercel.app", // production (if needed)
  "https://expense-react-ashy.vercel.app", // production (if needed)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("User API is working fine!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
});
