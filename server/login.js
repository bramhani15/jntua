
// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Admin Schema
// const AdminSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   role: {
//     type: String,
//     default: "admin",
//     enum: ["admin"],
//   },
// });
// const Admin = mongoose.model("Admin", AdminSchema);

// // User Schema
// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   role: {
//     type: String,
//     default: "user",
//     enum: ["user"],
//   },
// });
// const User = mongoose.model("User", UserSchema);

// // Middleware: Authenticate Token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

// // Middleware: Authenticate Role
// const authenticateRole = (requiredRole) => {
//   return (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
//       if (decoded.role !== requiredRole) {
//         return res.status(403).json({ message: "Access denied. Invalid role." });
//       }
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(403).json({ message: "Invalid or expired token." });
//     }
//   };
// };

// // ---------------------------- ROUTES ----------------------------

// // User Registration
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const existingUser = await User.findOne({ username });
//   if (existingUser) return res.status(400).json({ message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, password: hashedPassword });
//   await user.save();
//   res.json({ message: "User registered successfully" });
// });

// // Admin Registration
// app.post("/register-admin", async (req, res) => {
//   const { username, password } = req.body;
//   const existingAdmin = await Admin.findOne({ username });
//   if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const admin = new Admin({ username, password: hashedPassword });
//   await admin.save();
//   res.json({ message: "Admin registered successfully" });
// });

// // Login (User or Admin)
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   // First check Admin, then User
//   let user = await Admin.findOne({ username });
//   if (!user) {
//     user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "User not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET || "secretkey",

//     { expiresIn: "1h" }
//   );

//   res.json({ token, role: user.role });
// });

// // Protected route for user
// app.get("/user-page", authenticateToken, authenticateRole("user"), (req, res) => {
//   res.json({ message: "Welcome, user!", user: req.user });
// });

// // Protected route for admin
// app.get("/admin-page", authenticateToken, authenticateRole("admin"), (req, res) => {
//   res.json({ message: "Welcome, admin! Here's the user management panel.", user: req.user });
// });

// app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const JWT_SECRET = "myHardcodedSuperSecretKey"; // ✅ Fix: Use this instead of process.env

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "admin",
    enum: ["admin"],
  },
});
const Admin = mongoose.model("Admin", AdminSchema);

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
    enum: ["user"],
  },
});
const User = mongoose.model("User", UserSchema);

// Middleware: Authenticate Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Middleware: Authenticate Role
const authenticateRole = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied. Invalid role." });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  };
};

// ---------------------------- ROUTES ----------------------------

// User Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered successfully" });
});

// Admin Registration
app.post("/register-admin", async (req, res) => {
  const { username, password } = req.body;
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();
  res.json({ message: "Admin registered successfully" });
});


// Login (User or Admin)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // First check Admin, then User
  let user = await Admin.findOne({ username });
  if (!user) {
    user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, role: user.role });
});

// Protected route for user
app.get("/user-page", authenticateToken, authenticateRole("user"), (req, res) => {
  res.json({ message: "Welcome, user!", user: req.user });
});

// Protected route for admin
app.get("/admin-page", authenticateToken, authenticateRole("admin"), (req, res) => {
  res.json({ message: "Welcome, admin! Here's the user management panel.", user: req.user });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
