var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (
    req,  // obj chứa thông tin request của client (chorme) mobile // url, method, header, body, params, query, ...
    res  // obj chứa thông tin response của server
    ) {

    // req: chứa thông tin request của client (chorme) mobile 

    // (path/url,  method, header, body, params, query, ...)

    // console.log('req.url:', req.url);
    // console.log('req.method:', req.method);

    // res: response của server
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<h1 style="color: red">hello nodejs server</h1>');
    // return res.end();
    if (req.url === '/user') {
        fs.promises.readFile('./facebook.html').then((data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        })
    } else if (req.url === '/404') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1 style="color: red">404 not found</h1>');
        return res.end();
    } else {
        var filePath = path.join(__dirname, 'dnd.jpeg');
        var stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': stat.size
        });
        var readStream = fs.createReadStream(filePath);
        // We replaced all the event handlers with a simple call to readStream.pipe()
        readStream.pipe(res);

    }

}).listen(8080);

// bản tin được gửi bởi giao thức http
// http
// 1. url // path (đường dẫn ) địa chỉ trên trình duyệt
// eg: https://en.wikipedia.org/wiki/HTTP
// 2. method // phương thức 
//    get
//    post
//    put
//    patch
//    delete

// express + middleware