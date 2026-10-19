// Customize this address to make the contact form work for you.
const CONTACT_EMAIL = "toriqulitariq@gmail.com";

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const email = form.get("email").trim();
  const subject = form.get("subject").trim();
  const message = form.get("message").trim();

  // if (CONTACT_EMAIL === "toriqulitariq@gmail.com") {
  //   document.querySelector("#formNote").textContent =
  //     "Please update CONTACT_EMAIL in script.js with your real email address first.";
  //   return;
  // }

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector("#formNote").textContent = "Opening your email application…";
  window.location.href = mailto;
});

if (window.lucide) lucide.createIcons();
