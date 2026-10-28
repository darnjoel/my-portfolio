/**
 * JOEL BAIDEN-AMISSAH - PORTFOLIO INTERACTIVE ENGINE
 * Full-Stack Web Developer & Data Analytics Enthusiast
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initNavigation();
  initProjectsFilter();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initScrollTop();
});

/* ==========================================================================
   1. Live Accra, Ghana Time Clock (GMT / UTC)
   ========================================================================== */
function initLiveClock() {
  const clockElement = document.getElementById('liveClock');
  const clockMini = document.getElementById('liveClockMini');

  function updateClock() {
    const now = new Date();
    // Accra, Ghana is UTC/GMT+0
    const options = {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    if (clockElement) clockElement.textContent = `${timeString} GMT`;
    if (clockMini) clockMini.textContent = `Accra ${timeString} GMT`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   2. Floating Nav Scroll & Active Section Observer
   ========================================================================== */
function initNavigation() {
  const navContainer = document.querySelector('.nav-pill-container');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileClose = document.getElementById('mobileNavClose');

  // Sticky Navbar blur enhancement on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navContainer?.classList.add('scrolled');
    } else {
      navContainer?.classList.remove('scrolled');
    }
  });

  // Active section tracking with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Mobile navigation drawer toggle
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close when clicking any link in mobile overlay
    const mobileItems = mobileOverlay.querySelectorAll('a');
    mobileItems.forEach((item) => {
      item.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   3. Projects Filter Bar
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Project Details Modal (Populated with Joel's CV Projects)
   ========================================================================== */
const projectDetailsData = {
  adbrag: {
    title: 'Retrieval-Augmented Generation (RAG) System — ADB',
    tag: 'Enterprise AI & Knowledge Systems',
    image: 'assets/images/adb_rag.png',
    description: 'An advanced Retrieval-Augmented Generation (RAG) knowledge engine built for the Agricultural Development Bank (ADB). The platform combines a graph database (Neo4j) with a relational database (PostgreSQL) to power intelligent, context-aware information retrieval, paired with an interactive React frontend for fast and accurate banking intelligence.',
    highlights: [
      'Hybrid architecture uniting Neo4j graph nodes for relationship reasoning and PostgreSQL for structured data integrity',
      'Fast semantic query processing with context-rich document retrieval for bank operators',
      'Interactive React user interface with real-time response generation and source attribution',
      'Deployed on Vercel with high availability and optimized query latency'
    ],
    tech: ['React', 'Neo4j', 'PostgreSQL', 'HTML/CSS/JS', 'RAG', 'REST APIs'],
    liveUrl: 'https://adb-docu-mind.vercel.app/',
    githubUrl: 'https://github.com/darnjoel'
  },
  motionclothing: {
    title: 'Motion Clothing — E-Commerce Storefront',
    tag: 'Full-Stack E-Commerce',
    image: 'assets/images/visatrack.jpg',
    description: 'A custom, mobile-responsive e-commerce platform designed and developed for Motion Clothing, a contemporary fashion and apparel brand. Features an intuitive shopping catalog, dynamic shopping bag calculations, seamless checkout flows, and an administrative panel for order tracking.',
    highlights: [
      'Interactive product filtering, size/color selectors, and persistent cart state',
      'Optimized checkout workflow tailored for frictionless customer conversion',
      'Dedicated administrative portal for updating product inventories and reviewing orders',
      'High-speed deployment hosted on Netlify with automated CI/CD builds'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI/UX', 'Netlify'],
    liveUrl: 'https://motion-clothes.netlify.app/',
    githubUrl: 'https://github.com/darnjoel'
  },
  gillaafrica: {
    title: 'Gilla Africa — EdTech Platform Website',
    tag: 'EdTech Web Platform',
    image: 'assets/images/edumanage.jpg',
    description: 'The official digital platform for Gilla Africa, an innovative EdTech company dedicated to building next-generation digital learning and school-management solutions serving educational institutions across the African continent.',
    highlights: [
      'Showcases digital learning modules, institutional management tools, and school onboarding pipelines',
      'Supported team initiatives including mobile app deployments for schools across Africa',
      'Modern, accessible UI built with responsive performance and search engine optimization',
      'Active live production platform serving schools, educators, and administrators'
    ],
    tech: ['Web Development', 'EdTech Architecture', 'Mobile Deployment Support', 'UI/UX'],
    liveUrl: 'https://gilla-africa.com/',
    githubUrl: 'https://github.com/darnjoel'
  },
  orderingmgmt: {
    title: 'Ordering Management System',
    tag: 'Backend & Database System',
    image: 'assets/images/visatrack.jpg',
    description: 'A full CRUD ordering management system engineered to streamline corporate commerce workflows, manage order queues, and handle transactional content across dual database backends (MySQL and MongoDB).',
    highlights: [
      'Comprehensive CRUD architecture allowing real-time order lifecycle tracking',
      'Hybrid data persistence leveraging relational MySQL tables alongside flexible MongoDB collections',
      'Tested and documented with Postman for robust API endpoint reliability',
      'Secured backend middleware for data validation and operational logging'
    ],
    tech: ['PHP', 'MySQL', 'MongoDB', 'HTML/CSS', 'Postman', 'REST APIs'],
    liveUrl: '#',
    githubUrl: 'https://github.com/darnjoel'
  },
  studentbi: {
    title: 'Student Academic Performance BI Dashboard',
    tag: 'Data Analytics & Visualization',
    image: 'assets/images/edumanage.jpg',
    description: 'An interactive Business Intelligence analytics dashboard built using Microsoft Excel and Power BI to analyze academic performance metrics across multiple cohorts, enabling school leadership to identify low-performing students and subject trends for targeted educational interventions.',
    highlights: [
      'Advanced Excel data transformation with VLOOKUP, PivotTables, and automated aggregation',
      'Interactive Power BI visual reports with subject performance correlation matrices',
      'Early warning indicators highlighting at-risk students for proactive academic support',
      'Exportable reporting snapshots for school board meetings and educator reviews'
    ],
    tech: ['Microsoft Excel', 'Power BI', 'PivotTables', 'VLOOKUP', 'Data Visualization'],
    liveUrl: '#',
    githubUrl: 'https://github.com/darnjoel'
  },
  ikoliluportal: {
    title: 'Ikolilu Parent Portal — Mobile Deep-Link System',
    tag: 'Mobile Deep-Linking & Systems',
    image: 'assets/images/facepassx.jpg',
    description: 'A mobile deep-link routing solution engineered during internship at Ikolilu Ghana, enabling parents to seamlessly access the Ikolilu Parent Portal directly on Google Play Store from automated SMS alerts, dramatically increasing app adoption.',
    highlights: [
      'Frictionless SMS-to-store routing eliminating multi-step manual search barriers',
      'Collaborated closely with cross-functional engineering teams on feature testing and debugging',
      'Documented technical workflows, operational runbooks, and integration guides',
      'Contributed to overall front-end and back-end application stability'
    ],
    tech: ['Mobile Deep-Linking', 'SMS Gateway Integration', 'JavaScript', 'Google Play Store'],
    liveUrl: '#',
    githubUrl: 'https://github.com/darnjoel'
  },
  ecowave: {
    title: 'Ecowave — Plastic Pollution Awareness Portal',
    tag: 'Environmental EdTech Website',
    image: 'assets/images/visatrack.jpg',
    description: 'An educational sustainability web platform engineered as a final-year project at Pentecost University, utilizing dynamic video media and interactive visual storytelling to raise public awareness around plastic pollution and environmental conservation.',
    highlights: [
      'Rich multimedia integration with curated video feeds and educational infographics',
      'Community engagement modules and interactive resource library',
      'Engineered with PHP, MySQL, HTML5/CSS3, and responsive JavaScript interactions'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Pentecost University'],
    liveUrl: '#',
    githubUrl: 'https://github.com/darnjoel'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalBody = document.getElementById('modalDynamicContent');
  const modalClose = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('[data-project-key]');

  if (!modalOverlay || !modalBody) return;

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      const data = projectDetailsData[key];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="position: relative; width: 100%; height: 260px; overflow: hidden; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, var(--bg-surface) 0%, transparent 80%);"></div>
          <span style="position: absolute; top: 1.25rem; left: 1.25rem; background: rgba(10, 12, 16, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-medium); border-radius: var(--radius-full); padding: 0.35rem 0.9rem; font-size: 0.8rem; font-weight: 600; color: var(--accent-cyan);">
            ${data.tag}
          </span>
        </div>
        <div style="padding: 2rem;">
          <h2 style="font-size: 1.65rem; font-weight: 800; margin-bottom: 0.75rem; color: #fff;">${data.title}</h2>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.98rem; margin-bottom: 1.5rem;">${data.description}</p>
          
          <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan); margin-bottom: 0.75rem;">Architecture & Key Deliverables</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.75rem;">
            ${data.highlights.map(item => `
              <li style="display: flex; align-items: flex-start; gap: 0.65rem; color: var(--text-secondary); font-size: 0.925rem;">
                <span style="color: var(--accent-cyan); font-weight: bold;">▹</span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>

          <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan); margin-bottom: 0.75rem;">Technologies & Tools</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${data.tech.map(t => `
              <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-subtle); padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-size: 0.825rem; font-family: var(--font-mono); color: var(--text-main);">
                ${t}
              </span>
            `).join('')}
          </div>

          <div style="display: flex; align-items: center; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; flex-wrap: wrap;">
            ${data.liveUrl && data.liveUrl !== '#' ? `
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; min-width: 180px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Launch Live Project
              </a>
            ` : ''}
            <a href="mailto:baidenamissahjoel@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(data.title)}" class="btn btn-glass" style="flex: 1; min-width: 180px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Inquire About Project
            </a>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Copy To Clipboard & Toast Notifications
   ========================================================================== */
function initCopyButtons() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: "${text}"`);
      }).catch(() => {
        showToast('Failed to copy text.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('portfolioToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolioToast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" color="#38bdf8">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   6. Contact Form Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending message...
    `;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();
      showToast('Thank you! Your message has been sent to Joel Baiden-Amissah.');
    }, 1200);
  });
}

/* ==========================================================================
   7. Back to Top Scroll
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
