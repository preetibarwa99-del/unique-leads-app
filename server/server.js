const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes folder/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error.message);
  });


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Unique Leads API is running",
  });
});


// Lead routes
app.use("/api/leads", leadRoutes);


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});