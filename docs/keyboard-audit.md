# M2 — Keyboard navigation audit

## Phạm vi

- Trang được kiểm tra qua `http://127.0.0.1:8123/MSIS207.R11.CTTT.HW1/`.
- Thao tác thủ công bằng Tab, Shift+Tab, Enter và Space trên skip-link, nút theme, trường form và nút submit.
- Kiểm tra trạng thái focus trong accessibility tree và viền focus nhìn thấy trên màn hình.

## Kết quả

| Thao tác | Kết quả quan sát |
|---|---|
| Tab đầu tiên sau khi tải trang | Focus đến skip-link “Đến nội dung chính”; link hiện ra cùng vòng focus tương phản rõ. |
| Enter trên skip-link | URL nhận `#main-content`, focus chuyển vào main; có thể tiếp tục đi qua trang. |
| Tab và Shift+Tab | Di chuyển theo thứ tự DOM qua điều hướng, nội dung, các trường form, nút gửi và liên kết footer; chiều ngược quay lại các điều khiển trước đó. |
| Space trên nút theme | Đổi sang theme sáng; biểu tượng và `aria-pressed` phản ánh trạng thái. |
| Enter trên nút theme | Đổi lại theme tối; `aria-pressed="true"` khớp với `data-theme="dark"`. |
| Space trên nút gửi form | Với các trường hợp lệ, hiện thông báo mô phỏng, reset các trường và không tạo lỗi Console. |
| Thoát form | Tab từ nút gửi chuyển đến liên kết footer “Về đầu trang”; Shift+Tab quay lại nút gửi. Không có keyboard trap. |

Viền focus do `:focus-visible` tạo hiện rõ quanh skip-link và nút đang focus. Không phát hiện lỗi điều hướng bàn phím cần sửa mã nguồn; báo cáo này lưu bằng chứng cho M2.
