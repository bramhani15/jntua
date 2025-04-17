// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// app.use(cors()); // Allow React to access API

// // ✅ Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ MongoDB Connection Failed", err));

// // ✅ User Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// // ✅ Create User Model
// const User = mongoose.model("User", userSchema);

// // ✅ GET (Fetch Users)
// app.get("/user", async (req, res) => {
//   try {
//     const users = await User.find(); // Use the User model to find users
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching users" });
//   }
// });

// // ✅ POST (Add User)
// app.post("/user", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const newUser = new User({ name, email }); // Use the User model to create a new user
//     await newUser.save();
//     res.json({ message: "User Created Successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating user" });
//   }
// });

// // ✅ PUT (Update User)
// app.put("/user/:id", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     await User.findByIdAndUpdate(req.params.id, { name, email }); // Use the User model to update user
//     res.json({ message: "User Updated Successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating user" });
//   }
// });

// // ✅ DELETE (Remove User)
// app.delete("/user/:id", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id); // Use the User model to delete a user
//     res.json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting user" });
//   }
// });

// // ✅ Start Server
// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";



app.use("/api", authRoutes);
const app=express();
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mydb")
.then(()=>{
    console.log("mongodb is connected")
})
.catch(()=>{
    console.log("connection not successful")
})

// ✅ Define schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    // age: Number,
  });
  
  const User = mongoose.model('User', userSchema);

app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST (Create new user)
app.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// DELETE user
app.delete('/user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE user
app.put('/user/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(5000,()=>{
    console.log("server is running")
})