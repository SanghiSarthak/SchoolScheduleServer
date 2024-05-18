const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//     name: { type: String, required: true, unique: true },
//     schedule: {
//         type: {
//             monday: {
//                 type: {
//                     subject: String,
//                     time: { type: String, required: true }
//                 }
//             },
//             tuesday: {
//                 type: {
//                     subject: String,
//                     time: { type: String, required: true }
//                 }
//             },
//             wednesday: {
//                 type: {
//                     subject: String,
//                     time: { type: String, required: true }
//                 }
//             },
//             thursday: {
//                 type: { subject: String, time: { type: String, required: true } }
//             },
//             friday: { type: { subject: String, time: { type: String, required: true } } },
//             // You can add more days as needed
//         },
//         required: true
//     }
// });

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    schedule: {
        type: Schema.Types.Mixed,
        required: true
    }
});




const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher ;
