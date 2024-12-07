**Cách cài đặt và sử dụng**

**Yêu cầu**

1. [NodeJS](https://nodejs.org/en)
2. [MySQL](https://www.mysql.com/downloads/)
3. [Postman](https://www.postman.com/downloads/)
4. [Mailtrap](https://mailtrap.io/?gad_source=1&gclid=Cj0KCQiA3sq6BhD2ARIsAJ8MRwUYpi7g5jgGtM3y8ZYnm3Mh5bm7mHaGiiMteI6c_nWkkLXi0msbKH4aAg7YEALw_wcB)
**Cài đặt khi clone về lần đầu tiên**

1. Tại thư mục dự án ngang hàng với index.js tạo file .env giống như file .env.example và điền mật khẩu mysql của bản thân mình, ví dụ mật khẩu là abc thì điền DB_PASS= 'abc'
2. Tại terminal chạy `npm i` để tải các thư viện cần thiết
3. Sau đó chạy câu lệnh `npx sequelize-cli db:create` tại terminal -> khi đó kiểm tra xem database 'Ryoshi' đã được tạo thành công hay chưa
4. Sau đó chạy câu lệnh `npm start` -> kết nối thành công sẽ hiện thông báo như sau:
   ![chạy backend thành công](./assets/images/image.png)

**Cài đặt khi pull code mới về**

1. Chạy câu lệnh `npm i`
2. Kiểm tra xem file .env.example có gì mới không để thêm các biến môi trường vào file .env của mình
3. Chạy câu lệnh `npx sequelize-cli db:migrate`
4. Chạy câu lệnh `npx sequelize-cli db:seed:all`
5. Cuối cùng chạy câu lệnh `npm start`

**_Lưu ý_**: [_API document_](https://docs.google.com/spreadsheets/d/1DkvYI1EZwvPHHNbl2gbfGzGe2ddmIsBm_18Zd_eCQAE/edit?usp=sharing),
[_Postman Team: ấn vào link và tham gia nhóm postman chứa sẵn các resquest để test api_](https://app.getpostman.com/join-team?invite_code=9ac6453735bd6d66302857a3f31c9826&target_code=c8ea2d5ddc1ec913ce4a56088703e3bc)



** Cài đặt để sử dụng phần quên mật khẩu**
1. Tạo tài khoản trong mail trap
2. Vào phần Email Testing tạo project
   ![image](https://github.com/user-attachments/assets/b39fd695-ba60-4d33-b2df-382cdbec2105)
3. Trong phần .env.example có 2 phần email_user, email_pass thì thay bằng phần user và pass theo như ảnh
   ![image](https://github.com/user-attachments/assets/02769c1f-1ea9-4bb4-a735-d9ce381cc49f)
** Lưu ý: Sửa thời gian chính xác ở mail trap để thời gian hết hạn của otp được lưu chính xác trong db**
** Không bật xác thực 2 lớp**
