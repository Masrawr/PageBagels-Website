/*
 * SMALL WEBSITE INTERACTIONS
 * Edit your business text, menu, prices, hours, and links in index.html.
 * Edit colors, spacing, and fonts in styles.css.
 * This file handles the mobile navigation, menu filters, and unfinished links.
 * No installation or build tools required: open index.html in a browser.
 */

document.documentElement.classList.add('js-enabled');

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function closeNavigation() {
  navToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
}

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('is-open', !expanded);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNavigation);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    closeNavigation();
    navToggle.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeNavigation();
});

const filterButtons = document.querySelectorAll('.filter-button');
const menuGroups = document.querySelectorAll('.menu-group');
const menuStatus = document.querySelector('#menu-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle('active', selected);
      filterButton.setAttribute('aria-pressed', String(selected));
    });
    menuGroups.forEach((group) => {
      group.hidden = category !== 'all' && group.dataset.category !== category;
    });
    menuStatus.textContent = `Showing ${button.textContent.trim().toLowerCase()}.`;
  });
});

// Adding a real URL in index.html enables a delivery link automatically.
const deliveryLinks = document.querySelectorAll('[data-delivery]');
let configuredDeliveryLinks = 0;
deliveryLinks.forEach((link) => {
  const href = link.getAttribute('href').trim();
  if (/^https?:\/\//i.test(href)) {
    link.querySelector('.delivery-status').textContent = 'Order online';
    configuredDeliveryLinks += 1;
  } else {
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#delivery-note').textContent = `${link.dataset.delivery} ordering is not available yet. Please contact the deli to place an order.`;
    });
  }
});
if (configuredDeliveryLinks > 0) {
  document.querySelector('#delivery-note').textContent = 'Delivery availability, fees, and menu prices may vary by service.';
}

// Keep unfinished phone, email, and map links from opening an empty destination.
document.querySelectorAll('[data-placeholder]').forEach((link) => {
  if (link.getAttribute('href').trim() === '#') {
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#contact-feedback').textContent = `${link.dataset.placeholder} will be available once the store details are added.`;
    });
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
