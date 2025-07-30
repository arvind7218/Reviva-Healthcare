// backend/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Dummy functions if you’re not using DB/Cloudinary yet
import connectDB from "./config/mongodb.js"; // Make sure this exists or comment it
import connectCloudinary from "./config/cloudinary.js"; // Make sure this exists or comment it

import userRouter from "./routes/userRoute.js"; // Optional
import doctorRouter from "./routes/doctorRoute.js"; // Optional
import adminRouter from "./routes/adminRoute.js"; // Optional
import chatRoute from "./routes/chatRoute.js"; // ✅ This is required

const app = express();
const port = process.env.PORT || 4000;

// DB/Cloud
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);     // Optional
app.use("/api/doctor", doctorRouter); // Optional
app.use("/api/admin", adminRouter);   // Optional
app.use("/api/chat", chatRoute);      // ✅ Now this maps POST /api/chatAC

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
