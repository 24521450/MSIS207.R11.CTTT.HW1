const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("form-status");

if (contactForm && contactStatus) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = false;

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    contactStatus.textContent = `Cảm ơn ${name || "bạn"}! Đây là phản hồi mô phỏng; lời nhắn chưa được gửi đi.`;
    contactForm.reset();
  });
}
