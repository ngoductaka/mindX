const mongoose = require('mongoose');
const {getUserById} = require('./user_schema');

// schema 
const commentSchema = new mongoose.Schema({
    content: String,
    author: {
        type: mongoose.ObjectId, // type of author is ObjectId // mongoDB id 
        ref: 'User', // chỉ định rõ collection mà author tham chiếu đến
    },
    tags: {
        type: [String],
        default: ['student', 'good'],
    },
    likes: [{
        type: mongoose.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

const readAll = async (filter = {}) => {
    const data = await Comment.find(filter, 'author content')
    .populate('author', 'name age email')
    .skip(0)
    .limit(1);
    return data;
};

const create = async (data) => {
    // get user from body
    const {author, ...restData} = data;
    const dataSave = {
        ...restData,
        author: new mongoose.Types.ObjectId(author),
    }
    const result = await Comment.create(dataSave);
    return result;
}
const createUserModel = async (data) => {
    // get user from body
    const {author, ...restData} = data;

    const userFound = await getUserById(author);
    const dataSave = {
        ...restData,
        author: userFound,
    }
    const result = await Comment.create(dataSave);
    return result;
}

const update = async (id, data) => {
    const result = await Comment.updateOne({
        _id: id,
    }, data);

    return result;
}
const remove = async (id) => {
    const data = await Comment.deleteOne({_id: id});
    return data;
}

module.exports = {
    readAll,
    create,
    update,
    remove,
    createUserModel,
};

// populate 
// query 
// skip limit 