export function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!track || !prevBtn || !nextBtn) return;

  const updateButtons = () => {
    if (track.scrollLeft <= 10) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  };

  const scrollByAmount = (direction) => {
    const card = track.querySelector('.card');
    if (card) {
      // Get the width of a card plus the gap (assumed 24px/1.5rem gap)
      const scrollAmount = card.clientWidth + 24; 
      track.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    }
  };

  prevBtn.addEventListener('click', () => scrollByAmount(-1));
  nextBtn.addEventListener('click', () => scrollByAmount(1));
  track.addEventListener('scroll', updateButtons);
  
  // Initial check
  updateButtons();
  
  window.addEventListener('resize', updateButtons);
}
