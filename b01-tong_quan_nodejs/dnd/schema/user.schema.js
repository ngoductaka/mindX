
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
        // index: { unique: true, sparse: true }
    }, // String is shorthand for {type: String}
    password: String,
    email: String,
    note: String,
    birthday: { type: Date, default: null },
    phone: String,
    address: String,
    role: { type: String, default: 'user' },
}, {
    timestamps: true,
});

// ORM
const User = mongoose.model('User', UserSchema);
module.exports = User;