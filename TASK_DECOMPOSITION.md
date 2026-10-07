# HW1 — Production Portfolio: phân rã công việc

## Mục tiêu và phạm vi

Xây dựng portfolio cá nhân bằng HTML5, CSS và JavaScript thuần. Mặc định dùng tiếng Việt; hỗ trợ sáng/tối và màn hình rộng từ 375px. Portfolio có phần giới thiệu, kỹ năng, dự án và biểu mẫu liên hệ. Mọi thông tin cá nhân chưa được cung cấp phải được đánh dấu rõ là nội dung mẫu để thay trước khi nộp.

Phạm vi HW1 gồm phát triển và commit trên máy. Push GitHub, bật GitHub Pages, HW2, HW3 và backend gửi email không thuộc phạm vi mặc định.

## Hợp đồng giữa các task

| Hợp đồng | Quy ước |
|---|---|
| Ngôn ngữ và cấu trúc | Tài liệu HTML đặt `lang="vi"`; một `h1`; có skip-link và landmark ngữ nghĩa. Không dùng phần tử `div`. |
| Tệp và đường dẫn | HTML, CSS, JavaScript và tài nguyên được giữ trong repo. Dùng URL tương đối để chạy được ở thư mục gốc hoặc đường dẫn con. Style và script ở tệp riêng. |
| Theme | `data-theme="light"` hoặc `data-theme="dark"` trên phần tử `html`. Khóa `localStorage` là `theme`, chỉ nhận `light` hoặc `dark`. Nếu chưa có lựa chọn hợp lệ thì theo `prefers-color-scheme`. Nút `#theme-toggle` có `aria-pressed="true"` khi theme tối đang bật và `false` khi theme sáng đang bật; lỗi truy cập storage không làm hỏng trang. |
| Form liên hệ | `#contact-form` có trường tên, email, lời nhắn với nhãn nhìn thấy được; email dùng `type="email"`, trường bắt buộc dùng `required`. `#form-status` có `role="status"` để trình đọc màn hình nhận biết thông báo. Gửi form chỉ mô phỏng; không tuyên bố đã gửi dữ liệu. Nội dung do người dùng nhập được đưa vào giao diện bằng `textContent`. |
| Thiết kế | Token màu dùng CSS custom properties có tên ngữ nghĩa. Bố cục mobile-first; Flexbox cho điều hướng, Grid cho kỹ năng và dự án. Không tràn ngang tại 375px. |
| Accessibility | Tương phản chữ thường tối thiểu 4.5:1 ở cả hai theme. Kiểm tra landmark, heading, nhãn, alt, bàn phím và focus thủ công; Lighthouse không thay thế audit WCAG. |
| CSP và tài nguyên | CSP đặt bằng meta trong `head` cho trang static; script/style inline bị cấm. Tài nguyên chỉ tải từ cùng nguồn, không dùng thư viện hoặc CDN. Ảnh có khai báo kích thước; ảnh chính đầu trang không lazy-load. |
| Bằng chứng | Chỉ ghi kết quả kiểm tra thực tế. Lighthouse phải kèm URL, chế độ đo và môi trường; nếu không đạt mục tiêu thì ghi điểm và nguyên nhân đúng thực tế. |

## Thứ tự triển khai

| Task | Phụ thuộc | Kết quả và hợp đồng bàn giao | Tiêu chí hoàn thành | Commit dự kiến | Trạng thái |
|---|---|---|---|---|---|
| T-01 | Không | Tài liệu phân rã task, thứ tự, hợp đồng dùng chung và quy tắc dự án được tạo trước mã giao diện. | Hai tài liệu được rà soát, nhất quán với kế hoạch HW1; chỉ commit các tài liệu T-01. | `docs(spec): define portfolio tasks and contracts` | Hoàn thành — commit `284116e`. |
| T-02 | T-01 | Tạo cấu trúc HTML gồm `header`, `nav`, `main`, các `section`, `article`, `footer`; có skip-link, một `h1`, nhãn form và hook `#theme-toggle`, `#contact-form`, `#form-status`. Không dùng `div`. | Kiểm tra cấu trúc HTML và nội dung mẫu được đánh dấu; chưa cần xử lý theme hay submit. | `feat(html): build semantic portfolio structure` | Hoàn thành — kiểm tra cấu trúc HTML đạt, ảnh đại diện mẫu nằm trong repo. |
| T-03 | T-02 | Tạo reset, typography, spacing và bảng màu sáng/tối bằng CSS variables. Dùng token cho các màu giao diện. | Style nằm trong CSS riêng; token màu có ngữ nghĩa và tương phản được audit ở M1. | `feat(css): define design tokens and reset` | Chưa làm. |
| T-04 | T-03 | Dùng Flexbox cho điều hướng, Grid cho kỹ năng và dự án; bố cục mobile-first. | Không tràn ngang ở 375px, 768px và 1440px; nội dung dài không phá bố cục. | `feat(css): implement responsive portfolio layout` | Chưa làm. |
| T-05 | T-02, T-03 | Thêm theme theo hợp đồng chung, lưu lựa chọn hợp lệ và khôi phục sau tải lại. | Nút, thuộc tính `data-theme` và giao diện luôn khớp; lựa chọn hệ điều hành dùng khi chưa có giá trị đã lưu; lỗi storage được xử lý an toàn. | `feat(js): implement accessible theme switching` | Chưa làm. |
| T-06 | T-02 | Thêm xử lý form dựa trên native validation và thông báo mô phỏng cho screen reader. | Form thiếu/sai dữ liệu bị native validation chặn; dữ liệu không gửi backend; thông báo nói rõ chưa gửi và hiển thị an toàn bằng `textContent`. | `feat(js): implement contact form feedback` | Chưa làm. |
| T-07 — M1 | T-02 đến T-06 | Audit accessibility và sửa vấn đề tìm được: landmark, heading, nhãn, alt, tương phản hai theme. | Lưu ma trận màu/tỷ lệ tương phản và bằng chứng kiểm tra; nếu không có lỗi cần sửa, tạo commit tài liệu audit có ý nghĩa. | `fix(a11y): contrast & landmarks` | Chưa làm. |
| T-08 — M2 | T-07 | Audit thao tác Tab/Shift+Tab, Enter/Space theo loại control, skip-link, focus và khả năng thoát. | Kiểm tra bàn phím thủ công; sửa lỗi thực tế nếu có. Nếu không có lỗi, lưu bằng chứng bằng commit tài liệu audit. | `fix(nav): keyboard trap prevention` | Chưa làm. |
| T-09 — M3 | T-08 | Thiết lập CSP meta cho static site; giữ toàn bộ script/style trong tệp riêng và loại bỏ inline handlers. | Tính năng vẫn hoạt động dưới CSP; Console không báo vi phạm. README nêu giới hạn của CSP qua meta. | `feat(security): enforce content security policy` | Chưa làm. |
| T-10 — M4 | T-09 | Tối ưu ảnh, kích thước ảnh, font và tài nguyên; đo Lighthouse. | Ảnh có kích thước khai báo, lazy-load ảnh ngoài màn hình phù hợp, ảnh đầu trang không lazy-load. Lưu kết quả thật gồm URL, chế độ đo, môi trường, CLS/LCP và điểm Lighthouse; ghi rõ phần chưa đạt. | `perf: optimize assets` | Chưa làm. |
| T-11 | T-10 | Hoàn thiện README hướng dẫn chạy qua HTTP server, cấu trúc bài, nội dung cần thay, kết quả kiểm tra và ghi chú bảo vệ. | Người khác có thể chạy bài từ README; tài liệu chỉ nêu kết quả đã thực hiện; ghi chú giải thích semantic HTML, box model, Grid, CSS variables, lưu theme, validation và CSP. | `docs: document verification and submission` | Chưa làm. |

## Cách làm sau mỗi task

Triển khai đúng phạm vi một task; đối chiếu tiêu chí hoàn thành; xem `git diff`; chỉ commit các thay đổi liên quan với thông điệp dự kiến. Không tạo commit rỗng và không thêm lỗi có chủ ý để tạo commit sửa. Task audit không tìm thấy vấn đề phải lưu bằng chứng kiểm tra trong một commit tài liệu phù hợp.
