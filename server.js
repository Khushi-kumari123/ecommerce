const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, getMongoStatus } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB (or enable seamless mock store fallback)
connectDB();

// API routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: getMongoStatus() ? "MongoDB Connected" : "In-Memory Mock Store (Active)",
    message: "MERN E-Commerce Backend is operational!"
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 MERN E-Commerce Server running on port ${PORT}`);
  console.log(`🌐 API Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products Endpoint: http://localhost:${PORT}/api/products`);
  console.log(`========================================\n`);
});
