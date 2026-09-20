import { initCarousel } from './js/carousel.js';
import { initScrollAnimations } from './js/animations.js';
import { initFAQ } from './js/faq.js';
import { initNavigation } from './js/navigation.js';
import { initCalculator } from './js/calculator.js';
import { initMap } from './js/map.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCalculator();
  initScrollAnimations();
  initCarousel();
  initFAQ();
  initMap();

  // Footer CTA Form Submission
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactStatus) {
        contactStatus.textContent = 'Thank you! Your quote request has been received. We will contact you within 48 hours.';
        contactStatus.className = 'form-status success';
        contactStatus.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => contactStatus.classList.add('hidden'), 5000);
      }
    });
  }

  // Buyer's Guide Form
  const guideForm = document.getElementById('guide-form');
  const guideStatus = document.getElementById('guide-status');
  if (guideForm) {
    guideForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Placeholder for email capture and PDF download
      guideStatus.textContent = 'Thank you! Check your email for the Buyer\'s Guide PDF link.';
      guideStatus.className = 'form-status success text-dark';
      guideStatus.classList.remove('hidden');
      guideForm.reset();
      setTimeout(() => guideStatus.classList.add('hidden'), 5000);
    });
  }

  // Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  const declineCookiesBtn = document.getElementById('decline-cookies');
  
  if (cookieBanner && !localStorage.getItem('brighthaven_cookie_consent')) {
    // Show banner after short delay
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }

  const closeCookieBanner = (consent) => {
    localStorage.setItem('brighthaven_cookie_consent', consent);
    cookieBanner.classList.remove('show');
  };

  if (acceptCookiesBtn) acceptCookiesBtn.addEventListener('click', () => closeCookieBanner('accepted'));
  if (declineCookiesBtn) declineCookiesBtn.addEventListener('click', () => closeCookieBanner('declined'));

});
