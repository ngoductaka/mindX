# Bài 1 - Tổng quan khoá học, giới thiệu nodejs

## I. Mục tiêu

 *  Giúp học viên nắm tổng quan chương trình học.

 * [Tổng quan nodejs, kiến trúc nodejs ...](###1._NodeJS)
------
## II. Nội dung bài học 

### 1. Tổng quan khoá học 
#### 1.1 Backend nodejs – Express and Mongo - mongoose:
- 9-11 buổi 
- Hiểu nodejs cấu trúc, khả năng
- Module quang trọng của nodejs
- Dùng Express để làm dư án
- Kết học nodejs và mongo
- Project nhóm và thuyết trình
- [Roadmap](https://github.com/aliyr/Nodejs-Developer-Roadmap/blob/master/ReadMe.md)

#### 1.2 Front-end React-JS
- 9-10 buổi
- Viết web bằng react
- Sử dụng redux-saga
- Tích hợp api
- Sử dụng thư viện UI (antd/ material design)
- [Roadmap](https://github.com/adam-golab/react-developer-roadmap)

### 2. NodeJS

#### 2.1 Tổng quan kiến trúc nodejs

- Tổng quan server-client (backend - fontend): 
    *  frontend là phần tương tác với người dùng là phần người dùng nhìn thấy và tương tác: giao diện web, app.

    * Back-end cũng là một phần mềm, có chức năng hồi đáp những yêu cầu từ Front-end .Thường xử lý lưu trữ dữ liệu và logic nghiệp vụ.

    * [# theo wiki](https://en.wikipedia.org/wiki/Front_end_and_back_end)

- Nodejs là gì? vì sao ra đời, khả năng nodejs 

    * [# nodejs?](https://nodejs.org/en/) Runtime environment built on Chrome's V8 JavaScript engine.
    * Trước khi nodejs ra đời js chạy chủ yếu trên browser (F12 trên browser)
    ```
        1 + 1
    ```
    * [# JavaScript engine ?](https://www.youtube.com/watch?v=p-iiEDtpy6I
) A JavaScript engine is a computer program that executes JavaScript (JS) code
        * Tại sao là v8?
        * SpiderMonkey  <=> Firefox
        * Nitro <=> Safari
        * Chakra <=> Internet Explorer 

    * Chốt:  ````JavaScript to run without browser → NodeJS ````
    * [# kiến trúc](https://blog.usejournal.com/nodejs-architecture-concurrency-model-f71da5f53d1d
)
    * [# Eventloop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
    
- Chạy thử nodejs 
    - Command line interface (CLI) trên máy tính
    ```
        # cmd / terminal
        node
        > 1 + 1
        2
    ```
    - Dùng nodejs đọc và thực thi file js
    ```
    # index.js
    const a = 1;
    const b = 2;
    console.log(a+b);
    # cmd
    node index.js
    ```
- NPM, module, export and require
    - Module là gì ? 
        * Core Modules
        * Local Modules
        * Third Party Modules
    - npm là gì?
        * node package manger 
        * quản lý package của nodejs
        * quản lý bằng cách nào ?
    - cấu trúc thư mục
        * package.json/package-log.json
        * node_modules
        * devDependencies
        * dependencies
    - khởi tạo chương nodejs với npm
        ``` 
        npm init 

        npm i module_name
        npm install module_name
        npm uninstall module_name
        ```

-------
## III Tổng kết
- nodejs là Runtime environment built on Chrome's V8 JavaScript engine.
    -  => là môi trường để viết js trên máy tính (máy server/ server side)
    - => học sử dụng các module mà nodejs cung cấp để viết backeng (tác vụ server)
- Event loop của nodejs hoạt động ntn
    - cơ chế hoạt động của đơn luồng/ bất đồng bộ / non-bloking io
- npm là gì và cách sử dụng, cấu trúc package.json
