const mongoose = require('mongoose');
function connect() {
    const dnd = `mongodb+srv://ngocduc:ngocduc@cluster0.ihxnv.mongodb.net/rn26?retryWrites=true&w=majority`
    mongoose.connect(dnd, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Connect mongodb database!")
    mongoose.connection.on('error', error => console.log('error connect db', error))
    mongoose.connection.once('open', () => console.log(`Connect to saving DB successfully!!!`))
}

module.exports = { connect }