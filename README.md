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
assets/favicon.svg           Favicon PNQ cục bộ
TASK_DECOMPOSITION.md         Thứ tự task, phụ thuộc và hợp đồng
project-rules.md              Ràng buộc công nghệ/giao diện
docs/a11y-audit.md            Ma trận tương phản và rà semantic
docs/keyboard-audit.md        Bằng chứng thao tác bàn phím
docs/performance-audit.md     Kích thước tài nguyên, Lighthouse và giới hạn đo
reports/lighthouse/           Báo cáo Lighthouse HTML và JSON
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

Kiểm tra trong Codex in-app browser và Lighthouse ngày 2026-10-07 tại `http://127.0.0.1:8137/MSIS207.R11.CTTT.HW1/` bằng Python HTTP server:

| Hạng mục | Kết quả |
|---|---|
| Responsive | Viewport 375px, 768px và 1440px, cả hai theme: document không tràn ngang; các lưới dùng Grid và nav dùng Flexbox. |
| Theme | Light và dark giữ đúng giao diện/`aria-pressed` sau khi tải lại. Năm kiểm tra logic OS fallback, theme đã lưu, giá trị lỗi, storage bị chặn và đổi OS theme đều đạt. |
| Form | Space khi trống và Enter với email sai bị native validation chặn. Enter với dữ liệu hợp lệ cho phản hồi mô phỏng; chuỗi `<img src=x onerror=alert(1)>` hiện dạng text, không sinh node ảnh; form được reset. |
| Accessibility | Audit ban đầu tìm được và sửa hai tên truy cập không khớp chữ nhìn thấy cùng lỗi hover của skip-link. Màu chữ đạt 5.87:1 ở light và 6.95:1 ở dark; focus ring đạt 7.58:1 và 11.28:1. Lighthouse không còn mismatch. Chi tiết tại [`docs/a11y-audit.md`](docs/a11y-audit.md). |
| Bàn phím | Tab đi qua đủ 14 điều khiển; Shift+Tab đảo ngược đủ thứ tự. Skip-link Enter, theme Space/Enter, form native validation và đường thoát khỏi form đều đạt; không có keyboard trap. Chi tiết tại [`docs/keyboard-audit.md`](docs/keyboard-audit.md). |
| CSP | Theme và form hoạt động dưới CSP cùng nguồn; script/style ở tệp riêng, không có inline handler/style; Console không có lỗi hoặc vi phạm CSP. |
| Tài nguyên | Ảnh hero SVG 941 B, 400×400, preload và fetch priority cao; không font ngoài. Favicon trả HTTP 200 ở root và subpath; báo cáo không có favicon.ico 404. Chi tiết tại [`docs/performance-audit.md`](docs/performance-audit.md). |
| Lighthouse mobile mặc định | Lighthouse 13.5.0, Chrome 154, cả bốn category 100; LCP 970.374 ms, CLS 0. Báo cáo: [HTML](reports/lighthouse/mobile-default.report.html) · [JSON](reports/lighthouse/mobile-default.report.json). |
| Lighthouse Fast 3G | Cả bốn category 100; LCP 1,344.202 ms, CLS 0; Fast 3G request throttling 150 ms, 1,638.4 Kbps down, 750 Kbps up, CPU 1×. Báo cáo: [HTML](reports/lighthouse/mobile-fast-3g-devtools.report.html) · [JSON](reports/lighthouse/mobile-fast-3g-devtools.report.json). |

Các báo cáo có một số insight chẩn đoán chưa đạt do Python HTTP server cục bộ không nén nội dung và không gửi cache lifetime; insight render-blocking ghi nhận CSS và script theme đồng bộ trong head. Bốn điểm category vẫn là 100. Chi tiết từng cài đặt, thời gian đo UTC và giới hạn môi trường ở [`docs/performance-audit.md`](docs/performance-audit.md).

## Ghi chú bảo vệ bài

- **Semantic HTML:** landmark và heading mô tả cấu trúc để trình duyệt, trình đọc màn hình và bàn phím nhận biết được từng vùng.
- **Box model:** `box-sizing: border-box` làm cho `width` bao gồm padding và border, giúp kích thước layout dễ dự đoán hơn.
- **Grid và Flexbox:** Grid tạo lưới kỹ năng/dự án và bố cục hero; Flexbox sắp xếp điều hướng cùng các nút.
- **CSS variables:** các token `--color-*`, `--space-*` và `--font-*` gom màu, khoảng cách và kiểu chữ để điều chỉnh giao diện nhanh.
- **Theme persistence:** JavaScript áp `data-theme`; lựa chọn hợp lệ được lưu dưới key `theme`, còn lần đầu dùng theme hệ điều hành.
- **Form validation:** `required` và `type="email"` dùng xác thực gốc của trình duyệt; handler chỉ mô phỏng phản hồi bằng `textContent`.
- **CSP:** policy cùng origin cấm inline script/style và nội dung object/frame; meta CSP có các giới hạn nêu trên.
- **Thử thay đổi trực tiếp:** đổi một token màu trong `styles.css` hoặc ngưỡng breakpoint ở media query, rồi reload để giải thích ảnh hưởng.
