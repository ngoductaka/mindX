const mongoose = require('mongoose');

// user model
// schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
    }, // key: type value 
    age: Number,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user',
    },
    avatar: String,
}, {
    timestamps: true,
    // collection: 'users',
});

const User = mongoose.model('User', userSchema);
// createUser

const readAll = async (filter = {}) => {
    const users = await User.find(filter, 'name age role').lean();
    return users;
};


const createUser = async (data) => {
    const user = await User.create(data);
    return user;
}

const updateUser = async (id, data) => {
    const user = await User.updateOne({
        _id: id,
    }, data);

    return user;
}
const deleteUser = async (id) => {
    const user = await User.deleteOne({_id: id});
    return user;
}

module.exports = {
    readAll,
    createUser,
    updateUser,
    deleteUser,
};

// CURD 
// Read : 

// populate () => join collection

// agrregate ()

// index 

// transaction 

// virtual


