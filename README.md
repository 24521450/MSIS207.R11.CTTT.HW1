# HW1 — Production Portfolio

Portfolio tĩnh xây dựng bằng HTML5, CSS và JavaScript thuần. Giao diện mặc định dùng tiếng Việt, có theme sáng/tối, responsive từ 375px và form liên hệ mô phỏng. Không cần cài thư viện hoặc tải tài nguyên từ CDN.

## Chạy trên máy

Mở PowerShell tại thư mục chứa `index.html`, rồi chạy:

```powershell
python -m http.server 8000
```

Nếu lệnh `python` chưa có trong PATH, dùng `py -m http.server 8000`. Mở <http://localhost:8000/> trong trình duyệt. Dùng HTTP server thay vì mở `index.html` trực tiếp để kiểm tra CSP, đường dẫn tương đối và các script.

## Cấu trúc bài

```text
index.html                    Cấu trúc semantic, form, CSP meta
styles.css                    Design tokens, reset, layout responsive
js/theme.js                   Theme theo hệ điều hành và lưu lựa chọn
js/contact.js                 Native validation và phản hồi mô phỏng
assets/avatar-placeholder.svg Ảnh mẫu cục bộ
TASK_DECOMPOSITION.md         Thứ tự task, phụ thuộc và hợp đồng
project-rules.md              Ràng buộc công nghệ/giao diện
docs/a11y-audit.md            Ma trận tương phản và rà semantic
docs/keyboard-audit.md        Bằng chứng thao tác bàn phím
docs/performance-audit.md     Kích thước tài nguyên và giới hạn đo
```

## Nội dung trước khi nộp

- Thông tin được cung cấp đã điền: ngành học “Information System”, phần giới thiệu “Interested in data”, và kỹ năng HTML, Excel, Word, Prompt engineering.
- Tên “Phạm Như Quân” vẫn xuất hiện trong `<title>`, mô tả trang, thương hiệu, `h1` và footer; thay nếu đây không phải tên bạn muốn dùng.
- Hai thẻ dự án được ghi rõ là mô phỏng và dùng dữ liệu giả lập. Thay bằng dự án bạn thực sự đã làm nếu dùng portfolio để giới thiệu kinh nghiệm cá nhân.
- Ảnh SVG vẫn là ảnh minh họa; dòng chú thích hiển thị dưới ảnh đã được gỡ. `alt` vẫn mô tả đây là ảnh minh họa cho người dùng trình đọc màn hình.
- Biểu mẫu liên hệ chỉ mô phỏng gửi; chưa có backend và không gửi hay lưu lời nhắn.

## Tính năng

- Theme dùng `data-theme="light"` hoặc `data-theme="dark"`; khóa lưu trữ là `theme`. Nếu chưa có lựa chọn hợp lệ, trang theo `prefers-color-scheme`. Lỗi `localStorage` được bắt để không làm hỏng trang.
- Form có tên, email, lời nhắn, nhãn hiển thị và native validation. Phản hồi được đặt bằng `textContent` và ghi rõ dữ liệu chưa được gửi.
- HTML semantic dùng header, nav, main, section, article, footer; có skip-link, một `h1` và không dùng `div`.
- Bố cục dùng Flexbox cho điều hướng, Grid cho kỹ năng/dự án và CSS variables cho design tokens. Tài nguyên trong trang dùng URL tương đối nên chạy được dưới đường dẫn con.

## Content Security Policy

Trang đặt CSP bằng `<meta http-equiv="Content-Security-Policy">` ở đầu `head`. Chính sách giới hạn tài nguyên về cùng origin, chặn object và frame con, cấm inline script/style và chỉ cho phép form đích cùng origin.

CSP qua meta chỉ có hiệu lực sau khi trình duyệt đọc tới thẻ. Một số cơ chế chỉ có qua HTTP response header, gồm `frame-ancestors`, `sandbox` và CSP report-only/reporting. Khi triển khai trên máy chủ có cấu hình, nên gửi chính sách bằng header để áp dụng sớm hơn và bật các cơ chế đó. Tham khảo [MDN: `frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors), [MDN: `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/sandbox) và [MDN: `Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only).

## Kết quả kiểm tra thực tế

Kiểm tra thủ công trong Codex in-app browser ngày 2026-10-07 tại `http://127.0.0.1:8123/MSIS207.R11.CTTT.HW1/` bằng Python HTTP server:

| Hạng mục | Kết quả |
|---|---|
| Responsive | 375px, 768px và 1440px: không tràn ngang; nav dùng Flexbox, các lưới dùng Grid. |
| Theme | Nút/`aria-pressed` khớp theme hiển thị; dark và light đã được kiểm tra. Chín kiểm tra logic fallback hệ điều hành, lưu/khôi phục lựa chọn và lỗi storage đều đạt. Browser connector không cho đọc trực tiếp `localStorage`, nên persistence thật sau reload chưa được đo trong browser. |
| Form | Trường thiếu và email sai bị native validation chặn. Dữ liệu hợp lệ tạo phản hồi mô phỏng, reset form; chuỗi HTML thử nghiệm hiện như văn bản, không tạo node HTML. |
| Accessibility | Landmark, heading, labels, alt và trạng thái được rà thủ công; mọi cặp chữ đã rà đạt tối thiểu 4.5:1 ở cả hai theme. Chi tiết ở [`docs/a11y-audit.md`](docs/a11y-audit.md). |
| Bàn phím | Skip-link, Enter/Space, Tab/Shift+Tab, focus nhìn thấy rõ và rời form đều đạt; chi tiết ở [`docs/keyboard-audit.md`](docs/keyboard-audit.md). |
| CSP | Theme và form vẫn hoạt động sau khi tải trang dưới CSP; Console không có lỗi hoặc CSP violation. |
| Tài nguyên | SVG 941 B; HTML 7,234 B, CSS 11,198 B và JavaScript 2,589 B. Ảnh hero có kích thước 400×400 và fetch priority cao. Chi tiết ở [`docs/performance-audit.md`](docs/performance-audit.md). |

**Lighthouse chưa chạy được:** môi trường không có lệnh/package Lighthouse hoặc API audit trên browser connector. Vì vậy chưa có điểm thật cho Performance, Accessibility, Best Practices, SEO; CLS=0 và LCP<2s ở Fast 3G cũng chưa được xác minh. Không sử dụng số liệu ước tính thay cho báo cáo Lighthouse.

## Ghi chú bảo vệ bài

- **Semantic HTML:** landmark và heading mô tả cấu trúc để trình duyệt, trình đọc màn hình và bàn phím nhận biết được từng vùng.
- **Box model:** `box-sizing: border-box` làm cho `width` bao gồm padding và border, giúp kích thước layout dễ dự đoán hơn.
- **Grid và Flexbox:** Grid tạo lưới kỹ năng/dự án và bố cục hero; Flexbox sắp xếp điều hướng cùng các nút.
- **CSS variables:** các token `--color-*`, `--space-*` và `--font-*` gom màu, khoảng cách và kiểu chữ để điều chỉnh giao diện nhanh.
- **Theme persistence:** JavaScript áp `data-theme`; lựa chọn hợp lệ được lưu dưới key `theme`, còn lần đầu dùng theme hệ điều hành.
- **Form validation:** `required` và `type="email"` dùng xác thực gốc của trình duyệt; handler chỉ mô phỏng phản hồi bằng `textContent`.
- **CSP:** policy cùng origin cấm inline script/style và nội dung object/frame; meta CSP có các giới hạn nêu trên.
- **Thử thay đổi trực tiếp:** đổi một token màu trong `styles.css` hoặc ngưỡng breakpoint ở media query, rồi reload để giải thích ảnh hưởng.
