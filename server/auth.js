import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secret = "your_secret_key"; // use dotenv in production

// Dummy login route (for demo purpose)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Fake user validation
  if (email === "admin@example.com" && password === "admin123") {
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
