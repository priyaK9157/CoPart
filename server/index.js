const express = require("express");
const app = express();
//db and cloudinary import
const { dbConnect } = require("./config/DbConnection");


var fileUpload = require('express-fileupload');
app.use(fileUpload());
// Routes
const Profile = require("./Routes/Profile");
const User = require("./Routes/User");
const Project = require('./Routes/Project');
const SavedAndRecentRoute = require("./Routes/SavedAndRecent");
const AlertRoute=require("./Routes/Alert")

const cors = require("cors");
const PORT = 4000;

// Middleware
app.use(express.json());

// Database Connection
dbConnect();


// Enable CORS middleware
app.use(cors({
  origin: "*",
}));

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// API Routes
app.use("/v1", User);
app.use("/v1", Profile);
app.use("/v1", Project);
app.use("/v1", SavedAndRecentRoute);
app.use("/v1",AlertRoute)

// Start the server
app.listen(PORT, () => {
  console.log(`Your server is up and running on port number ${PORT}`);
});
