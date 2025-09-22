
// main.js — controls nav, slider and contact validation
document.addEventListener('DOMContentLoaded', function () {
  // set year in footers
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year-2')?.textContent = y;
  document.getElementById('year-3')?.textContent = y;

  // NAV TOGGLE (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Mark active nav link based on body[data-page]
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll('.nav-link').forEach(function (a) {
      if (a.dataset.link === page) a.classList.add('active');
    });
  }

  // HERO SLIDER
  const slides = document.querySelectorAll('#heroSlider .slide');
  if (slides && slides.length > 0) {
    let current = 0;
    const showSlide = idx => {
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    };
    const nextSlide = () => { current = (current + 1) % slides.length; showSlide(current); };
    const prevSlide = () => { current = (current - 1 + slides.length) % slides.length; showSlide(current); };

    let slideInterval = setInterval(nextSlide, 5000);

    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    nextBtn?.addEventListener('click', function () { nextSlide(); resetInterval(); });
    prevBtn?.addEventListener('click', function () { prevSlide(); resetInterval(); });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  // CONTACT FORM VALIDATION (client-side demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // remove prior messages
      contactForm.querySelectorAll('.error-msg').forEach(n => n.remove());
      contactForm.querySelectorAll('.success-msg').forEach(n => n.remove());
      contactForm.querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));

      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');

      let valid = true;
      function addError(el, msg) {
        el.classList.add('input-error');
        const p = document.createElement('p');
        p.className = 'error-msg';
        p.textContent = msg;
        el.parentElement.appendChild(p);
        valid = false;
      }

      if (!name.value.trim() || name.value.trim().length < 2) addError(name, 'Please enter your name (2+ characters).');
      if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) addError(email, 'Please enter a valid email address.');
      if (!message.value.trim() || message.value.trim().length < 10) addError(message, 'Message must be at least 10 characters.');

      if (valid) {
        // Demo success — show message and reset.
        const success = document.createElement('p');
        success.className = 'success-msg';
        success.textContent = 'Thanks — your message was sent (demo). We will contact you shortly.';
        contactForm.appendChild(success);
        contactForm.reset();
        setTimeout(() => success.remove(), 5000);
      }
    });
  }
});
