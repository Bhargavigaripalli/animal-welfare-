/**
 * PAWSHAVEN - GSAP & ScrollTrigger Animations
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP or ScrollTrigger not loaded. Using CSS fallbacks.");
    document.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left, .scale-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Fade-in elements
  gsap.utils.toArray('.fade-in').forEach(el => {
    let delayVal = getDelay(el);
    gsap.from(el, {
      opacity: 0,
      duration: 0.8,
      delay: delayVal,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 2. Slide-up elements
  gsap.utils.toArray('.slide-up').forEach(el => {
    let delayVal = getDelay(el);
    gsap.from(el, {
      opacity: 0,
      y: 35,
      duration: 0.85,
      delay: delayVal,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 3. Slide-right elements
  gsap.utils.toArray('.slide-right').forEach(el => {
    let delayVal = getDelay(el);
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      delay: delayVal,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 4. Slide-left elements
  gsap.utils.toArray('.slide-left').forEach(el => {
    let delayVal = getDelay(el);
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      delay: delayVal,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 5. Scale-in elements
  gsap.utils.toArray('.scale-in').forEach(el => {
    let delayVal = getDelay(el);
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.85,
      delay: delayVal,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 6. Animated Counter Numbers
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target') || 0;
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        let countObj = { val: 0 };
        gsap.to(countObj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const currentFormatted = Math.floor(countObj.val).toLocaleString();
            counter.innerText = `${prefix}${currentFormatted}${suffix}`;
          }
        });
      }
    });
  });

  // 7. Dynamic Progress Bars on Scroll
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-progress') || '75%';
    bar.style.width = '0%';

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.4,
          ease: 'power2.out'
        });
      }
    });
  });

  // 8. Subtle Floating Layered Parallax for Hero Elements
  const heroSection = document.querySelector('.hero-section');
  const heroImg = document.querySelector('.hero-img-main');
  const badge1 = document.querySelector('.floating-badge-1');
  const badge2 = document.querySelector('.floating-badge-2');
  const badge3 = document.querySelector('.floating-badge-3');
  const caseCard = document.querySelector('.hero-case-card');

  if (heroSection && heroImg) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
      const mouseY = ((e.clientY - rect.top) / rect.height) - 0.5;

      gsap.to(heroImg, {
        x: mouseX * 18,
        y: mouseY * 18,
        duration: 1.2,
        ease: 'power1.out'
      });

      if (badge1) {
        gsap.to(badge1, {
          x: mouseX * -25,
          y: mouseY * -25,
          duration: 1.4,
          ease: 'power1.out'
        });
      }

      if (badge2) {
        gsap.to(badge2, {
          x: mouseX * 22,
          y: mouseY * 22,
          duration: 1.5,
          ease: 'power1.out'
        });
      }

      if (badge3) {
        gsap.to(badge3, {
          x: mouseX * -18,
          y: mouseY * 18,
          duration: 1.3,
          ease: 'power1.out'
        });
      }

      if (caseCard) {
        gsap.to(caseCard, {
          x: mouseX * -15,
          y: mouseY * -15,
          duration: 1.2,
          ease: 'power1.out'
        });
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      [heroImg, badge1, badge2, badge3, caseCard].forEach(el => {
        if (el) {
          gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: 'power2.out' });
        }
      });
    });
  }

  function getDelay(element) {
    if (element.classList.contains('delay-100')) return 0.1;
    if (element.classList.contains('delay-200')) return 0.2;
    if (element.classList.contains('delay-300')) return 0.3;
    if (element.classList.contains('delay-400')) return 0.4;
    if (element.classList.contains('delay-500')) return 0.5;
    return 0;
  }
});
