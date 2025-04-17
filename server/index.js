// import express from 'express';
// import mongoose from 'mongoose';
// import student from './student.js';
// import fee from './fee.js';
// App.use(express.json())
// mongoose.connect("mongodb://127.0.0.1:27017")
// .then (() => {
//     console.log("mongodb is connected ")
// })
// .catch(() => {
//     console.log("connection not successful")
// })
// App.get('/home',(req,res) => {
//     res.send('Hello World');
// })

// App.post('/student', async (req, res) => {
//     try {
//     const { name,class:classId,rollNo} = req.body
//     const newStudent = new student({name,class:classId,rollNo})
//     await newStudent.save()
//     res.send('Student created successfully')
//     }
//     catch {
//         console.log("Internal server error")
//     }
// })
// App.post('/fee',async (req,res) => {
//     try {
//     const { student ,amount,date} = req.body
//     const newFee = new fee({
//         student,
//         amount,
//         date
//     })
//     await newFee.save()
//     res.send('Fee Document is created successfully')
//     }
//     catch {
//         console.log("Internal server error")
//     }
// })
// App.get('/student/:id',async (req,res) => {
//     try{
//         const studentId = req.params.id
//         const Student = await fee.find({student:studentId})
//         res.send(Student)
//     }
//     catch{
//         console.log("Internal server error")
//     }
// })
//  App.listen(3000, () => {
//     console.log("Server is running");
//  })
import express from 'express';
import mongoose from 'mongoose';
import Student from './student.js';  // ✅ Capitalized Model Names
import Fee from './fee.js';  // ✅ Capitalized Model Names

const app = express();  // ✅ Use lowercase `app`

app.use(express.json());  // ✅ Fix `app.use()`

mongoose.connect("mongodb://127.0.0.1:27017/test")  // ✅ Specify a database name
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch(() => {
        console.log("Connection not successful");
    });

// Route to check server
app.get('/Dashboard', (req, res) => {
    res.send('Hello World');
});

// Create Student
app.post('/student', async (req, res) => {

        const { name, class: classId, rollNo } = req.body;
        const newStudent = new Student({ 
            name, class: classId, rollNo 
        });  // ✅ Corrected `Student`
        await newStudent.save();
        res.send('Student created successfully');
   
        console.log("Internal server error");
});
// update student
app.put('/student/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { name, class: classId, rollNo } = req.body;
        await Student.findByIdAndUpdate(studentId, { name, class: classId, rollNo });
        res.send('Student updated successfully');
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
});
// delete student
app.delete('/student/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        await Student.findByIdAndDelete(studentId);
        res.send('Student deleted successfully');
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
});

// Create Fee
app.post('/fee', async (req, res) => {
    try {
        const { student, amount, date } = req.body;
        const newFee = new fee({ student, amount, date });  // ✅ Corrected `Fee`
        await newFee.save();
        res.send('Fee Document is created successfully');
    } catch {
        console.error("Internal server error:", error);
        
    }   
});

// Get Fees by Student ID
app.get('/student/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentFees = await Fee.find({ student: studentId });  // ✅ Find fees by student ID
        res.send(studentFees);
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
});


// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
