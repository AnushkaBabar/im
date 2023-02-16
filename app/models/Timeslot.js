const mongoose = require('mongoose');

const theoryTimeslots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    // ...
];

const laboratoryTimeslots = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    // ...
];

const conferenceTimeslots = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    // ...
];

const timeslotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    classroom: {
        type: String,
        required: true
    },
    timeslot: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: null
    },
    type: {
        type: String,
        required: true,
        enum: ['theory', 'laboratory', 'conference']
    }
});

const Timeslot = mongoose.model('Timeslot', timeslotSchema);

module.exports = {
    Timeslot,
    theoryTimeslots,
    laboratoryTimeslots,
    conferenceTimeslots,
}
