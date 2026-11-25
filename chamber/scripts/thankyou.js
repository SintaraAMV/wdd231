// thankyou.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const fields = ['firstName', 'lastName', 'email', 'phone', 'businessName', 'timestamp'];
  fields.forEach(field => {
    const el = document.getElementById(field);
    if (el) {
      let value = params.get(field) || '';
      if (field === 'timestamp' && value) {
        value = new Date(value).toLocaleString();
      }
      el.textContent = value;
    }
  });
});
