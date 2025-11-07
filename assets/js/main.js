// =====================================================
// IMPRO UK MARINE SERVICE - OPTIMIZED JAVASCRIPT
// Phase 1: Production-ready code (no debug logs)
// =====================================================

(function() {
  'use strict';

  // =====================================================
  // MOBILE MENU TOGGLE
  // =====================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  // Close menu on nav link click
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // =====================================================
  // DROPDOWN TOGGLE (Mobile)
  // =====================================================
  const dropdown = document.querySelector('.nav-menu .dropdown');
  const dropdownLink = dropdown && dropdown.querySelector('.has-sub');

  if (dropdown && dropdownLink) {
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });

    // Close dropdown when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  // =====================================================
  // FAQ ACCORDION (Scoped to #faq_block)
  // =====================================================
  const faqItems = document.querySelectorAll('#faq_block .item');
  
  faqItems.forEach((item) => {
    const btn = item.querySelector('.ctrl');
    const panel = item.querySelector('.panel');
    
    if (!btn || !panel) return;
    
    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('aria-expanded') === 'true';
      
      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.setAttribute('aria-expanded', 'false');
        const otherPanel = otherItem.querySelector('.panel');
        const otherBtn = otherItem.querySelector('.ctrl');
        if (otherPanel) otherPanel.style.maxHeight = '0px';
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      
      // Open clicked item if it was closed
      if (!isOpen) {
        item.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
    
    // Set initial state
    if (item.getAttribute('aria-expanded') === 'true') {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
  
  // Recalculate FAQ panel heights on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll('#faq_block .item[aria-expanded="true"] .panel').forEach(panel => {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    }, 250);
  });

  // =====================================================
  // OFFERS SLIDER CONTROLS
  // =====================================================
  const slider = document.getElementById('offerSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function scrollByCard(direction) {
    if (!slider) return;
    
    const card = slider.querySelector('.offer-card');
    if (!card) return;
    
    const amount = card.offsetWidth + 28; // card width + gap
    slider.scrollBy({
      left: direction * amount,
      behavior: 'smooth'
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => scrollByCard(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => scrollByCard(1));
  }

  // Touch swipe for slider (optional enhancement)
  if (slider) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        scrollByCard(1); // Swipe left
      } else if (touchEndX - touchStartX > swipeThreshold) {
        scrollByCard(-1); // Swipe right
      }
    }
  }

  // =====================================================
  // SCROLL SPY (Active Nav Links)
  // =====================================================
  const sections = Array.from(document.querySelectorAll('header, section'));
  const navLinksForSpy = Array.from(document.querySelectorAll('.nav-menu .nav-link'));
  
  function getLinkByHref(id) {
    return navLinksForSpy.find(link => link.getAttribute('href') === '#' + id);
  }
  
  function updateActiveLink() {
    let currentSection = 'home';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        currentSection = section.id || currentSection;
      }
    });
    
    navLinksForSpy.forEach(link => link.classList.remove('active'));
    
    const activeLink = getLinkByHref(currentSection);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateActiveLink, 50);
  }, { passive: true });
  
  // Initial check
  updateActiveLink();

  // =====================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignore empty hash or just '#'
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      }
    });
  });

  // =====================================================
  // COOKIE CONSENT
  // =====================================================
  const COOKIE_KEY = 'impro_cookie_prefs_v1';
  const cookieBar = document.querySelector('.cookiebar');
  const cookieModal = document.getElementById('cbModal');
  const btnAccept = document.getElementById('cbAcceptBtn');
  const btnOptions = document.getElementById('cbOptionsBtn');
  const btnSave = document.getElementById('cbSave');
  const btnCancel = document.getElementById('cbCancel');
  const chkAnalytics = document.getElementById('cbAnalytics');
  const chkMarketing = document.getElementById('cbMarketing');

  function getPreferences() {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function setPreferences(prefs) {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    } catch (e) {
      // Storage not available
    }
  }

  function showCookieBar() {
    if (cookieBar) cookieBar.style.display = 'block';
  }

  function hideCookieBar() {
    if (cookieBar) cookieBar.style.display = 'none';
  }

  function openCookieModal() {
    if (cookieModal) {
      cookieModal.style.display = 'flex';
      cookieModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCookieModal() {
    if (cookieModal) {
      cookieModal.style.display = 'none';
      cookieModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Check if user has already set preferences
  const prefs = getPreferences();
  if (!prefs) {
    showCookieBar();
  }

  // Accept all cookies
  if (btnAccept) {
    btnAccept.addEventListener('click', () => {
      setPreferences({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now()
      });
      hideCookieBar();
    });
  }

  // Open options modal
  if (btnOptions) {
    btnOptions.addEventListener('click', () => {
      const currentPrefs = getPreferences() || { analytics: false, marketing: false };
      if (chkAnalytics) chkAnalytics.checked = !!currentPrefs.analytics;
      if (chkMarketing) chkMarketing.checked = !!currentPrefs.marketing;
      openCookieModal();
    });
  }

  // Save custom preferences
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      setPreferences({
        necessary: true,
        analytics: chkAnalytics ? chkAnalytics.checked : false,
        marketing: chkMarketing ? chkMarketing.checked : false,
        timestamp: Date.now()
      });
      closeCookieModal();
      hideCookieBar();
    });
  }

  // Cancel modal
  if (btnCancel) {
    btnCancel.addEventListener('click', closeCookieModal);
  }

  // Close modal on overlay click
  if (cookieModal) {
    cookieModal.addEventListener('click', (e) => {
      if (e.target === cookieModal) {
        closeCookieModal();
      }
    });
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cookieModal && cookieModal.style.display === 'flex') {
      closeCookieModal();
    }
  });

  // =====================================================
  // LAZY LOADING IMAGES (Optional Enhancement)
  // =====================================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

})();