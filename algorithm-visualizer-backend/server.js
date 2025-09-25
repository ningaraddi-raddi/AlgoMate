
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
require("dotenv").config();

// Existing routes for recursion logic
const codeRoutes = require("./routes/codeRoutes");

// New route for linked list logic
const linkedListRoutes = require("./routes/linkedListRoutes");

const app = express();

// Middleware
 const allowedOrigins = [
  "http://localhost:3000",                     // local React
  "https://algomate-frontend.onrender.com"     // deployed React
];
   

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: '2mb' })); // Use this one with the size limit

// API routes
app.use("/api/code", codeRoutes);
app.use("/api/linked-list", linkedListRoutes); // Add this line for the linked list routes

// Health check
app.get("/", (req, res) => res.send("Judge0 Backend API Running ✅"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth'); // we'll create this
require('./config/passport'); // passport strategy (google)


app.use(express.json());
app.use(cookieParser());

// allow frontend origin + credentials (if you use cookies)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(passport.initialize());
app.use('/auth', authRoutes);

// a sample protected test route can be added later


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });
