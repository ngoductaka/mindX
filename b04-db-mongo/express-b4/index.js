const express = require('express');
const router = require('./router');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ngocduc:ngocduc@cluster0.ihxnv.mongodb.net/sample_analytics?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    console.log('err', err)
    const collection = client.db("sample_analytics").collection("accounts");
// sample_analytics.accounts
    collection.find({}).toArray(function(err, docs) {
        console.log('Found the following records');
        console.log(docs);
      });

    // perform actions on the collection object
    client.close();
});



const app = express()
// https://runkit.com/
const port = 3000
app.use(express.static('anh'))

app.use('/', router)

//  các method trên http


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})