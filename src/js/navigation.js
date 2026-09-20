export function initNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Simple animation for hamburger
    const hamburger = toggleBtn.querySelector('.hamburger');
    if (navLinks.classList.contains('active')) {
      hamburger.style.backgroundColor = 'transparent';
      hamburger.style.setProperty('--before-top', '0');
      hamburger.style.setProperty('--before-rotate', '45deg');
      hamburger.style.setProperty('--after-bottom', '0');
      hamburger.style.setProperty('--after-rotate', '-45deg');
      // I'll handle the actual CSS animation via inline styles for simplicity here, 
      // but ideally this is done via a class toggle on the hamburger.
      toggleBtn.classList.add('is-active');
    } else {
      toggleBtn.classList.remove('is-active');
      hamburger.style.backgroundColor = 'var(--color-dark)';
    }
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.classList.remove('is-active');
    });
  });

  // Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150; // Offset for header
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
