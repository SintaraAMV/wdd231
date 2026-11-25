// join.js
document.addEventListener('DOMContentLoaded', () => {
  // Set timestamp
  const timestamp = document.getElementById('timestamp');
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }

  // Modal controls
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('dialog');
      if (modal) modal.close();
    });
  });

  // Close modal when clicking backdrop
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });
});
