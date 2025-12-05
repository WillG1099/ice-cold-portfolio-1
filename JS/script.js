const carousel = document.querySelector(".hero-carousel");


/* Add shadow to header on scroll */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Select the button
const seeMoreBtn = document.querySelector('#see-more-btn');

// Select all hidden project cards
const hiddenCards = document.querySelectorAll('.project-card.hidden');

// Add click event
seeMoreBtn.addEventListener('click', () => {
  // Loop through each hidden card and toggle the hidden class
  hiddenCards.forEach(card => {
    card.classList.toggle('hidden');
  });

     // Toggle button text
  if (seeMoreBtn.innerText === 'See More') {
    seeMoreBtn.innerText = 'See Less';
  } else {
    seeMoreBtn.innerText = 'See More';
  }
});

// =========================
// HERO CAROUSEL
// =========================

const slides = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

let current = 0;

// Set the first slide active
slides[current].classList.add("active");

// Go to slide index safely
function goToSlide(index) {
  slides[current].classList.remove("active");
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
}

// Buttons
prevBtn.addEventListener("click", () => {
  goToSlide(current - 1);
});

nextBtn.addEventListener("click", () => {
  goToSlide(current + 1);
});


// =========================
// KEYBOARD SUPPORT
// =========================

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    goToSlide(current - 1);
  }
  if (e.key === "ArrowRight") {
    goToSlide(current + 1);
  }
});


// =========================
// AUTO ROTATION
// =========================

let autoRotateInterval = null;

// start auto slide
function startAutoRotate() {
  // every 5 seconds, go forward
  autoRotateInterval = setInterval(() => {
    goToSlide(current + 1);
  }, 5000);
}

// stop when user interacts
function stopAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateInterval = null;
}

// start rotation immediately
startAutoRotate();

// pause on hover
carousel.addEventListener("mouseenter", stopAutoRotate);

// resume on mouse leave
carousel.addEventListener("mouseleave", startAutoRotate);

carousel.addEventListener("mouseenter", () => console.log("hover"));
carousel.addEventListener("mouseleave", () => console.log("leave"));

/* ============================
   Smooth Scroll With Easing +
   Sticky Header Offset
============================ */

// Smooth and natural easing
// Smoothest easing for scroll animations
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


// Smooth scrolling function
function smoothScrollTo(targetY) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 900; // Not too fast, not too slow
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}



// Attach to nav links
document.querySelectorAll('.site-nav a, .header-cta a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only act on in-page links like #about #projects etc.
        if (!href.startsWith('#')) return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (!target) return;

        const header = document.querySelector('.site-header');
        const headerHeight = header.offsetHeight;

        // Compute target Y, minus header height for visibility
        const targetY = target.offsetTop - headerHeight - 10;

        smoothScrollTo(targetY, 1100);
    });
});



// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  let currentIndex = 0;
  let autoRotateInterval;

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
  }

  // Buttons
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto rotate every 5 seconds
  function startAutoRotate() {
    autoRotateInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  const carousel = document.querySelector(".hero-carousel");

  carousel.addEventListener("mouseenter", stopAutoRotate);
  carousel.addEventListener("mouseleave", startAutoRotate);

  // Start rotation and show first slide
  showSlide(currentIndex);
  startAutoRotate();
});

// ========== ScrollSpy ==========

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-list a");

const spyObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-list a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => spyObserver.observe(section));

// ========== Reveal on Scroll ==========
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach(item => revealObserver.observe(item));

// ========== Back to Top Button ==========
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
