# Bài 2 - Module nodejs và Express framework

## I. Mục tiêu
 *  Tìm hiểu các module nodejs
 *  Giới thiệu Express
 *  Khởi tạo và chạy dự án đầu tiên với Express
 *  Tìm hiểu các module cần thiết để chạy dự án
------

## 1. nodejs module
- http
    * Giao thức mạng (Internet Protocol)? [#link ](https://www.totolink.vn/article/137-14-giao-thuc-mang-pho-bien-ma-ban-nen-biet.html)
    * http là gì [#link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
    * http method [#link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
    * module provides an HTTP client/server implementation, 
    ```
    var http = require('http'); // 1 - Import Node.js core module

    var server = http.createServer(function (req, res) {   // 2 - creating server

        //handle incomming requests here..

    });

    server.listen(5000); //3 - listen for any incoming requests

    console.log('Node.js web server at port 5000 is running..')
    ```
- fs (write, read, update, delete, rename ), path
    * The fs module of Node.js provides usefull functions to interact with the file system 
    * chạy chương trình ở file ` fs.js `
    

- event emitter (option - btvn tìm hiểu và viết demo buổi sau demo và thuyết trình) => module hay nhưng dự án thật khá ít dùng

### 2. Giới thiệu Express framework
- Express có gì
- có framework nào khác?
    - Cung cấp các phương thức để viết chương trình backend. Express cũng cấp: Routing, middleware, static file ...
- Framework là gì? Mô hình MVC.
    - Mô hình mcv là quy ước viết chương trình. Theo đó, các việc xử lý request, hiển thị dữ liệu , xử lý dữ liệu phải tách bạch ra theo quy định.
    - M: Model, xử lý các method liên quan đến dữ liệu
    - V: View , giao diện người dùng. Nodejs có 1 vài template engines (Template engine helps us to create an HTML template with minimal code) như pug, Mustache, EJS
        - 1 vài template engines [# link](https://colorlib.com/wp/top-templating-engines-for-javascript/)
    - C: controller xử lý logic app

- Luồng chạy cơ bản của MVC vào Express
    - Router nhận diện và phân luồng các request theo method. Trong router có middleware để tiền sử lý hoặc hậu sử lý các request
    - Router chia các request đến từng Controller
    - Controler xử lý logic gọi đến model để lấy dữ liệu ra để sử lý theo yêu cầu của client

### 3. First Project with Express
- Tạo dự án với npm: 
    ```
    npm init
    ...
    name: (project-name) project-name
    version: (0.0.0) 0.0.1
    description: The Project Description
    entry point: //leave empty
    test command: //leave empty
    git repository: //the repositories url
    keywords: //leave empty
    author: // your name
    license: N/A

    ...
    ...

    npm install express --save
    ```

- Router Express và RESTful API [#RESTful](https://www.redhat.com/en/topics/api/what-is-a-rest-api)
- [RESTful](https://www.restapitutorial.com/lessons/httpmethods.html#:~:text=The%20primary%20or%20most%2Dcommonly,or%20CRUD)%20operations%2C%20respectively.)
- Cấu trúc thư mục (Phụ thuộc vào SA và dự án)
- => code mẫu trong express-first

## Bài tập về nhà
- 1. chuẩn bị và thảo luận về callback - promise - async/await