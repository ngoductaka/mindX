
var http = require('http'); // native => nodejs cung cấp 

//create a server object:
http.createServer(function (req, res) {
    // req => 

  res.write('<h1 style="color: red"> hello nodejs  </h1>'); //write a response to the client
  res.end(); //end the response


}).listen(8080); //the server object listens on port 8080
