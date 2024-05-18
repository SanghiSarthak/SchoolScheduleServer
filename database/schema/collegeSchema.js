const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const collegeSchema = new Schema({
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

const collegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    schedule: {
        type: Schema.Types.Mixed,
        required: true
    },
    teachers : {
        type: Schema.Types.Mixed
    }
});




const College = mongoose.model('College', collegeSchema);

module.exports = College;
