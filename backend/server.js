const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ROUTES */
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");

/* MIDDLEWARE */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend is working fine");
});

/* DB CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

/* SERVER */
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});