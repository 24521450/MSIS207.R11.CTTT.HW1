# Portfolio — HW1

## CSP cho trang static

Trang đặt Content Security Policy qua thẻ `<meta http-equiv="Content-Security-Policy">` ở đầu `head`. Chính sách giới hạn tài nguyên về cùng origin, chặn object/frame, cấm inline script/style và chỉ cho phép form đích cùng origin.

CSP qua meta bắt đầu có hiệu lực khi trình duyệt đọc tới thẻ và không hỗ trợ một số chính sách/cơ chế header như `frame-ancestors`, `sandbox` và CSP report-only/reporting. Khi triển khai có cấu hình máy chủ, nên gửi CSP bằng HTTP response header để áp dụng chính sách từ đầu phản hồi và bật bảo vệ/giám sát mà meta không cung cấp. Tham khảo [MDN: `frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors), [MDN: `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/sandbox) và [MDN: `Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only).
