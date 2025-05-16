class ImageSlider {
  constructor(sliderElement) {
    this.slider = sliderElement;
    this.slides = Array.from(this.slider.querySelectorAll(".slide"));
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    // Create navigation dots
    this.createDots();

    // Create prev/next buttons
    this.createNavButtons();

    // Show first slide
    this.showSlide(0);

    // Start autoplay
    this.startAutoPlay();

    // Add touch events for mobile
    this.addTouchEvents();

    // Add keyboard navigation
    this.addKeyboardEvents();
  }

  createDots() {
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("slider-dots");

    this.slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => this.showSlide(index));
      dotsContainer.appendChild(dot);
    });

    this.slider.appendChild(dotsContainer);
    this.dots = Array.from(dotsContainer.children);
  }

  createNavButtons() {
    const prevButton = document.createElement("button");
    prevButton.classList.add("slider-nav", "prev");
    prevButton.innerHTML = "&#10094;";
    prevButton.setAttribute("aria-label", "Previous slide");

    const nextButton = document.createElement("button");
    nextButton.classList.add("slider-nav", "next");
    nextButton.innerHTML = "&#10095;";
    nextButton.setAttribute("aria-label", "Next slide");

    prevButton.addEventListener("click", () => this.prevSlide());
    nextButton.addEventListener("click", () => this.nextSlide());

    this.slider.appendChild(prevButton);
    this.slider.appendChild(nextButton);
  }

  showSlide(index) {
    // Update current index
    this.currentIndex = index;

    // Update slides
    this.slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
      slide.setAttribute("aria-hidden", i !== index);
    });

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", i === index);
    });
  }

  nextSlide() {
    const newIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(newIndex);
  }

  prevSlide() {
    const newIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(newIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  addTouchEvents() {
    this.slider.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.touches[0].clientX;
        this.stopAutoPlay();
      },
      { passive: true }
    );

    this.slider.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
        this.startAutoPlay();
      },
      { passive: true }
    );
  }

  handleSwipe() {
    const difference = this.touchStartX - this.touchEndX;
    const threshold = 50;

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  addKeyboardEvents() {
    this.slider.setAttribute("tabindex", "0");
    this.slider.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.prevSlide();
          break;
        case "ArrowRight":
          this.nextSlide();
          break;
      }
    });
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".image-slider");
  if (slider) {
    new ImageSlider(slider);
  }
});
