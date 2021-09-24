var jwt = require('jsonwebtoken');


var create_token = (data = { foo: 'bar' }) => jwt.sign(data, 'shhhhh');
var create_token = (data = { foo: 'bar' }) => jwt.sign(data, 'shhhhh');