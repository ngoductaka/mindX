
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    password: String,
    email: String,
    note: String,
    birthday: { type: Date, default: null },
}, {
    timestamps: true,
});

// ORM
const User = mongoose.model('User', UserSchema);
module.exports = User;