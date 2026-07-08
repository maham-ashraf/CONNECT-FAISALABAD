/* ============================================
   CONNECT FAISALABAD - Main JavaScript
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.classList.add('hidden');
    });
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 1500);
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    if (backToTop) {
      if (scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      if (isNaN(target)) return;
      const increment = Math.ceil(target / 60);
      let current = 0;

      function updateCounter() {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          return;
        }
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
      }
      updateCounter();
    });
  }

  // ===== HERO STAT COUNTERS =====
  function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.sc-number');
    statNumbers.forEach(function (el) {
      const target = parseInt(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      const suffix = '+';
      const increment = Math.ceil(target / 80);
      let current = 0;

      function updateStat() {
        current += increment;
        if (current >= target) {
          el.textContent = target.toLocaleString() + suffix;
          return;
        }
        el.textContent = current.toLocaleString();
        requestAnimationFrame(updateStat);
      }
      updateStat();
    });
  }

  // ===== INTERSECTION OBSERVER FOR COUNTERS =====
  let countersAnimated = false;

  function setupCounterObserver() {
    const trustSection = document.getElementById('trust');
    if (!trustSection) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(trustSection);
  }

  setupCounterObserver();

  // ===== HERO STATS ANIMATE ON LOAD =====
  setTimeout(animateHeroStats, 800);

  // ===== TRENDING SLIDER =====
  const trendingSlider = document.getElementById('trendingSlider');
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');

  if (trendingSlider && sliderPrev && sliderNext) {
    function getScrollAmount() {
      const card = trendingSlider.querySelector('.trending-card');
      if (!card) return 200;
      return card.offsetWidth + 16;
    }

    sliderPrev.addEventListener('click', function () {
      trendingSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    sliderNext.addEventListener('click', function () {
      trendingSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }

  // ===== TESTIMONIAL SLIDER =====
  const testimonialSlider = document.getElementById('testimonialSlider');
  const dotsContainer = document.getElementById('testimonialDots');

  if (testimonialSlider && dotsContainer) {
    const cards = testimonialSlider.querySelectorAll('.testimonial-card');
    const totalSlides = cards.length;
    let currentSlide = 0;
    let autoSlideInterval;

    cards.forEach(function (_, index) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        goToSlide(index);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      const offset = -currentSlide * 100;
      testimonialSlider.style.transform = 'translateX(' + offset + '%)';
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', function () {
      clearInterval(autoSlideInterval);
    });
    testimonialSlider.addEventListener('mouseleave', function () {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialSlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
        resetAutoSlide();
      }
    }
  }

  // ===== INTERSECTION OBSERVER FOR FADE-IN =====
  function setupFadeInObserver() {
    const sections = document.querySelectorAll('.section-padding');
    sections.forEach(function (section) {
      section.classList.add('fade-in-section');
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  setupFadeInObserver();

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.disabled = true;
        input.value = '';
        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  // ===== BACK TO TOP SMOOTH SCROLL =====
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== NAVBAR LINK SMOOTH SCROLL =====
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu
        const navCollapse = document.getElementById('navMenu');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // ===== AREA CARDS INTERACTION =====
  document.querySelectorAll('.area-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.area-card').forEach(function (c) {
        c.style.borderColor = '';
        c.style.background = '';
      });
      this.style.borderColor = '#D97706';
      this.style.background = 'rgba(34, 197, 94, 0.05)';
    });
  });

  // ===== CATEGORY CARD ANIMATION DELAY =====
  document.querySelectorAll('.category-card').forEach(function (card, index) {
    card.style.animationDelay = (index * 0.03) + 's';
  });

  // ============================================
  // INNER PAGES FUNCTIONALITY
  // ============================================

  // ===== FILTER TOGGLE (MOBILE) =====
  const filterToggleBtn = document.querySelector('.filter-toggle-btn');
  const filterDrawer = document.querySelector('.filter-drawer');
  const filterOverlay = document.querySelector('.filter-overlay');
  const filterDrawerClose = document.querySelector('.filter-drawer-close');

  if (filterToggleBtn && filterDrawer) {
    filterToggleBtn.addEventListener('click', function () {
      filterDrawer.classList.add('open');
      if (filterOverlay) filterOverlay.classList.add('open');
    });
  }
  if (filterDrawerClose && filterDrawer) {
    filterDrawerClose.addEventListener('click', closeFilterDrawer);
  }
  if (filterOverlay) {
    filterOverlay.addEventListener('click', closeFilterDrawer);
  }
  function closeFilterDrawer() {
    if (filterDrawer) filterDrawer.classList.remove('open');
    if (filterOverlay) filterOverlay.classList.remove('open');
  }

  // ===== FILTER COLLAPSE SECTIONS =====
  document.querySelectorAll('.filter-heading').forEach(function (heading) {
    heading.addEventListener('click', function () {
      this.classList.toggle('collapsed');
      const body = this.nextElementSibling;
      if (body) {
        if (body.style.maxHeight) {
          body.style.maxHeight = null;
        } else {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });
    // Open by default
    const body = heading.nextElementSibling;
    if (body) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });

  // ===== GRID/LIST VIEW TOGGLE =====
  const viewToggles = document.querySelectorAll('.view-toggle button');
  const businessGrid = document.getElementById('businessGrid');

  if (viewToggles.length && businessGrid) {
    viewToggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        viewToggles.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        const view = this.getAttribute('data-view');
        if (view === 'list') {
          businessGrid.classList.add('list-view');
        } else {
          businessGrid.classList.remove('list-view');
        }
      });
    });
  }

  // ===== SEARCH SUGGESTIONS =====
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      const val = this.value.trim();
      let suggestionsEl = this.parentElement.querySelector('.search-suggestions');
      if (val.length > 0) {
        if (!suggestionsEl) {
          suggestionsEl = document.createElement('div');
          suggestionsEl.className = 'search-suggestions';
          this.parentElement.appendChild(suggestionsEl);
        }
        const suggestions = getSuggestions(val);
        if (suggestions.length) {
          suggestionsEl.innerHTML = suggestions.map(function (s) {
            return '<div class="suggestion-item"><i class="fas fa-search"></i> ' + s + '</div>';
          }).join('');
          suggestionsEl.style.display = 'block';
          suggestionsEl.querySelectorAll('.suggestion-item').forEach(function (item) {
            item.addEventListener('click', function () {
              input.value = this.textContent.trim();
              suggestionsEl.style.display = 'none';
            });
          });
        } else {
          suggestionsEl.style.display = 'none';
        }
      } else {
        if (suggestionsEl) suggestionsEl.style.display = 'none';
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(function () {
        const el = input.parentElement.querySelector('.search-suggestions');
        if (el) el.style.display = 'none';
      }, 200);
    });
  });

  function getSuggestions(query) {
    const data = [
      'Software House', 'Restaurant', 'Hospital', 'University', 'Gym',
      'Digital Marketing Agency', 'Web Development Company', 'Cafe',
      'Real Estate Agency', 'Travel Agency', 'Dental Clinic', 'Pharmacy',
      'Lawyer', 'Architect', 'Photographer', 'Salon', 'Hotel',
      'Marriage Hall', 'Clothing Brand', 'Furniture Store'
    ];
    return data.filter(function (item) {
      return item.toLowerCase().includes(query.toLowerCase());
    }).slice(0, 6);
  }

  // ===== PAGINATION CLICK =====
  document.querySelectorAll('.pagination .page-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (this.parentElement.classList.contains('disabled')) {
        e.preventDefault();
        return;
      }
      document.querySelectorAll('.pagination .page-item').forEach(function (item) {
        item.classList.remove('active');
      });
      this.parentElement.classList.add('active');
      // Scroll to top of results
      const resultsBar = document.querySelector('.results-bar');
      if (resultsBar) {
        resultsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  let lightboxImages = [];
  let currentImageIndex = 0;

  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    document.querySelectorAll('.gallery-item').forEach(function (item, index) {
      item.addEventListener('click', function () {
        const items = document.querySelectorAll('.gallery-item');
        lightboxImages = [];
        items.forEach(function (el) {
          const img = el.querySelector('img');
          if (img) lightboxImages.push(img.src);
        });
        currentImageIndex = index;
        openLightbox();
      });
    });

    function openLightbox() {
      if (lightboxImages.length === 0) return;
      updateLightboxImage();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
      if (lightboxImg && lightboxImages[currentImageIndex]) {
        lightboxImg.src = lightboxImages[currentImageIndex];
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentImageIndex + 1) + ' / ' + lightboxImages.length;
      }
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxImage();
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightboxImage();
      });
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length; updateLightboxImage(); }
      if (e.key === 'ArrowRight') { currentImageIndex = (currentImageIndex + 1) % lightboxImages.length; updateLightboxImage(); }
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ===== STAR RATING INPUT =====
  document.querySelectorAll('.star-rating-input').forEach(function (container) {
    const stars = container.querySelectorAll('i');
    let currentRating = 0;

    stars.forEach(function (star, index) {
      star.addEventListener('mouseenter', function () {
        stars.forEach(function (s, i) {
          s.classList.toggle('active', i <= index);
        });
      });
      star.addEventListener('mouseleave', function () {
        stars.forEach(function (s, i) {
          s.classList.toggle('active', i < currentRating);
        });
      });
      star.addEventListener('click', function () {
        currentRating = index + 1;
        container.setAttribute('data-rating', currentRating);
      });
    });
  });

  // ===== WRITE REVIEW FORM =====
  const reviewForm = document.getElementById('writeReviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const textarea = this.querySelector('textarea');
      if (textarea && textarea.value.trim()) {
        showToast('success', 'Review Submitted', 'Your review has been posted successfully.');
        textarea.value = '';
        const stars = this.querySelector('.star-rating-input');
        if (stars) {
          stars.querySelectorAll('i').forEach(function (s) { s.classList.remove('active'); });
          stars.removeAttribute('data-rating');
        }
      } else {
        showToast('error', 'Error', 'Please write a review before submitting.');
      }
    });
  }

  // ===== TOAST NOTIFICATION SYSTEM =====
  window.showToast = function (type, title, message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML =
      '<div class="toast-icon ' + type + '"><i class="fas ' + (icons[type] || icons.info) + '"></i></div>' +
      '<div class="toast-content"><strong>' + title + '</strong><span>' + message + '</span></div>' +
      '<button class="toast-close"><i class="fas fa-times"></i></button>';
    container.appendChild(toast);
    toast.querySelector('.toast-close').addEventListener('click', function () {
      removeToast(toast);
    });
    setTimeout(function () { removeToast(toast); }, 4000);
  };

  function removeToast(toast) {
    toast.classList.add('hiding');
    setTimeout(function () { if (toast.parentElement) toast.remove(); }, 300);
  }

  // ===== MODAL SYSTEM =====
  window.openModal = function (config) {
    let backdrop = document.querySelector('.modal-custom-backdrop');
    let modal = document.querySelector('.modal-custom');
    if (!backdrop || !modal) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-custom-backdrop';
      modal = document.createElement('div');
      modal.className = 'modal-custom';
      document.body.appendChild(backdrop);
      document.body.appendChild(modal);
    }
    const icons = {
      success: 'fa-check-circle icon-success',
      error: 'fa-times-circle icon-error',
      warning: 'fa-exclamation-circle icon-warning',
      info: 'fa-info-circle icon-info'
    };
    modal.innerHTML =
      '<button class="modal-custom-close"><i class="fas fa-times"></i></button>' +
      '<div class="modal-custom-icon"><i class="fas ' + (icons[config.type] || icons.info) + '"></i></div>' +
      '<h3 class="modal-custom-title">' + config.title + '</h3>' +
      '<p class="modal-custom-text">' + config.message + '</p>' +
      '<div class="modal-custom-actions">' +
        (config.buttons || '<button class="btn btn-accent rounded-pill px-4 modal-confirm-btn">OK</button>') +
      '</div>';
    backdrop.classList.add('open');
    modal.classList.add('open');

    function closeModal() {
      backdrop.classList.remove('open');
      modal.classList.remove('open');
    }
    modal.querySelector('.modal-custom-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    modal.querySelector('.modal-confirm-btn')?.addEventListener('click', function () {
      if (config.onConfirm) config.onConfirm();
      closeModal();
    });
  };

  // ===== ACCOUNT TYPE TOGGLE =====
  document.querySelectorAll('.account-type-toggle .type-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.account-type-toggle .type-option').forEach(function (o) { o.classList.remove('active'); });
      this.classList.add('active');
      const val = this.getAttribute('data-type');
      const extraFields = document.getElementById('businessExtraFields');
      if (extraFields) {
        extraFields.style.display = val === 'business' ? 'block' : 'none';
      }
    });
  });

  // ===== PASSWORD TOGGLE =====
  document.querySelectorAll('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      if (input) {
        const type = input.getAttribute('type');
        input.setAttribute('type', type === 'password' ? 'text' : 'password');
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
      }
    });
  });

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== TABS =====
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const tabGroup = this.closest('.tabs');
      if (!tabGroup) return;
      tabGroup.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      const target = this.getAttribute('data-tab');
      const parent = tabGroup.parentElement;
      parent.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      const targetContent = parent.querySelector('[data-tab-content="' + target + '"]');
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // ===== ALERT DISMISS =====
  document.querySelectorAll('.alert .alert-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.parentElement.remove();
    });
  });

  // ===== FORM VALIDATION =====
  document.querySelectorAll('.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      this.querySelectorAll('[required]').forEach(function (input) {
        if (!input.value.trim()) {
          input.classList.add('error');
          valid = false;
        } else {
          input.classList.remove('error');
          input.classList.add('success');
        }
      });
      this.querySelectorAll('input[type="email"]').forEach(function (input) {
        if (input.value.trim() && !isValidEmail(input.value.trim())) {
          input.classList.add('error');
          valid = false;
        }
      });
      if (valid) {
        showToast('success', 'Success', 'Form submitted successfully!');
        this.reset();
        this.querySelectorAll('.form-input').forEach(function (i) { i.classList.remove('success'); });
      } else {
        showToast('error', 'Error', 'Please fill in all required fields.');
      }
    });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ===== SMOOTH SCROLL FOR PAGE LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1 && !href.includes('tab') && !href.includes('collapse')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  console.log('%c Connect Faisalabad 🚀', 'font-size:18px; font-weight:bold; color:#D97706;');
  console.log('%c Connecting Businesses. Empowering Faisalabad.', 'font-size:12px; color:#57534E;');
});
