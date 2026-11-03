// Portfolio interactions and motion. Existing icon names and page content are preserved.
const CONTACT_EMAIL = "toriqulitariq@gmail.com";

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) window.lucide.createIcons();
  });

  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Reveal sections/cards on scroll, with a graceful fallback for older browsers.
const motionTargets = document.querySelectorAll(
  ".section-kicker, .section-title, .section-intro, .two-column > *, .skill-card, .project-card, .experience-card, .education-grid > *, .contact-grid > *, .hero-bottom"
);
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-motion");
  motionTargets.forEach((element, index) => {
    element.classList.add("reveal");
    if (index % 4 === 1) element.classList.add("reveal-delay-1");
    if (index % 4 === 2) element.classList.add("reveal-delay-2");
    if (index % 4 === 3) element.classList.add("reveal-delay-3");
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  motionTargets.forEach((element) => revealObserver.observe(element));
} else {
  motionTargets.forEach((element) => element.classList.add("is-visible"));
}

// Contact form uses mailto: this opens the visitor's email app; it does not send silently.
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const getValue = (key) => String(form.get(key) || "").trim();
    const name = getValue("name");
    const email = getValue("email");
    const subject = getValue("subject");
    const message = getValue("message");
    const note = document.querySelector("#formNote");

    if (!CONTACT_EMAIL || CONTACT_EMAIL === "your-email@example.com") {
      if (note) note.textContent = "Please configure CONTACT_EMAIL in script.js first.";
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject || "Portfolio contact")}&body=${encodeURIComponent(body)}`;
    if (note) note.textContent = "Opening your email application…";
    window.location.href = mailto;
  });
}

if (window.lucide) window.lucide.createIcons();
