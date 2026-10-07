# M1 — Accessibility audit

## Phạm vi và cách kiểm tra

- Trang được kiểm tra qua HTTP tại `http://127.0.0.1:8137/MSIS207.R11.CTTT.HW1/`, nhằm giữ nguyên tiền tố đường dẫn con. Audit cập nhật ngày 2026-10-07 bằng Codex in-app browser và Lighthouse 13.5.0.
- Rà cây accessibility trên browser ở light và dark theme; đối chiếu landmark, thứ tự heading, nhãn form, trạng thái theme, ảnh và vùng thông báo.
- Đối chiếu các token màu trong `styles.css` theo công thức tương phản WCAG: `(L_sáng + 0.05) / (L_tối + 0.05)`. Tỷ lệ được làm tròn tới hai chữ số.
- Đây là audit thủ công theo tiêu chí WCAG AA của đề; chưa dùng Lighthouse hoặc công cụ tự động để thay thế đánh giá WCAG.

## Phát hiện và sửa lỗi

Audit ban đầu đã tìm thấy hai chỗ tên truy cập không khớp chữ nhìn thấy: liên kết thương hiệu hiện “PNQ” nhưng tên truy cập bỏ mất “PNQ”; nút hiện “Giao diện” nhưng tên truy cập chỉ là “Chế độ tối”. Chúng được sửa lần lượt thành `PNQ — Phạm Như Quân, về đầu trang` và nhãn tĩnh `Giao diện tối`. Biểu tượng của nút được ẩn khỏi cây accessibility; `aria-pressed` tiếp tục biểu thị theme tối.

Rà lại selector cũng phát hiện `a:hover` ghi đè màu chữ của skip-link khi vừa focus vừa hover. `.skip-link:hover` nay đặt lại `color: var(--color-on-accent)`. Browser test xác nhận tên truy cập khớp và màu này được giữ ở cả light lẫn dark.

## Cấu trúc và tên truy cập

| Kiểm tra | Kết quả |
|---|---|
| Ngôn ngữ tài liệu | `html[lang="vi"]`. |
| Skip-link và landmark | Skip-link trỏ đến `#main-content`; có banner, điều hướng có tên “Điều hướng chính”, main và contentinfo. |
| Regions và heading | Bốn `section` được đặt tên bằng `aria-labelledby`; chỉ có một `h1`, sau đó là heading `h2` và `h3` theo cấp bậc. |
| Nhãn form | Cả ba trường có nhãn hiển thị ghép bằng `for`/`id`; tên, email và lời nhắn đều bắt buộc. |
| Ảnh | Ảnh đại diện minh họa có `alt` nêu rõ đây là hình minh họa; chú thích dưới ảnh đã được gỡ khỏi giao diện. |
| Theme và thông báo | Nút có tên truy cập tĩnh “Giao diện tối”; icon trang trí có `aria-hidden="true"`; `aria-pressed` khớp theme. Thông báo form dùng `role="status"` và `aria-live="polite"`. |
| Tên truy cập/nhãn nhìn thấy | Browser trả về đúng tên `PNQ — Phạm Như Quân, về đầu trang` cho liên kết thương hiệu và `Giao diện tối` cho nút theme. Lighthouse `label-content-name-mismatch` đạt 1.0, không có phần tử lỗi trong cả hai báo cáo. |
| Phần tử `div` | Không có phần tử `div` trong HTML của dự án; xác nhận bằng tìm kiếm mã nguồn. |

## Tương phản màu

Các nền trong cột “nền đã kiểm tra” là nền thực tế được dùng với token tiền cảnh tương ứng. Các cặp chữ đạt tối thiểu 4.5:1; đường viền thành phần và vòng focus đạt tối thiểu 3:1 so với nền kề.

| Nội dung tiền cảnh | Nền đã kiểm tra | Sáng | Tối | Ngưỡng |
|---|---|---:|---:|---:|
| `--color-text` | page, surface, raised, soft, accent-tint | tối thiểu 12.26:1 | tối thiểu 9.88:1 | 4.5:1 |
| `--color-text-muted` | page, surface, raised, soft, accent-tint | tối thiểu 5.40:1 | tối thiểu 5.98:1 | 4.5:1 |
| `--color-accent` (liên kết, nhãn nhấn) | page, surface, soft, accent-tint | tối thiểu 4.78:1 | tối thiểu 5.02:1 | 4.5:1 |
| `--color-accent-hover` (liên kết hover) | page, surface, soft, accent-tint | tối thiểu 7.13:1 | tối thiểu 6.43:1 | 4.5:1 |
| `--color-on-accent` (chữ trên nút) | accent, accent-hover | tối thiểu 5.87:1 | tối thiểu 6.95:1 | 4.5:1 |
| Skip-link ở normal, focus và focus+hover | chữ `--color-on-accent` trên accent; focus ring so với page | chữ 5.87:1; ring 7.58:1 | chữ 6.95:1; ring 11.28:1 | chữ 4.5:1; ring 3:1 |
| `--color-success` (trạng thái form) | surface | 7.02:1 | 10.19:1 | 4.5:1 |
| `--color-focus` (vòng focus cách nút 3px) | page, surface | tối thiểu 7.58:1 | tối thiểu 10.15:1 | 3:1 |
| `--color-border` (card, trường nhập, nút) | page, surface | tối thiểu 3.36:1 | tối thiểu 3.35:1 | 3:1 |

Màu `--color-error` được định nghĩa nhưng không hiển thị trong trạng thái hiện tại; lỗi thiếu/sai dữ liệu do xác thực gốc của trình duyệt báo. Các tỷ lệ của skip-link được lấy từ màu computed trong browser: light dùng chữ `rgb(255, 255, 255)` trên `rgb(156, 79, 49)`, dark dùng `rgb(32, 41, 37)` trên `rgb(229, 161, 132)`. Focus ring được so với nền page tương ứng.

## Kết quả

M1 đạt sau khi sửa các vấn đề được phát hiện. Landmark, heading, nhãn, alt, trạng thái, màu chữ và focus đã được kiểm tra lại ở hai theme. Lighthouse Accessibility đạt 100 trong mobile mặc định và Fast 3G; `label-content-name-mismatch` không còn phần tử lỗi. Đây là bằng chứng hỗ trợ audit thủ công, không thay thế rà WCAG đầy đủ.
