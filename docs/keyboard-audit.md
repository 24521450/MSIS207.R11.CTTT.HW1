# M2 — Keyboard navigation audit

## Phạm vi

- Trang được kiểm tra qua `http://127.0.0.1:8137/MSIS207.R11.CTTT.HW1/` vào 2026-10-07.
- Thao tác thủ công bằng Tab, Shift+Tab, Enter và Space trên skip-link, nút theme, trường form và nút submit.
- Kiểm tra trạng thái focus trong accessibility tree và viền focus nhìn thấy trên màn hình.

## Kết quả

| Thao tác | Kết quả quan sát |
|---|---|
| Tab đầu tiên sau khi tải trang | Focus đến skip-link “Đến nội dung chính”; link hiện ra cùng vòng focus tương phản rõ. |
| Native validation | Space khi form trống và Enter khi email sai bị native validation chặn. Enter khi dữ liệu hợp lệ hiện phản hồi mô phỏng, reset form và không tạo lỗi Console. |
| Enter trên skip-link | URL nhận `#main-content`, focus chuyển vào main; có thể tiếp tục đi qua trang. |
| Tab và Shift+Tab | Đã đi qua toàn bộ 14 điều khiển theo thứ tự DOM và quay ngược lại từng điều khiển. Skip-link, thương hiệu, nút theme, 4 liên kết điều hướng, 2 liên kết hero, 3 trường form, nút gửi và liên kết footer đều nhận focus; thứ tự xuôi/ngược khớp nhau. |
| Space và Enter trên nút theme | Từ light, Space chuyển sang dark với `aria-pressed="true"`; Enter chuyển lại light với `aria-pressed="false"`. Tên nút vẫn là “Giao diện tối”. |
| Space trên nút gửi form | Với các trường hợp lệ, hiện thông báo mô phỏng, reset các trường và không tạo lỗi Console. |
| Thoát form | Tab từ nút gửi chuyển đến liên kết footer “Về đầu trang”; Shift+Tab quay lại nút gửi. Không có keyboard trap. |

Viền focus do `:focus-visible` tạo hiện rõ quanh skip-link và nút đang focus. Browser kiểm tra không mắc kẹt bàn phím: tất cả 14 điều khiển đến được bằng Tab và điều hướng đảo được bằng Shift+Tab. Không phát hiện lỗi M2 cần sửa; báo cáo này lưu bằng chứng thao tác.
