// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const incomeRoutes = require("./routes/incomeRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

// const app = express();

// connectDB();

// // CORS
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://finance-expense-beta.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// }));

// app.options("*", cors());

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Root
// app.get("/", (req, res) => {
//   res.json({ message: "Server is live!" });
// });

// // Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);

// // Static
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 404
// app.use((req, res) => {
//   res.status(404).json({ message: "Route Not Found" });
// });

// // Export for Vercel
// module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();


// ================= MIDDLEWARE =================

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());


// ================= DATABASE =================
connectDB();


// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("Server is live!")
});


// ================= API ROUTES =================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// ================= STATIC FOLDER =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found ❌",
  });
});


// ================= SERVER LISTEN =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

