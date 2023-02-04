const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TeacherSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

TeacherSchema.pre("save", async (next) => {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password);
    next();
});

module.exports = mongoose.model("Teacher", TeacherSchema);