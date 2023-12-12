require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const userRouters = require("./routes/userRoutes");

const {
  authorizeUser,
  authorizeAdmin,
} = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI =
  "mongodb+srv://hossam3wad:DvwIFpmMoD66Z9yY@cluster0.kd1b133.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("app running on port 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(authRoutes);
app.use(adminRoutes);
app.use(instructorRoutes);
app.use(userRouters);

app.get("/profile", authorizeUser, (req, res) =>
  res.json({ res: "Profile Page" })
);
app.get("/dashboard", authorizeAdmin, (req, res) =>
  res.json({ res: "Dashboard Page" })
);
