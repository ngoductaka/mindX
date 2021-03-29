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
- fs, path
    * The fs module of Node.js provides useful functions to interact with the file system
    ```

    var fs = require('fs');
    const path = require('path');
    fs.readFile(path.resolve(__dirname, 'course.md'), 'utf8', (err, data) => {
        console.log(err) ;
        console.log(data)
    })


    ```

- event emitter (option - btvn tìm hiểu và viết demo buổi sau demo và thuyết trình)

### 2. Giới thiệu Express framework
- Express có gì
- có framework nào khác?
    - cung cấp các phương thức để viết chương trình
    - express cũng cấp: Routing, middleware, static file
- Framework là gì? Mô hình MVC.
    - Mô hình mcv là quy ước viết chương trình. Theo đó, các việc xử lý request, hiển thị dữ liệu , xử lý dữ liệu phải tách bạch ra theo quy định.
    - M : model, xử lý các method liên quan đến dữ liệu
    - V: View , giao diện người dùng
    - C: controller xử lý logic app
- Luồng chạy cơ bản của MVC vào Express

### 3. First Project with Express
- Tạo dự án
- Router Express và resfull
- cấu trúc thư mục
- => code mẫu trong express-first