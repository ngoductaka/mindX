const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

function connect() {
    // const cc = 'mongodb+srv://huy-agv-dev:yg5zJKsPfiV5mOa8@cluster0.75nbn.mongodb.net/agv-db-dev?retryWrites=true&w=majority'
    // const mongoUrl = `mongodb+srv://ngocduc:ngocduc@cluster0.ihxnv.mongodb.net/sample_mflix?retryWrites=true&w=majority`
    const mongoUrl = 'mongodb+srv://ngocduc:ngocduc@cluster0.ihxnv.mongodb.net/sample_mflix?retryWrites=true&w=majority'
    // mongoose.connect(cc, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    // console.log(process.env.DB_HOST, '--')
    // mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })

    console.log("Connect mongodb database!")
    mongoose.connection.on('error', error => console.log('error connect db', error))
    mongoose.connection.once('open', () => console.log(`Connect to saving DB successfully!!!`))
}

module.exports = { connect }