const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const siteNav = document.getElementById('siteNav');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

function setThemeIcon() {
  const isDark = root.getAttribute('data-theme') !== 'light';
  themeToggle.textContent = isDark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}
setThemeIcon();

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  setThemeIcon();
});

mobileMenuBtn.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  document.body.classList.toggle('nav-open', open);
  mobileMenuBtn.setAttribute('aria-expanded', String(open));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    document.body.classList.remove('nav-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

year.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });
sections.forEach(section => activeObserver.observe(section));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const message = String(form.get('message') || '').trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hi Dhruvil,\n\n${message}\n\nName: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:dhruvil20patel501@gmail.com?subject=${subject}&body=${body}`;
});
