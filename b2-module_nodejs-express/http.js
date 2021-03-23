var http = require('http'); // 1 - Import Node.js core module

var server = http.createServer(function (req, res) {   // 2 - creating server
    // console.log(req, 'req')
    res.writeHead(200);
    res.end('Hello, World!');
    //handle incomming requests here..

});
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