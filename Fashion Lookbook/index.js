document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables with null checks
    const carousel = {
      items: document.querySelectorAll('.carousel-item') || [],
      dots: document.querySelectorAll('.carousel-dot') || [],
      progressBar: document.querySelector('.progress-bar'),
      container: document.querySelector('.carousel')
    };

    let currentIndex = 0;
    let isAnimating = false;
    const slideInterval = 3000;
    let autoplayInterval = null;
    let progressBarInterval = null;

    function updateProgressBar() {
      if (!carousel.progressBar) return;

      let width = 0;
      carousel.progressBar.style.width = '0%';
      
      if (progressBarInterval) {
        clearInterval(progressBarInterval);
      }

      progressBarInterval = setInterval(() => {
        width += 100 / (slideInterval / 50);
        if (carousel.progressBar) {
          carousel.progressBar.style.width = `${Math.min(width, 100)}%`;
        }

        if (width >= 100) {
          clearInterval(progressBarInterval);
        }
      }, 50);
    }

    function showSlide(index) {
      if (isAnimating || !carousel.items.length) return;
      isAnimating = true;

      updateProgressBar();

      carousel.items.forEach(item => item.classList.remove('active'));
      carousel.dots.forEach(dot => dot.classList.remove('active'));

      if (carousel.items[index]) {
        carousel.items[index].classList.add('active');
      }
      
      if (carousel.dots[index]) {
        carousel.dots[index].classList.add('active');
      }

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % carousel.items.length;
      showSlide(currentIndex);
    }

    function startAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
      autoplayInterval = setInterval(nextSlide, slideInterval);
      updateProgressBar();
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
      if (progressBarInterval) {
        clearInterval(progressBarInterval);
      }
      if (carousel.progressBar) {
        carousel.progressBar.style.width = '0%';
      }
    }

    // Event Listeners
    carousel.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (currentIndex !== index) {
          currentIndex = index;
          showSlide(currentIndex);
          startAutoplay();
        }
      });
    });

    if (carousel.container) {
      carousel.container.addEventListener('mouseenter', stopAutoplay);
      carousel.container.addEventListener('mouseleave', startAutoplay);
    }

    // Visibility change handler
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Initialize the carousel
    showSlide(0);
    startAutoplay();
  });