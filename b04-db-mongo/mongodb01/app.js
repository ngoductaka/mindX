// 
const express = require('express')
// khởi tạo server express
const app = express();

// setup body-parser 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// kết thúc setup body-parser 
// mongodb connect

// mongodb+srv://ngocduc:ngocduc@cluster0.uaymnyu.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose');

// mongoose ORM của database mongodb

// mongoDB database 

mongoose.connect('mongodb+srv://ngocduc:ngocduc@cluster0.uaymnyu.mongodb.net/mindx?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', error => console.log('error connect db', error))
mongoose.connection.once('open', () => console.log(`Connect to saving DB successfully!!!`))
// router
mongoose.set('strictQuery', true);
const ToySchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: {
            author: String,
            history: [
                {
                    time: Date,
                    note: String,
                }
            ]
        }
    }
);

const ToyModel = mongoose.model(
    'Toy', // tên collection
    ToySchema,
);
// 
// string 



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // 
            required: true,
            unique: [true, 'name is unique'],
        },
        age: {
            type: Number,
            required: [true, 'age is required?'],
            min: [0, 'Too few eggs'],
            max: 200
        },
        email: {
            type: String,
            validate: {
                // regex 
                validator: function (emailInput) {
                    const re =
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    return re.test(emailInput);
                },
                message: props => `${props.value} is not a valid email!`
            },
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        },
        toys: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Toy'
        }],
    }, {
    timestamps: true
}
);

const UserModel = mongoose.model(
    'User', // tên collection
    userSchema,
);

const handleRequest1 = (req, res, next) => {
    console.log('logging request ')
    next();
}
// C R U D
// 
// 01 read tim kiem 
// findOne => null | 1 object
// find => null | array


// 
const handleRequest2 = async (req, res, next) => {
    // req: obj save request
    // res: obj save response
    // 
    try {
        // const dataUser = await UserModel.find();
        const dataUser = await UserModel
            .aggregate([
                // {
                //     $match: { age: { $gte: 10 } }
                // },
                // {
                //     $project: {
                //         name: 1,
                //         email: 1,
                //     }
                // },
                {
                    $group: {
                        _id: "$email",
                        "count user have same name": { $sum: 1 },
                        info: { $push: { name: "$name", age: "$age" } }
                    }
                }
            ])

        // .find(
        //     {
        //         // name: {
        //         //     $regex: /duc/i,
        //         // },
        //         // age: {
        //         //     $gt: 10,
        //         //     $lt: 40
        //         // },

        //         $nor: [
        //             {
        //                 age: {
        //                     $gt: 10,
        //                     $lt: 40
        //                 }
        //             },
        //             {
        //                 name: {
        //                     $regex: /duc/i,
        //                 },
        //             }
        //         ]

        //     },  // query 
        //     '', // selector 
        // )
        // .skip(2)
        // .limit(2);
        // pagination với skip và limit
        res.json({
            msg: 'request success!',
            data: dataUser,
        })

    } catch (err) {

    }
};


// router 01 get list user 
app.get('/', handleRequest2);

app.get('/user/:userId', (req, res) => {
    console.log('ddddd')
    UserModel.findById(req.params.userId)
        // populate({ path: 'fans', select: 'name' }).
        .populate({
            path: 'toys',
            select: 'price name'
        })
        .then((data) => {
            res.json(data)
        })
});


// 02 create new
app.post('/', async (req, res) => {
    // 
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).send(err)
    }
})

// 03 update
// PUT replace
// path update 1 hoặch nhiều thuộc tính trong collection 

app.patch('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // cach 1 
        // const userUpdate = await UserModel.updateOne({ _id: userId }, req.body);

        // cach 2 
        const toyFind = await ToyModel.findById("639c6e4a523b46c4b3516c1e");
        console.log('toyFind._id', toyFind._id);

        const user = await UserModel.findOneAndUpdate({ _id: userId }, {
            ...req.body,
            $push: {
                toys: toyFind._id
            }
        });

        if (!user) {
            res.status(400).send('User not found');
        }
        //

        res.json(user);
    } catch (err) {
        console.log('err', err);
        res.send(err)
    }
})
// 04 delete 

app.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    await UserModel.deleteOne({ _id: userId })
    res.send('delete success')

})

app.get('/toy', async (req, res) => {
    const data = await ToyModel.find();
    res.json({ data })
})
app.post('/toy', async (req, res) => {
    const newToy = await ToyModel.create(req.body);
    res.send(newToy)
})
app.listen(
    5000, // port server lắng nghe
    (err) => {
        if (err) {
            console.log(err);
            return 0;
        }
        console.log("run server on post " + 5000)
    }
)
