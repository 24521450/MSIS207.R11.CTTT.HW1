# M4 — Tài nguyên và hiệu năng

## Tài nguyên đã kiểm tra

- Trang chạy tại `http://127.0.0.1:8123/MSIS207.R11.CTTT.HW1/`, dưới đường dẫn con để kiểm tra URL tương đối.
- Ảnh hero là SVG nội bộ, kích thước file 941 B. `<img>` khai báo `width="400"` và `height="400"`, có `fetchpriority="high"` vì ảnh nằm trong phần đầu trang, và không bật lazy-load.
- Trang hiện chỉ có ảnh hero; không có ảnh ngoài màn hình cần lazy-load.
- Không tải font ngoài, thư viện JavaScript, CDN hoặc tài nguyên từ origin khác. CSS và hai tệp JavaScript lần lượt là 11,198 B, 1,940 B và 649 B; HTML là 7,234 B. Tổng các tệp trang đo được là 21,962 B trước nén HTTP, không tính header.

## Lighthouse và chỉ số Web Vitals

Không tạo báo cáo Lighthouse trong môi trường này: không có lệnh `lighthouse`, package Lighthouse toàn cục cũng không được cài, và browser connector không cung cấp Lighthouse. Không có phiên đo hiệu năng Fast 3G để ghi số liệu. Vì vậy các tiêu chí sau **chưa được xác minh**:

- Điểm Performance, Accessibility, Best Practices và SEO.
- CLS bằng 0.
- LCP dưới 2 giây trong điều kiện Fast 3G.

Không gán điểm hoặc số đo ước lượng thay cho kết quả Lighthouse. Các kích thước file ở trên là số đọc trực tiếp từ working tree; chúng không phải số liệu tổng hợp do Lighthouse đo.
