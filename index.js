const express = require("express");
const path = require("path");

const connectDB = require("./config/db");
const userRoutes = require("./routes/crudRoute");

const app = express();
const port = 8000;

// Connect to MongoDB
connectDB();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded());

// Routes
app.use("/", require("./routes/crudRoute"));

// Uncomment if you need to serve static files from "uploads" folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, (err) => {
  if (err) {
    console.log("Server Error:", err);
    return false;
  }
  console.log(`Server is running on port: ${port}`);
});
