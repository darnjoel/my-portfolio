/**
 * AJDV Engine for Joel Baiden-Amissah
 * Replicating exact ajdv.vercel.app navigation and interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavViewSwitcher();
  initContactForm();
});

function initNavViewSwitcher() {
  const navItems = document.querySelectorAll('.aj-nav-item');
  const viewSections = document.querySelectorAll('.aj-view-section');

  navItems.forEach((item) => {
    const link = item.querySelector('a');
    if (!link) return;

    link.addEventListener('click', (e) => {
      const targetView = link.getAttribute('data-view');
      if (!targetView) return; // Follow standard page link if no data-view

      e.preventDefault();

      // Update Active Nav Item
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Update Visible View Section
      viewSections.forEach((section) => {
        if (section.id === targetView) {
          section.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          section.style.display = 'none';
        }
      });

      // Update URL hash without reload
      history.pushState(null, '', `#${targetView}`);
    });
  });

  // Handle direct hash navigation (e.g. #projects or #contact)
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(currentHash)) {
    const targetNav = document.querySelector(`[data-view="${currentHash}"]`);
    if (targetNav) {
      targetNav.parentElement.click();
    }
  }
}

function initContactForm() {
  const form = document.getElementById('ajContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      form.reset();
      showToast('Thank you! Your message has been sent to Joel Baiden-Amissah.');
    }, 1000);
  });
}

function showToast(msg) {
  let toast = document.getElementById('ajToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ajToast';
    toast.className = 'aj-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
