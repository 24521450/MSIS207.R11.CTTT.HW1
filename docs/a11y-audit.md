# M1 — Accessibility audit

## Phạm vi và cách kiểm tra

- Trang được kiểm tra qua HTTP tại `http://127.0.0.1:8123/MSIS207.R11.CTTT.HW1/`, nhằm giữ nguyên tiền tố đường dẫn con.
- Rà cây accessibility trên browser ở light và dark theme; đối chiếu landmark, thứ tự heading, nhãn form, trạng thái theme, ảnh và vùng thông báo.
- Đối chiếu các token màu trong `styles.css` theo công thức tương phản WCAG: `(L_sáng + 0.05) / (L_tối + 0.05)`. Tỷ lệ được làm tròn tới hai chữ số.
- Đây là audit thủ công theo tiêu chí WCAG AA của đề; chưa dùng Lighthouse hoặc công cụ tự động để thay thế đánh giá WCAG.

## Cấu trúc và tên truy cập

| Kiểm tra | Kết quả |
|---|---|
| Ngôn ngữ tài liệu | `html[lang="vi"]`. |
| Skip-link và landmark | Skip-link trỏ đến `#main-content`; có banner, điều hướng có tên “Điều hướng chính”, main và contentinfo. |
| Regions và heading | Bốn `section` được đặt tên bằng `aria-labelledby`; chỉ có một `h1`, sau đó là heading `h2` và `h3` theo cấp bậc. |
| Nhãn form | Cả ba trường có nhãn hiển thị ghép bằng `for`/`id`; tên, email và lời nhắn đều bắt buộc. |
| Ảnh | Ảnh đại diện minh họa có `alt` nêu rõ đây là hình minh họa; chú thích dưới ảnh đã được gỡ khỏi giao diện. |
| Theme và thông báo | Nút theme có tên truy cập cùng `aria-pressed`; thông báo form nằm trong `role="status"` với `aria-live="polite"`. |
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
| `--color-success` (trạng thái form) | surface | 7.02:1 | 10.19:1 | 4.5:1 |
| `--color-focus` (vòng focus cách nút 3px) | page, surface | tối thiểu 7.58:1 | tối thiểu 10.15:1 | 3:1 |
| `--color-border` (card, trường nhập, nút) | page, surface | tối thiểu 3.36:1 | tối thiểu 3.35:1 | 3:1 |

Không thấy nội dung giao diện nào cần chỉnh sau audit này. Màu `--color-error` được định nghĩa nhưng không hiển thị trong trạng thái hiện tại; lỗi thiếu/sai dữ liệu do xác thực gốc của trình duyệt báo.

## Kết quả

M1 đạt theo các tiêu chí đã rà: cấu trúc có tên truy cập, nhãn/alt/trạng thái hiện diện, chữ đạt 4.5:1 và đường viền/focus đạt 3:1 ở cả hai palette. Lần kiểm tra này không phát hiện lỗi cần sửa mã nguồn; báo cáo này lưu ma trận và bằng chứng audit.
