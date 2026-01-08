document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
     1️⃣ Active Navbar Link On Scroll
  ============================= */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  /* ==============================
     2️⃣ Dark / Light Mode Switch
  ============================= */
  const themeToggleButton = document.getElementById("theme-toggle-button");
  const html = document.documentElement;

  themeToggleButton.addEventListener("click", () => {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    themeToggleButton.setAttribute("aria-pressed", isDark);
  });

  /* ==============================
     3️⃣ Portfolio Tabs
  ============================= */
  const filterButtons = document.querySelectorAll(".portfolio-filter");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      portfolioItems.forEach((item) => {
        item.style.display =
          filter === "all" || item.dataset.category === filter
            ? "block"
            : "none";
      });
    });
  });

  /* ==============================
     4️⃣ Testimonials Carousel
  ============================= */
  const carousel = document.getElementById("testimonials-carousel");
  const slides = carousel.querySelectorAll(".testimonial-card");
  const nextBtn = document.getElementById("next-testimonial");
  const prevBtn = document.getElementById("prev-testimonial");
  const indicators = document.querySelectorAll(".carousel-indicator");

  let currentIndex = 0;

  function cardsPerPage() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function updateCarousel(index) {
    const perPage = cardsPerPage();
    const slideWidth = slides[0].offsetWidth + 16; // +gap if you have px-4 on cards
    const offset = index * slideWidth * perPage;
    carousel.style.transform = `translateX(-${offset}px)`;

    // Update indicators
    indicators.forEach((dot, i) => {
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
      dot.classList.toggle("bg-accent", i === index);
      dot.classList.toggle("bg-slate-400", i !== index);
    });

    currentIndex = index;
  }

  function maxIndex() {
    return Math.ceil(slides.length / cardsPerPage()) - 1;
  }

  nextBtn.addEventListener("click", () => {
    updateCarousel(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    updateCarousel(currentIndex <= 0 ? maxIndex() : currentIndex - 1);
  });

  indicators.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      updateCarousel(index);
    });
  });

  setInterval(() => {
    updateCarousel(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
  }, 5000);

  window.addEventListener("resize", () => {
    updateCarousel(currentIndex);
  });

  updateCarousel(0);

  /* ==============================
     5️⃣ Scroll To Top Button
  ============================= */
  const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
      scrollBtn.classList.add("opacity-100");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
      scrollBtn.classList.remove("opacity-100");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
