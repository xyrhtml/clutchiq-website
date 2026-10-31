const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.getElementById('mobileMenu');
const nav = document.querySelector('.desktop-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
}

// Prototype-only waitlist: stores entries in this browser, not on a server.
const form = document.getElementById('waitlistForm');
const message = document.getElementById('formMessage');
if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const entries = JSON.parse(localStorage.getItem('clutchiq_waitlist_demo') || '[]');
    entries.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem('clutchiq_waitlist_demo', JSON.stringify(entries));
    message.textContent = 'Thanks — your demo entry was saved in this browser. This prototype does not send information to ClutchIQ yet.';
    message.style.color = '#86d7b0';
    form.reset();
  });
}
