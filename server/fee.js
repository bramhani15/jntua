// import mongoose from'mongoose';
// const mongooseschema = new mongoose.schema({
//     student:{
//         type:mongooseschema.Types.objectId,
//         required: true,
//         ref:'Student'

//     },
//     amount:{
//         type:Number,
//         required:true
//     },
//     date:{
//         type: date,
//         required:true
//     }

// })
// export default fees;
import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,  // ✅ Corrected reference
        required: true,
        ref: 'student'
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,  // ✅ Fixed incorrect `date` type
        required: true
    }
});

// Create a model
const Fee = mongoose.model('Fee', feeSchema);

export default Fee;  // ✅ Corrected export
