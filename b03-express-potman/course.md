# Bài 3 Express - potman

## I. Mục tiêu
 *  Thực hành Express (router và middleware)
 *  Thực hành restFUL và test api với potman
------
## II. Nội dung bài học 
### 1. Basic Router Express
- front end và backend giao tiếp vơi nhau như thế nào? [# link](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)
    - SSR: Server-Side Rendering - rendering a client-side or universal app to HTML on the server. => nodejs sử dụng HTML template để sử lý các logic hiển thị
    - CSR: Client-Side Rendering - rendering an app in a browser, generally using the DOM. => sử dụng api để lấy dữ liệu từ api
    - so sánh ? [# link](https://toidicodedao.com/2018/09/11/su-khac-biet-giua-server-side-rendering-va-client-side-rendering/)
    - api là gì ? 
        - An API is a set of programming code that enables data transmission between one software product and another. It also contains the terms of this data exchange.
        - => API là các phương thức, giao thức kết nối với các thư viện và ứng dụng khác nhau.
    - api thì có quy tắc chung để viết => RESTful
    
- Router express: 
    ```

    app.METHOD(PATH, HANDLER)

    ```
    - app is an instance of express.
    - METHOD is an HTTP request method, in lowercase. [http request](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
    - PATH is a path on the server.
    - HANDLER is the function executed when the route is matched.

- thực thành => sang code express-b3
### 2. Middleware express
- Tiền sử lý hoặc hậu sử lý request
- thực thành => sang code express-b3

### 3. Làm quen vs postman để test
- cài đặt và sử dụng postman
- làm quen và sử dụng các phương thức get post put delete patch

## III bài tập 
- thử và thực hành tất cả phương thức 
- viết api tương ứng với các method
- dùng postman test các phương thức post put delete path
- cài đặt và thử viết api dựa trên RESTful và dùng JSON file và fs để sử lý dữ liệu 
    *  Tạo mới danh sách user
    * Tìm kiếm và trã về theo id
    * Thêm mới user vào danh sách
    * Chỉnh sửa user
    * xoá 1 user khỏi danh sách

## bài tập về nhà 
- 1. tìm hiểu class trong js

- đăng ký và cài đặt mongoDB [#link](https://www.youtube.com/watch?v=KKyag6t98g8)