
var fs = require('fs');
const path = require('path');
// <!-- write -->

fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
});

// <!-- read -->
fs.readFile(path.resolve(__dirname, 'helloworld.txt'), 'utf8', (err, data) => {
    console.log(err);
    console.log(data)
})

// <!-- update -->

fs.appendFile('helloworld.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

// <!-- rename -->

fs.rename('helloworld.txt', 'myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
});
// delete 

fs.unlink('myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});