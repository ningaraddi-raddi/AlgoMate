
// // server.js
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // Existing routes for recursion logic
// const codeRoutes = require("./routes/codeRoutes");

// // New route for linked list logic
// const linkedListRoutes = require("./routes/linkedListRoutes");

// const app = express();

// // Middleware
//  const allowedOrigins = [
//   "http://localhost:3000",                     // local React
//   "https://algomate-frontend.onrender.com"     // deployed React
// ];
   

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json({ limit: '2mb' })); // Use this one with the size limit

// // API routes
// app.use("/api/code", codeRoutes);
// app.use("/api/linked-list", linkedListRoutes); // Add this line for the linked list routes

// // Health check
// app.get("/", (req, res) => res.send("Judge0 Backend API Running ✅"));

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require("dotenv").config();

const codeRoutes = require("./routes/codeRoutes");
const linkedListRoutes = require("./routes/linkedListRoutes");
const authRoutes = require('./routes/auth');
require('./config/passport'); // Google OAuth

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
const allowedOrigins = [
  "http://localhost:3000",                     // local React
  "https://algomate-frontend.onrender.com"     // deployed React
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(passport.initialize());

// ===== Routes =====
app.use("/api/code", codeRoutes);
app.use("/api/linked-list", linkedListRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => res.send("Backend API Running ✅"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ===== Connect to MongoDB and start server =====
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });




