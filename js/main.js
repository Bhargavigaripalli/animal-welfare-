/**
 * PAWSHAVEN - Main Application Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (hamburger && mobileMenu && mobileClose) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });

    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 2. Sticky Navbar Blur & Shadow on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleNavScroll = () => {
      if (window.scrollY > 5) {
        navbar.classList.add('scrolled', 'is-sticky');
      } else {
        navbar.classList.remove('scrolled', 'is-sticky');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run immediately on page load
  }

  // 3. Scroll to Top Button
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 5. Accordion FAQs
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const body = header.nextElementSibling;
      const isOpen = parent.classList.contains('active');

      // Close other accordion items in same group
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const itemBody = item.querySelector('.accordion-body');
        if (itemBody) itemBody.style.maxHeight = null;
      });

      if (!isOpen) {
        parent.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion by default if present
  const firstAccordion = document.querySelector('.accordion-item.active .accordion-body');
  if (firstAccordion) {
    firstAccordion.style.maxHeight = firstAccordion.scrollHeight + 'px';
  }

  // 6. Generic Tabs System (data-tab-target)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      // Group tabs by parent container or context
      const container = btn.closest('.tabs-wrapper') || btn.closest('section') || document;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content-pane, .tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 7. Newsletter Subscription Form Handler (Strict Gmail check, then render to 404 page)
  const newsletterForms = document.querySelectorAll('.footer-newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]') || form.querySelector('.footer-input');
      const errorEl = form.querySelector('.newsletter-error') || document.getElementById('newsletter-error');
      const val = input ? input.value.trim().toLowerCase() : '';
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

      if (!val || !gmailRegex.test(val)) {
        if (errorEl) errorEl.style.display = 'block';
        if (input) input.style.borderColor = '#EF4444';
        return false;
      }

      if (errorEl) errorEl.style.display = 'none';
      window.location.href = '404.html';
    });
  });

  document.querySelectorAll('.footer-input').forEach(input => {
    input.addEventListener('input', function() {
      this.style.borderColor = '';
      const err = this.parentElement.querySelector('.newsletter-error') || document.getElementById('newsletter-error');
      if (err) err.style.display = 'none';
    });
  });

  // 8. Emergency Animal Distress Report Modal Trigger
  const emergencyTriggers = document.querySelectorAll('.trigger-emergency-modal');
  const emergencyModal = document.getElementById('emergency-modal');
  if (emergencyModal) {
    emergencyTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        emergencyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeEmergency = emergencyModal.querySelector('.modal-close-btn');
    if (closeEmergency) {
      closeEmergency.addEventListener('click', () => {
        emergencyModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    emergencyModal.addEventListener('click', (e) => {
      if (e.target === emergencyModal) {
        emergencyModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const emergencyForm = document.getElementById('emergency-form');
    if (emergencyForm) {
      emergencyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        emergencyModal.classList.remove('active');
        document.body.style.overflow = '';
        showToast('🚨 Emergency dispatch alert transmitted! Rapid Rescue Unit #4 is mobilizing.', 'success');
        emergencyForm.reset();
      });
    }
  }

  // 9. Hero Quick-Donation Selection Pills
  const quickPills = document.querySelectorAll('.quick-pill');
  const heroDonateBtn = document.getElementById('hero-donate-btn');

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      quickPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const amount = pill.getAttribute('data-amount');
      if (heroDonateBtn) {
        heroDonateBtn.setAttribute('data-donate-amount', amount);
        heroDonateBtn.innerHTML = `<i class="ph-fill ph-heart icon-wiggle"></i> Donate $${amount} Urgent Care`;
      }
    });
  });

  // 10. Route Homepage Action Buttons and CTAs to 404.html
  const isHomePage = Boolean(document.querySelector('.hero-section')) ||
                     window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/') || 
                     window.location.pathname === '' || 
                     (!window.location.pathname.includes('.html') && !window.location.pathname.includes('about') && !window.location.pathname.includes('campaigns') && !window.location.pathname.includes('stories') && !window.location.pathname.includes('donate') && !window.location.pathname.includes('contact'));

  function resetAllActiveModals() {
    const dModal = document.getElementById('donation-modal');
    if (dModal) dModal.classList.remove('active');
    const eModal = document.getElementById('emergency-modal');
    if (eModal) eModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.addEventListener('pageshow', resetAllActiveModals);
  window.addEventListener('popstate', resetAllActiveModals);

  if (isHomePage) {
    const homeActionSelectors = [
      '.action-to-404',
      '#hero-donate-btn',
      '.hero-actions a',
      '.hero-case-card',
      '.hero-case-card button',
      '.quick-pill',
      '.campaign-card button',
      '.campaign-card a',
      '.campaign-card .btn',
      '#campaigns a.btn',
      '#stage-nursery .btn',
      '#stage-trauma .btn',
      '#stage-senior .btn',
      '.impact-preset-pill',
      '#impact-donate-btn',
      '.product-card button',
      '.product-card a',
      '.product-card .btn',
      '.product-card .btn-icon',
      '.wishlist-grid button',
      '.wishlist-grid a',
      '.wishlist-grid .btn',
      '.section a.btn[href="404.html"]',
      '.tab-pane a.btn',
      '.tab-pane button.btn',
      '.tab-content-pane .btn',
      '.rescue-engine-banner .btn',
      '.pet-card button',
      '.pet-card a',
      '.pet-card .btn',
      '.cta-banner .btn',
      '.cta-btns button',
      '.cta-btns a',
      '[data-campaign-title]'
    ];

    document.querySelectorAll(homeActionSelectors.join(',')).forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        resetAllActiveModals();
        window.location.href = '404.html';
      }, true);
    });

    // Document-level capture delegation for any home action click
    document.addEventListener('click', (e) => {
      if (e.target.closest('.top-bar') || e.target.closest('.navbar') || e.target.closest('.mobile-menu-overlay') || e.target.closest('.footer-dark')) {
        return;
      }
      if (e.target.closest('.tab-btn') || e.target.closest('.accordion-header') || e.target.closest('.pet-filter-btn') || e.target.closest('.campaign-filter-btn')) {
        return;
      }
      const match = e.target.closest('.action-to-404, .product-card button, .product-card .btn, .pet-card button, .pet-card a, .cta-btns button, .cta-btns a, a[href="404.html"], [data-campaign-title]');
      if (match) {
        e.preventDefault();
        e.stopImmediatePropagation();
        resetAllActiveModals();
        window.location.href = '404.html';
      }
    }, true);
  }
});

/**
 * Toast Notification System
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  
  const icon = type === 'error' ? 'ph-warning-circle' : 'ph-check-circle';
  toast.innerHTML = `
    <i class="ph-fill ${icon}"></i>
    <div>
      <p style="margin: 0; font-weight: 700; font-size: 0.95rem; color: #0F172A;">${type === 'error' ? 'Notice' : 'Success'}</p>
      <p style="margin: 0; font-size: 0.85rem; color: #64748B;">${message}</p>
    </div>
  `;

  container.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
window.showToast = showToast;
