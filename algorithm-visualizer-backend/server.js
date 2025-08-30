// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const codeRoutes = require("./routes/codeRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // API routes
// app.use("/api/code", codeRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require("express");
const cors = require("cors");
require("dotenv").config();

const codeRoutes = require("./routes/codeRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/code", codeRoutes);

// Health check
app.get("/", (req, res) => res.send("Judge0 Backend API Running ✅"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
app.use(express.json({ limit: '2mb' }));








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




