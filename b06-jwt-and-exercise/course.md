# Bài 6 - JWT và thực hành

## I. Mục tiêu

 *  Giới thiệu JWT 
 *  Cách sử dụng JWT vào project
 *  Thực hành api login
------
## II. Nội dung bài học 
### 1. JWT là gì
- JSON Web Token (JWT) is an open standard (RFC 7519).
    - Đơn giản là 1 chuẩn  để mã hóa json thành string để trao đổi giữa slient và server
    - JWT nhỏ gọn định nghĩa cách thức truyền tin an toàn giữa các thành viên bằng một đối tượng JSON. Thông tin này có thể xác thực và đánh dấu tin cậy nhờ vào “chữ ký” của nó. Phần chữ ký này được mã hóa lại bằng HMAC hoặc RSA.

* Cấu trúc JWT Gồm 3 thành phần: Header, Payload, Signature được tách tách biệt bởi dấu chấm
    - Header bao gồm hai phần chính: loại token và thuật toán đã dùng để mã hóa. Trong đó loại token có thể mặc định là JWT, một loại thông tin mà cho biết đoạn mã là một token JWT. Thuật toán có thể là HMAC SHA256 – HS256 hoặc RSA.

    - Payload chứa các “Claims”. Claims là một khối thông tin về muốn đặt trong chuỗi.

    - Singnature là chữ ký trong JWT hay một chuỗi đã được được mã hóa bởi header, payload cùng với một chuỗi bí mật  theo nguyên tắc sau: 

    ```
    data = base64urlEncode( header ) + "." + base64urlEncode( payload )
    signature = Hash( data, secret );
    ```

    - base64UrlEncoder : thuật toán mã hóa header và payload

### 2. cách hoạt động của JWT:

1. Người dùng (user) sử dụng trình duyệt đăng nhập vào một miền nào đó mà yêu cầu đăng nhập với tên đăng nhập và mật khẩu.

2. Máy chủ sẽ nhận được yêu cầu của người dùng, đồng thời kiểm tra thông tin tên đăng nhập và mật khẩu.

3. Máy chủ sau khi kiểm tra thông tin người dùng, nếu đúng sẽ trả một JWT về cho người dùng, nếu không quay lại bước 1.

4. Login thành công, => người dùng sẽ sử dụng mã JWT để tiếp tục sử dụng cho các yêu cầu kế tiếp trên miền của máy chủ.

5. Máy chủ sẽ không cần phải kiểm tra lại thông tin người dùng mà chỉ cần kiểm tra đúng JWT đã được cấp (chứa thông tin mã hóa) từ đó tăng tốc độ sử dụng trên miền giảm thời gian truy vấn.

6. Máy chủ trả phản hồi cho người dùng

### 3. Thực hành 
- Từ luồng hoạt động bên trên ứng dụng trong dự án
- Sử dụng middware để xác thực request 
- Link tham khảo
 - https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api
 - https://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api

## III bài tập 
- Tạo api login
- sử dụng jwt để author
- tự dựng 1 cấu trúc dữ liệu để quản lý user 
- mỗi nhóm chọn 1 dự án để thự hiện trong buổi 5 
- --------
-  Mỗi nhóm tự phân công công việc làm trong dự án ( bắt buộc chia rõ nhiệm vụ từng thành viên) thứ 7-cn làm việc
-  thực hành và review chéo team 1-3 thành viên (recomment 2 người)
    - 1. Login và jwt (bắt buộc)
    - 2. chức năng khác (tuỳ định hướng nhóm)
    - 3. các dự án mẫu 
        - quản lý sách thư viện
        - quản lý bán hàng
        - quản lý nhân viên trong doanh nghiệp

