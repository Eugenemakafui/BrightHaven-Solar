export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('is-open');
      
      // Close all items
      faqItems.forEach(faq => faq.classList.remove('is-open'));
      
      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('is-open');
      }
    });
  });
}
