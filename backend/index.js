require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const connectDB = require("./config/dataBase");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");

connectDB();
const app = express();

// ✅ CORS enable
app.use(cors({
  origin: "http://localhost:5173", // React frontend ka address
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api/users", userRoutes);

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
