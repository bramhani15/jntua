import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // name: String,
    // email: String
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;

