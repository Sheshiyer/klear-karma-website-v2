import { preloadImages, preloadFonts } from './utils.js';

// Initialize Splitting for text animations
Splitting();

// DOM Elements
const slides = document.querySelectorAll('.slide');
const pills = document.querySelector('.pills');

// Check if GSAP plugins are available
const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

// Register ScrollTrigger if available
if (hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero entrance animations
const initHeroAnimations = () => {
  const heroQualifier = document.querySelector('.hero__qualifier');
  const heroTitle = document.querySelector('.hero__title');
  const heroSubhead = document.querySelector('.hero__subhead');
  const heroCtas = document.querySelector('.hero__ctas');
  
  const tl = gsap.timeline({ delay: 0.3 });
  
  if (heroQualifier) {
    tl.to(heroQualifier, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  if (heroTitle) {
    tl.to(heroTitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');
  }
  
  if (heroSubhead) {
    tl.to(heroSubhead, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');
  }
  
  if (heroCtas) {
    tl.to(heroCtas, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }
};

// Scroll-triggered section animations
const initScrollAnimations = () => {
  if (!hasScrollTrigger) return;
  
  // Animate elements with [data-animate] attributes
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  animatedElements.forEach((el) => {
    const animateType = el.dataset.animate;
    const delay = parseFloat(el.dataset.delay) || 0;
    
    let fromVars = {};
    let toVars = {
      duration: 0.8,
      ease: 'power3.out',
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    };
    
    if (animateType === 'fade-up') {
      fromVars = { opacity: 0, y: 40 };
      toVars.opacity = 1;
      toVars.y = 0;
    } else if (animateType === 'fade-right') {
      fromVars = { opacity: 0, x: -40 };
      toVars.opacity = 1;
      toVars.x = 0;
    } else if (animateType === 'fade-left') {
      fromVars = { opacity: 0, x: 40 };
      toVars.opacity = 1;
      toVars.x = 0;
    }
    
    gsap.fromTo(el, fromVars, toVars);
  });
  
  // Problem cards stagger animation
  const problemCards = document.querySelectorAll('.problem__card');
  if (problemCards.length > 0) {
    gsap.fromTo(problemCards, 
      { y: 30, scale: 0.95 },
      {
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.problem__visual',
          start: 'top 80%'
        }
      }
    );
  }
  
  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat__number[data-count]');
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.dataset.count);
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(stat, {
          innerHTML: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          onUpdate: function() {
            stat.innerHTML = Math.round(this.targets()[0].innerHTML);
          }
        });
      },
      once: true
    });
  });
  
  // Hero parallax
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
  
  // CTA parallax
  const ctaBg = document.querySelector('.cta__bg');
  if (ctaBg) {
    gsap.to(ctaBg, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
};

// Video hover handling with GSAP
const initVideoHover = () => {
  slides.forEach((slide) => {
    const video = slide.querySelector('.slide__video');
    const img = slide.querySelector('.slide__img');
    
    if (!video) return;
    
    // Preload video metadata
    video.load();
    
    slide.addEventListener('mouseenter', () => {
      // GSAP animation for smooth crossfade
      gsap.to(img, {
        opacity: 0,
        scale: 1.02,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(video, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => {
          video.currentTime = 0;
          video.play().catch(() => {}); // Catch autoplay restrictions
        }
      });
    });
    
    slide.addEventListener('mouseleave', () => {
      // GSAP animation for smooth crossfade back
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      });
      
      gsap.to(video, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          video.pause();
          video.currentTime = 0;
        }
      });
    });
  });
};

// Preload and initialize
Promise.all([
  preloadImages('.slide__img'),
  preloadFonts()
]).then(() => {
  document.body.classList.remove('loading');
  
  // Initialize video hover effects
  initVideoHover();
  
  // Initial animation: slides come in with stagger
  gsap.fromTo(slides, {
    opacity: 0,
    y: 100,
    scale: 0.95
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: 'power3.out',
    stagger: {
      amount: 0.4,
      from: 'center'
    }
  });
  
  // Pills fade in with stagger
  const pillElements = document.querySelectorAll('.pill');
  gsap.fromTo(pillElements, {
    opacity: 0,
    y: 20,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: 0.1,
    delay: 0.8
  });
  
  // Initialize hero entrance animations
  initHeroAnimations();
  
  // Initialize scroll-triggered animations
  initScrollAnimations();
});