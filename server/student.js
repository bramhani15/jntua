// import mongoose from 'mongoose';

// mongoose.Schema({
//     name:  {
//         type: String,
//         required: true,
//     },
//     class: {
//         type:String,
//         required:true,
//     },
//     rollno: {
//         type: Number,
//         required:true,
//     }
// }),{timestamps:true}
// const Student = mongoose.mode('student',studentschema);
// export default Student;
import mongoose from 'mongoose';

// Define the schema and store it in a variable
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,  // Ensure consistent spacing
        required: true,
    },
    rollNo: {
        type: Number,
        required: true,
    }
}, { timestamps: true });  // ✅ Place timestamps correctly

// Create a model using the schema
const Student = mongoose.model('Student', studentSchema);  // ✅ Corrected method

export default Student;  // ✅ Export the model properly
