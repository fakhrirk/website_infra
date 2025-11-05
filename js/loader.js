

document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
});

async function loadPartials() {
  const partials = [
    loadHTML("#header-placeholder", "/_partials/header.html"),
    loadHTML("#footer-placeholder", "/_partials/footer.html"),
  ];

  // 1. Muat semua HTML partials
  await Promise.all(partials);

  // 2. Setelah HTML dimuat, jalankan semua script umum
  initializeHeaderScripts(); // Untuk menu mobile
  setActiveLink(); // Untuk highlight link
  initializeCommonScripts(); // Untuk cursor, animations, etc.
}

/**
 * Memuat file HTML ke dalam elemen yang dipilih
 */
function loadHTML(selector, url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Gagal memuat ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = data;
      }
    })
    .catch((error) => console.error(error));
}

/**
 * Menjalankan script untuk menu mobile (setelah header dimuat)
 */
function initializeHeaderScripts() {
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!mobileNavToggle || !mobileMenu) return;

  const toggleMenu = () => {
    mobileNavToggle.classList.toggle("active");
    const isMenuOpen = mobileNavToggle.classList.contains("active");

    if (isMenuOpen) {
      mobileMenu.classList.remove("invisible", "-translate-x-full");
      mobileMenu.classList.add("visible", "translate-x-0", "opacity-100");
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.remove("visible", "translate-x-0", "opacity-100");
      mobileMenu.classList.add("invisible", "-translate-x-full");
      document.body.style.overflow = "";
    }
  };

  mobileNavToggle.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavToggle.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

/**
 * Menambahkan kelas 'font-bold' ke link navigasi yang aktif
 */
function setActiveLink() {
  const navLinks = document.querySelectorAll("#main-nav a");
  const currentPath = window.location.pathname;

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
      link.classList.add("font-bold");
      link.classList.remove("font-normal");

      const dropdownMenu = link.closest(".dropdown-menu");
      if (dropdownMenu) {
        const dropdownToggle = dropdownMenu.previousElementSibling;
        dropdownToggle.classList.add("font-bold");
        dropdownToggle.classList.remove("font-normal");
      }
    } else {
      link.classList.add("font-normal");
      link.classList.remove("font-bold");
    }
  });
}

/**
 * Menjalankan script umum dari main.js (Cursor, Scroll, etc.)
 */
function initializeCommonScripts() {
  // 1. Custom Cursor
  const cursorRing = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-follower");

  if (cursorRing && cursorDot) {
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0,
      dotX = 0,
      dotY = 0;
    const ringSpeed = 0.1,
      dotSpeed = 0.7;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorRing.classList.contains("active")) {
        cursorRing.classList.add("active");
        cursorDot.classList.add("active");
      }
    });
    document.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("active");
      cursorDot.classList.remove("active");
    });

    cursorRing.style.position = "fixed";
    cursorDot.style.position = "fixed";
    cursorRing.style.left = "0";
    cursorRing.style.top = "0";
    cursorDot.style.left = "0";
    cursorDot.style.top = "0";

    function animateCursor() {
      ringX += (mouseX - ringX) * ringSpeed;
      ringY += (mouseY - ringY) * ringSpeed;
      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;

      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("mousedown", () => {
      cursorRing.classList.add("clicked");
      cursorDot.classList.add("clicked");
    });
    document.addEventListener("mouseup", () => {
      cursorRing.classList.remove("clicked");
      cursorDot.classList.remove("clicked");
    });

    // DAFTAR GABUNGAN SEMUA ELEMEN HOVER DARI SEMUA HALAMAN
    const hoverElements = document.querySelectorAll(
      "a, button, .btn, .major-card, .project-card, " +
      ".achievement-card, .branch-card, .logo-box, .logo, " +
      "blockquote, .timeline-dot, .accordion-header, .tab-button" // <-- Ditambahkan dari ppdb & artikel
    );
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursorRing.classList.add("hover")
      );
      el.addEventListener("mouseleave", () =>
        cursorRing.classList.remove("hover")
      );
    });
  }

  // 2. Scroll Animations
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // 3. Header scroll effect
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 50
        ? header.classList.add("scrolled")
        : header.classList.remove("scrolled");
    });
  }
}