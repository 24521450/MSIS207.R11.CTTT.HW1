# Quy tắc dự án HW1

## Công nghệ và cấu trúc

- Chỉ dùng HTML5, CSS và JavaScript thuần. Không thêm framework, thư viện, package bên thứ ba hoặc CDN.
- HTML phải có ngữ nghĩa và dùng landmark phù hợp. Không dùng phần tử `div`; dùng cấu trúc như `header`, `nav`, `main`, `section`, `article`, `footer`, `form`, `fieldset`, `label`, `p` và danh sách khi thích hợp.
- Mỗi trang có một `h1`, thứ bậc heading có ý nghĩa, `lang="vi"` và skip-link tới nội dung chính.
- CSS đặt trong tệp riêng; JavaScript đặt trong tệp riêng. Không dùng inline event handlers như `onclick` và không gắn mã JavaScript vào thuộc tính HTML.
- Lưu ảnh và tài nguyên trong repo, tham chiếu bằng đường dẫn tương đối để trang chạy được dưới đường dẫn con.

## CSS và bố cục

- Khai báo màu, kiểu chữ và giá trị giao diện dùng chung bằng CSS custom properties; màu giao diện phải tham chiếu token thay vì rải giá trị màu trực tiếp.
- Viết CSS theo hướng mobile-first, hỗ trợ từ chiều rộng 375px. Dùng Flexbox cho điều hướng và Grid cho kỹ năng, dự án.
- Không tạo tràn ngang ở 375px, 768px và 1440px. Nội dung dài, liên kết và nhãn phải xuống dòng an toàn.
- Focus bàn phím phải nhìn thấy rõ; kiểm tra độ tương phản chữ thường tối thiểu 4.5:1 cho theme sáng và tối.

## JavaScript và biểu mẫu

- Tách xử lý theo chức năng, dùng `addEventListener`; không dùng thuộc tính xử lý sự kiện inline.
- Theme có thể lưu dưới khóa `theme` với đúng hai giá trị `light` và `dark`. Nếu không có giá trị hợp lệ đã lưu, dùng tùy chọn hệ điều hành. Nút `#theme-toggle` đặt `aria-pressed="true"` khi theme tối đang bật và `false` khi theme sáng đang bật. Lỗi `localStorage` không được làm hỏng các chức năng khác.
- Form dùng native validation: trường bắt buộc có nhãn hiển thị và `required`; email dùng `type="email"`. Chưa có backend nên phản hồi phải cho biết form chỉ mô phỏng và dữ liệu chưa được gửi.
- Khi đưa dữ liệu người dùng vào giao diện, dùng `textContent`, không diễn giải dữ liệu như HTML.
- Thông báo kết quả trong `#form-status` dùng `role="status"` để screen reader nhận biết.

## Accessibility, bảo mật và kiểm chứng

- Dùng nhãn hiển thị cho từng trường form; alt ảnh phản ánh mục đích ảnh, ảnh trang trí có alt rỗng.
- Kiểm tra thủ công các landmark, heading, nhãn, alt, tương phản, thứ tự Tab/Shift+Tab, skip-link và focus ở cả hai theme.
- Với bản static, đặt CSP qua meta trong `head`; chỉ cho phép script, style, ảnh, font và kết nối từ nguồn của trang. Không cho phép script/style inline. Ghi rõ giới hạn của CSP qua meta trong README.
- Khai báo `width` và `height` cho ảnh; không lazy-load ảnh chính đầu trang. Chỉ tự lưu font và tài nguyên cần thiết trong repo.
- Ghi kết quả kiểm tra sau khi thật sự chạy. Không khẳng định điểm Lighthouse, CLS, LCP hoặc lỗi Console nếu chưa đo; báo cáo Lighthouse gồm URL, chế độ đo và môi trường.
- Mục tiêu Lighthouse: 100 cho Performance, Accessibility, Best Practices và SEO. Nếu kết quả thấp hơn, giữ số đo thật và giải thích nguyên nhân.

## Quy trình commit

- Thực hiện task theo thứ tự trong `TASK_DECOMPOSITION.md`; mỗi lần chỉ làm một task.
- Sau mỗi task, kiểm tra tiêu chí hoàn thành, xem diff và commit phần thay đổi liên quan bằng thông điệp đã định.
- Không tạo commit rỗng, không tạo lỗi có chủ ý để tạo commit sửa. Nếu audit không tìm được lỗi, lưu bằng chứng audit bằng commit tài liệu có nội dung.
- Mọi thông tin cá nhân chưa được cung cấp phải được đánh dấu rõ là nội dung mẫu để thay trước khi nộp.
