const express = require("express");
const app = express();
const cors = require("cors");

// Import Routes
const authRoute = require('./Routes/authRoute');
const friendManagementRoute = require('./Routes/friendManagement');
const friendRequestRoute = require('./Routes/friendRequest');
const profileManagementRoute = require('./Routes/profileManagement');
const recommendationRoute = require('./Routes/recommendation');
const userManagementRoute = require('./Routes/userManagement');

// Database Connection
const dbConnect = require("./config/database");
dbConnect.connect();

// Middleware
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this specific origin
    credentials: true, // Allow cookies and authentication headers
  })
);
// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileManagementRoute);
app.use("/api/v1/friend-request", friendRequestRoute);
app.use("/api/v1/friend-management", friendManagementRoute);
app.use("/api/v1/friend-recommendation", recommendationRoute);
app.use("/api/v1/user", userManagementRoute);

// Root Route
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running...",
	});
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`APP is running on port ${PORT}`);
});
