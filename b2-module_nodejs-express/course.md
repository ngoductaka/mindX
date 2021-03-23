# Bài 2 - Module nodejs và Express framework

## I. Mục tiêu
 *  Tìm hiểu các module nodejs
 *  Giới thiệu Express
 *  Khởi tạo và chạy dự án đầu tiên với Express
 *  Tìm hiểu các module cần thiết để chạy dự án
------

## 1. nodejs module
- http
    * module provides an HTTP client/server implementation
    ```
    var http = require('http'); // 1 - Import Node.js core module

    var server = http.createServer(function (req, res) {   // 2 - creating server

        //handle incomming requests here..

    });

    server.listen(5000); //3 - listen for any incoming requests

    console.log('Node.js web server at port 5000 is running..')
    ```
- fs
    * The fs module of Node.js provides useful functions to interact with the file system
    ```
    const fs = require('fs')

    ```
- path

- http / https
- event emitter (option - btvn tìm hiểu và viết demo buổi sau demo và thuyết trình)

### 2. Giới thiệu Express framework
- Express có gì
- có framework nào khác?
    - khung chương trình
    - cung cấp phương thức để viết chương trình
- Framework là gì? Mô hình MVC.
- Luồng chạy cơ bản của MVC vào Express

### 3. First Project with Express
- Tạo dự án
- Router Express 
- Middleware là gì 
- static file
- cấu trúc thư mục