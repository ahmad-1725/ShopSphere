const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");

dotenv.config();

const startServer = async () => {
  await connectDB(); // ✅ WAIT FOR DB FIRST

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Electric Store is running!");
  });

  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/products", require("./routes/productRoutes"));
  app.use("/api/order", require("./routes/orderRoutes"));
  app.use("/api/user", require("./routes/userRoutes"));

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
