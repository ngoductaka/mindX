const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');

// ORM of mongodb
const mongoose = require('mongoose');
const { Schema } = mongoose;

var app = express();

// config body-parser (parse body) req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// config cors 
app.use(cors())

// code logic

// mongodb connect
mongoose.connect('mongodb+srv://ngocduc:ngocduc@cluster0.6shagew.mongodb.net/?retryWrites=true&w=majority');

// mongodb config
// 7 primary value 

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    age: Number,
    email: String,
    note: String,
    birthDay: { type: Date, default: null },
});


const Student = mongoose.model('Student', StudentSchema);

// mongodb handle logic
const createUser = async (req, res) => {
    const newUser = req.body;
    const newStudent = new Student(newUser);
    // const newStudent = Student.create(newUser);
    await newStudent.save();
    res.status(201).send("create user success")
};

const getAllUser = async (req, res) => {
    const allUser = await Student.find(req.query);
    res.json(allUser);
};

const getUserById = async (req, res) => {
    const userFounded = await Student.findOne({ _id: req.params.userId });
    res.json(userFounded);
};

const updateUser = async (req, res) => {
    const userFounded = await Student.findOneAndUpdate({ _id: req.params.userId }, req.body);
    res.json(userFounded);
};
const deleteUserById = async (req, res) => {
    try {
        const result = await Student.findOneAndDelete({ _id: req.params.userId });
        console.log('result', result);
        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err)
    }
};

// router
app.post('/user', createUser)
app.get('/user', getAllUser)
app.get('/user/:userId', getUserById)
app.patch('/user/:userId', updateUser)
app.delete('/user/:userId', deleteUserById)

// 

const PORT = 3001;
app.listen(PORT, () => {
    console.log('app run on port ' + PORT)
})
