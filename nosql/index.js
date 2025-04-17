// import express from "express";
// import mongoose from 'mongoose';
// import Test from './test.js';


// const app = express();

// const MONGO_URL="mongodb://127.0.0.1:27017/test"

// mongoose.connect(MONGO_URL)
 

// app.post('/register',async(req,res)=>{
//     const{name,age}=req.body;
//     const test=new Test({name,age});
//     await test.save();
//     res.json({name,age});

// })
// app.listen(3000,()=>{
//     console.log("app is running")
// })
import express from "express";
import mongoose from "mongoose";
import Test from "./test.js";

const app = express();
app.use(express.json()); // ✅ Middleware to parse JSON

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/register", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required" });
    }

    const test = new Test({ name, age });
    await test.save();
    res.json({ success: true, name, age });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/users", async (req, res) => {
    try {
      const users = await Test.find();
      res.json({ success: true, data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
app.put("/users/:id", async (req, res) => {
    try {
      const { name, age } = req.body;
      const updatedUser = await Test.findByIdAndUpdate(
        req.params.id,
        { name, age },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ success: true, data: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
      const deletedUser = await Test.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(3000, () => {
  console.log("App is running on port 3000");
});