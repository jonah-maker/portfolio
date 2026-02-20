/* ============================================
   JONAH — Fashion Portfolio
   JavaScript — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Loader ---
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.getElementById('hero').classList.add('loaded');
    }, 2200);
  });

  // Fallback: hide loader after 4s max
  setTimeout(() => {
    loader.classList.add('hidden');
    document.getElementById('hero').classList.add('loaded');
  }, 4000);

  // --- Navigation Scroll ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Collection Cards → Project Modals ---
  const cards = document.querySelectorAll('.collection-card');
  const modals = document.querySelectorAll('.project-modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');

  function openModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  }

  function closeAllModals() {
    modals.forEach(m => m.classList.remove('active'));
    document.body.classList.remove('no-scroll');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openModal(projectId);
    });
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Close modal on clicking outside content
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // --- Hero Parallax Effect ---
  const heroImg = document.querySelector('.hero-img');
  
  window.addEventListener('scroll', () => {
    if (heroImg) {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroImg.style.transform = `scale(1.05) translateY(${rate}px)`;
    }
  }, { passive: true });

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `<span>Sent ✓</span>`;
    submitBtn.style.borderColor = 'var(--gold)';
    submitBtn.style.color = 'var(--gold)';
    
    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.borderColor = '';
      submitBtn.style.color = '';
      contactForm.reset();
    }, 2500);
  });

  // --- Staggered reveal for collection cards ---
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  cards.forEach(card => cardObserver.observe(card));

  // --- Stat Counter Animation ---
  const stats = document.querySelectorAll('.stat-number');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent, 10);
        let current = 0;
        const duration = 1500;
        const increment = target / (duration / 30);

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 30);

        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statObserver.observe(stat));

});
