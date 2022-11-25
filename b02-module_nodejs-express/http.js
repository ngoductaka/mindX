var http = require('http'); // 1 - Import Node.js core module
// var { createServer } = require('http');
var fs = require('fs'); // 1 - Import Node.js core module
const { method } = require('lodash');

var server = http.createServer(
    function (req, res) {   // 2 - creating server
        console.log(req.url, '===========req=========', req.method)
        res.writeHead(500);
    //     res.write(`
    // <h1 style="color: red">Chào mừng bạn đã đến với mindx nodejs</h1>
    //     `);
    //     res.end();

    // url

    // method
    
    // dữ liệu truyền lên 
    //  truyền trên đường dẫn
    // tuyền body

        fs.readFile('index.html', 'utf8', function (err, data) {
            if (err) throw err;
            // in ra nội dung đọc được
            res.write(data);
            //kết thúc response
            res.end();
        });

    }
);
// http.get((req, res) => {
//     console.log('-------')
// })


server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')


// 


// const https = require('https')
// const options = {
//   hostname: 'whatever.com',
//   port: 443,
//   path: '/todos',
//   method: 'GET'
// }

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.end()