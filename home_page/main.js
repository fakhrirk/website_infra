

const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const toggleMenu = () => {
  mobileNavToggle.classList.toggle('active');
  const isMenuOpen = mobileNavToggle.classList.contains('active');
  
  if (isMenuOpen) {
    // Tampilkan menu
    mobileMenu.classList.remove('invisible', '-translate-x-full');
    mobileMenu.classList.add('visible', 'translate-x-0', 'opacity-100');
    document.body.style.overflow = 'hidden'; // Mencegah scroll body
  } else {
    // Sembunyikan menu
    mobileMenu.classList.remove('visible', 'translate-x-0', 'opacity-100');
    mobileMenu.classList.add('invisible', '-translate-x-full');
    document.body.style.overflow = ''; // Mengizinkan scroll body kembali
  }
};

mobileNavToggle.addEventListener('click', toggleMenu);

// Menutup menu saat salah satu link di-klik (opsional tapi disarankan)
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNavToggle.classList.contains('active')) {
            toggleMenu();
        }
    });
});

  // Custom Cursor
  const cursorRing = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-follower');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let dotX = 0;
  let dotY = 0;
  // Adjust speed values for different animation feel
  const ringSpeed = 0.10; // Ring lags more
  const dotSpeed = 0.7;  // Dot is more responsive

  document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!cursorRing.classList.contains('active')) {
          cursorRing.classList.add('active');
          cursorDot.classList.add('active');
      }
  });

  document.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('active');
      cursorDot.classList.remove('active');
  });

  function animateCursor() {
      // Move ring towards mouse with a delay
      ringX += (mouseX - ringX) * ringSpeed;
      ringY += (mouseY - ringY) * ringSpeed;

      // Move dot towards mouse faster
      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;
      
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      
      requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Click animation listeners
  document.addEventListener('mousedown', () => {
      cursorRing.classList.add('clicked');
      cursorDot.classList.add('clicked');
  });
  document.addEventListener('mouseup', () => {
      cursorRing.classList.remove('clicked');
      cursorDot.classList.remove('clicked');
  });

  // Hover effect listeners
  const hoverElements = document.querySelectorAll('a, button, .btn, .major-card, .project-card, .achievement-card, .branch-card, .logo-box, .logo');
  hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  // Parallax Effect
  const parallaxElements = document.querySelectorAll('.parallax-element');
  document.addEventListener('mousemove', (e) => {
    const mouseXPercent = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseYPercent = (e.clientY / window.innerHeight - 0.5) * 2;
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      const x = mouseXPercent * 50 * speed;
      const y = mouseYPercent * 50 * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Scroll Animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale');
  animatedElements.forEach(el => observer.observe(el));

  // Header scroll effect
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    window.pageYOffset > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
  });

  // Filter buttons logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-primary-blue', 'text-white', 'font-bold');
        b.classList.add('bg-transparent', 'text-text-gray');
      });
      btn.classList.add('active', 'bg-primary-blue', 'text-white', 'font-bold');
      btn.classList.remove('bg-transparent', 'text-text-gray');
    });
  });
  
  // Stagger animation (using CSS transition-delay for simplicity)
  const addStaggerAnimation = (selector, delay = 100) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      item.style.transitionDelay = `${index * delay}ms`;
    });
  };
  addStaggerAnimation('.major-card', 150);
  addStaggerAnimation('.project-card', 150);
  addStaggerAnimation('.achievement-card', 150);
  addStaggerAnimation('.branch-card', 100);
  addStaggerAnimation('.logo-box', 50);

  const branchCards = document.querySelectorAll('.branch-card');

branchCards.forEach(card => {
    const cardImage = card.querySelector('img');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        // Calculate translation for parallax effect
        const moveX = ((x - centerX) / centerX) * 20; // Max 20px movement
        const moveY = ((y - centerY) / centerY) * 20;

        // Apply 3D transform to image
        cardImage.style.transform = `
        scale(1.1) 
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        translate(${moveX}px, ${moveY}px)
      `;
    });

    card.addEventListener('mouseleave', () => {
        // Reset transform when mouse leaves
        cardImage.style.transform = 'scale(1) perspective(1000px) rotateX(0) rotateY(0) translate(0, 0)';
    });
});

  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  const totalSlides = 7;
  let isAnimating = false;

  function updateCarousel(direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    // Add animation class based on direction
    carouselTrack.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Animate slides
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        // Current slide fade in and scale up
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
      } else {
        // Other slides fade out
        slide.style.opacity = '0.3';
        slide.style.transform = 'scale(0.95)';
      }
    });

    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Update indicators with animation
    indicators.forEach((indicator, index) => {
      indicator.style.transition = 'all 0.3s ease-in-out';
      if (index === currentIndex) {
        indicator.classList.remove('bg-gray-300');
        indicator.classList.add('bg-primary-blue');
        indicator.style.transform = 'scale(1.3)';
        indicator.style.width = '32px';
        indicator.style.borderRadius = '6px';
      } else {
        indicator.classList.remove('bg-primary-blue');
        indicator.classList.add('bg-gray-300');
        indicator.style.transform = 'scale(1)';
        indicator.style.width = '12px';
        indicator.style.borderRadius = '50%';
      }
    });

    // Animate navigation buttons
    if (direction === 'next') {
      nextBtn.style.transform = 'scale(0.9) rotate(10deg)';
      setTimeout(() => {
        nextBtn.style.transform = 'scale(1) rotate(0deg)';
      }, 150);
    } else {
      prevBtn.style.transform = 'scale(0.9) rotate(-10deg)';
      setTimeout(() => {
        prevBtn.style.transform = 'scale(1) rotate(0deg)';
      }, 150);
    }

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel('prev');
  });

  nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel('next');
  });

  // Indicator click functionality with animation
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      if (isAnimating || currentIndex === index) return;
      const direction = index > currentIndex ? 'next' : 'prev';
      currentIndex = index;
      updateCarousel(direction);
    });
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });

  // Add swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextBtn.click();
    }
    if (touchEndX > touchStartX + 50) {
      prevBtn.click();
    }
  }

  // Initialize carousel with first slide animation
  updateCarousel();

  // Auto-play carousel (optional - uncomment to enable)
  let autoplayInterval = setInterval(() => {
    nextBtn.click();
  }, 5000);

  // Pause autoplay on hover (if autoplay is enabled)
  carouselTrack.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  carouselTrack.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
      nextBtn.click();
    }, 5000);
  });

// --- SCRIPT PERBAIKAN UNTUK FILTER PROYEK JURUSAN ---

// 1. Data untuk setiap kartu proyek (tidak ada perubahan di sini)
const projectsData = {
  dkv: [
    {
      image: '../images/76e803f72748c92743ac8e76d8c672f488b9ada0.png',
      title: 'Web Design',
      description: 'Craft Engaging, User Friendly Website, provide the best website for user.',
      tags: ['Landing Page', 'School Website', 'Portfolio']
    },
    {
      image: '../images/0894bad173f73a2fff816853a3f05614630e0dfc.png',
      title: 'UI/UX Design',
      description: 'Create Simple, User Friendly App, also with the Feature and others.',
      tags: ['UI Design', 'UX Design', 'Prototype', 'Product Design', 'User Flow']
    },
    {
      image: '../images/6d0dc842ceb4601ba70f047c1a7478ba5822bf04.png',
      title: 'Graphic Design',
      description: 'Make an Amazing & Beneficial Design, that is useful for user property.',
      tags: ['UI Design', 'UX Design', 'Prototype', 'Product Design', 'User Flow']
    }
  ],
  tkj: [
    {
      image: '../images/routing.png',
      title: 'Routing',
      description: 'Build your network, master digital connections with Cisco certification.',
      tags: ['Topology', 'Cisco', 'Packet Tracer']
    },
    {
      image: '../images/tkj_certification.png',
      title: 'Certification',
      description: 'Master modern networking technology and earn an international certification.',
      tags: ['Networking', 'Experience', 'Certification', 'Cisco', 'Knowledge']
    },
    {
      image: '../images/switching.png',
      title: 'Switching',
      description: 'Strong routing, fast switching — your future stays connected.',
      tags: ['Data', 'Layer', 'Packet', 'Switch', 'Hardware']
    }
  ],
  rpl: [
    {
      image: '../images/web_dev.png',
      title: 'Website Dev',
      description: 'Developing Website using the HTML, CSS & JavaScript Language.',
      tags: ['Landing Page', 'Dashboard', 'Absention Website']
    },
    {
      image: '../images/mobile_app.png',
      title: 'Mobile Application',
      description: 'Develop cross-platform mobile apps with beautiful UI and smooth performance.',
      tags: ['Mobile', 'Application', 'Printing App', 'E-Commerce', 'Shop']
    },
    {
      image: '../images/rpl_certification.png',
      title: 'Certification',
      description: 'Create complete solutions from frontend to backend with modern frameworks.',
      tags: ['Course', 'Certification', 'Code', 'Knowledge', 'Experience']
    }
  ]
};

// 2. Fungsi untuk menampilkan kartu proyek berdasarkan kategori (Dengan Perbaikan)
function renderProjects(category) {
  const container = document.getElementById('projects-container');
  if (!container) return; 

  const projects = projectsData[category];
  
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    container.innerHTML = projects.map(project => `
      <div class="project-card bg-white rounded-2xl shadow-[0px_4px_25px_0px_rgba(0,0,0,0.15)] overflow-hidden p-2 flex flex-col gap-2 transition-all duration-300 ease-in-out hover:-translate-y-2.5 hover:shadow-[0px_15px_40px_rgba(0,0,0,0.25)] group">
        <div class="overflow-hidden rounded-lg">
          <img src="${project.image}" alt="${project.title}" class="w-full h-[200px] object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110">
        </div>
        
        <div class="p-4 rounded-lg flex flex-col gap-4 flex-grow" style="background-color: #f0f0f0;">
          <h3 class="text-3xl font-semibold leading-10 text-text-dark">${project.title}</h3>
          
          <p class="text-base font-medium leading-6 text-text-gray">${project.description}</p>
          
          <div class="flex flex-wrap gap-2 mt-auto">
            ${project.tags.map(tag => `<span class="bg-white text-text-gray text-sm py-1.5 px-2.5 rounded-full transition-all duration-300 ease-in-out hover:bg-primary-blue hover:text-white hover:scale-110">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
    
    setTimeout(() => {
      container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 50);

  }, 300);
}

// 3. Logika untuk tombol filter (tidak ada perubahan di sini)
const projectFilterButtons = document.querySelectorAll('.project-filter-btn');

// Add a click event listener to each button
projectFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    
    projectFilterButtons.forEach(b => {
      b.classList.remove('bg-primary-blue', 'text-white', 'font-bold');
      b.classList.add('bg-transparent', 'text-text-gray');
    });
    
    btn.classList.add('bg-primary-blue', 'text-white', 'font-bold');
    btn.classList.remove('bg-transparent', 'text-text-gray');
    
    renderProjects(category);
  });
});

// 4. Panggilan Awal (tidak ada perubahan di sini)
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('dkv');
});

const branchPopupBackdrop = document.getElementById('branch-popup-backdrop');
const allPopupCards = branchPopupBackdrop.querySelectorAll('.flex-col[id^="Popup-"]'); // Selects all popup cards

/**
 * Shows a specific popup by its ID and displays the backdrop.
 * @param {string} popupId The ID of the popup element to show (e.g., 'Popup-jonggol').
 */
function showBranchPopup(popupId) {
  // First, hide all popups to ensure a clean state
  allPopupCards.forEach(card => {
    card.classList.add('hidden');
    card.classList.remove('flex');
  });

  // Find the specific popup card the user wants to see
  const targetPopup = document.getElementById(popupId);

  // If the target exists, show it and the backdrop
  if (targetPopup) {
    targetPopup.classList.remove('hidden');
    targetPopup.classList.add('flex');
    branchPopupBackdrop.classList.remove('hidden');
  }
}

/**
 * Hides the backdrop and all popup cards.
 */
function closeBranchPopups() {
  branchPopupBackdrop.classList.add('hidden');
}

// Add an event listener to the backdrop to close it when clicked
branchPopupBackdrop.addEventListener('click', closeBranchPopups);

// Add an event listener to each card to prevent closing when the card itself is clicked
allPopupCards.forEach(card => {
  card.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click from reaching the backdrop
  });
});  

  function toggleDropdown(id) {
    const dropdown = document.getElementById(`dropdown-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);

    if (dropdown.classList.contains('max-h-0')) {
      dropdown.classList.remove('max-h-0', 'opacity-0');
      dropdown.classList.add('max-h-[1000px]', 'opacity-100');
      arrow.classList.add('rotate-180');
    } else {
      dropdown.classList.add('max-h-0', 'opacity-0');
      dropdown.classList.remove('max-h-[1000px]', 'opacity-100');
      arrow.classList.remove('rotate-180');
    }
  }
