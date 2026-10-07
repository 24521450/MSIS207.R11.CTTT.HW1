# M4 — Tài nguyên và hiệu năng

## Tối ưu đã áp dụng

- Thêm assets/favicon.svg và khai báo icon bằng URL tương đối. Favicon trả về HTTP 200 tại cả root và đường dẫn con; các báo cáo Lighthouse chỉ ghi nhận favicon.svg 200, không có yêu cầu favicon.ico.
- Ảnh hero là SVG nội bộ 941 B, khai báo 400×400, fetchpriority cao, không lazy-load. Thêm preload cùng nguồn cho ảnh LCP.
- Trace trước tối ưu ghi nhận CLS 0.0001160173526834495 do độ rộng biểu tượng nút theme thay đổi giữa hai glyph. Đã cố định chỗ của biểu tượng; đo lại nút có cùng chiều rộng ở hai theme và CLS bằng 0 trong cả hai báo cáo cuối.
- Không tải font, thư viện, CDN hoặc tài nguyên từ origin khác. Kích thước file trong working tree: HTML 7,405 B; CSS 11,294 B; theme.js 1,940 B; contact.js 649 B; avatar 941 B; favicon 282 B.

## Môi trường và phương pháp đo

- Lighthouse CLI 13.5.0 qua npm exec; Chrome Headless 154.0.8037.98 trên Windows.
- URL: http://127.0.0.1:8137/MSIS207.R11.CTTT.HW1/ — HTTP server phục vụ thư mục W1 và giữ nguyên tiền tố đường dẫn con.
- Cả hai phép đo dùng mobile form factor, viewport 412×823 CSS px, device scale factor 1.75.
- Báo cáo được tạo từ working tree dựa trên commit 4e5502b; các thay đổi performance trong index.html và styles.css sau đó được commit nguyên trạng thành 11b5293. Báo cáo JSON/HTML được commit thành 380c78b.

| Phép đo | Thời điểm UTC | Throttling / CPU | Performance | Accessibility | Best Practices | SEO | FCP (ms) | LCP (ms) | TBT (ms) | CLS |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile mặc định | 2026-10-07 06:37:29.826Z | Lighthouse simulate; RTT 150 ms; throughput 1,638.4 Kbps; request latency 562.5 ms; download 1,474.56 Kbps; upload 675 Kbps; CPU 4× | 100 | 100 | 100 | 100 | 970.374 | 970.374 | 0 | 0 |
| Fast 3G riêng | 2026-10-07 06:36:48.877Z | DevTools request throttling; latency 150 ms; download 1,638.4 Kbps; upload 750 Kbps; CPU 1× | 100 | 100 | 100 | 100 | 1,344.202 | 1,344.202 | 0 | 0 |

Fast 3G là phép đo riêng bằng request-level DevTools throttling; CPU giữ ở 1× để tách ảnh hưởng mạng. Báo cáo không dùng cấu hình mô phỏng mobile mặc định để gắn nhãn Fast 3G. Giá trị từng lần đo được lưu nguyên trong JSON.

- [Báo cáo Lighthouse mobile mặc định — HTML](../reports/lighthouse/mobile-default.report.html) · [JSON](../reports/lighthouse/mobile-default.report.json)
- [Báo cáo Lighthouse Fast 3G — HTML](../reports/lighthouse/mobile-fast-3g-devtools.report.html) · [JSON](../reports/lighthouse/mobile-fast-3g-devtools.report.json)

## Rà soát audit và giới hạn môi trường

Cả hai báo cáo ghi Accessibility 100; audit label-content-name-mismatch đạt 1.0 và không có phần tử lỗi; audit errors-in-console không có lỗi. Mạng ghi nhận HTML, CSS, hai script, ảnh hero và favicon đều trả 200. CLS có giá trị số 0 và audit layout-shifts không ghi nhận phần tử dịch chuyển. LCP Fast 3G 1,344.202 ms thấp hơn mục tiêu 2 giây.

Một số insight chẩn đoán vẫn có score thấp dù bốn điểm category đều 100:

- cache-insight: static server Python không gửi cache lifetime lâu; báo cáo ước lượng khoảng 15 KiB có thể được cache tốt hơn.
- document-latency-insight: server phản hồi nhanh 1–2 ms, không redirect, nhưng không nén nội dung.
- network-dependency-tree-insight và render-blocking-insight: chuỗi tải cục bộ gồm tài liệu, styles.css và theme.js đồng bộ trong head. Lighthouse ước lượng phần tiết kiệm render-blocking 80 ms ở mobile mặc định và 290 ms ở Fast 3G. Script theme giữ đồng bộ để áp lựa chọn đã lưu hoặc theme hệ điều hành sớm; trang vẫn đạt LCP mục tiêu trong phép đo Fast 3G.

Đây là kết quả trên Python HTTP server cục bộ, không phải GitHub Pages hoặc máy chủ production. HTTP/1.0, thiếu nén và header cache giải thích các insight trên; không thay đổi audit hoặc số đo để nâng điểm. Fast 3G dùng request-level throttling của Chrome, không phải packet-level shaping. Báo cáo là phép đo Lighthouse lab và không thay thế audit accessibility thủ công.
