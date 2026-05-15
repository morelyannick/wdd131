const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const currentYear = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');

function updateFooterDates() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    if (lastModified) {
        lastModified.textContent = `Last modified: ${document.lastModified}`;
    }
}

function toggleNavigation() {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
        navToggle.textContent = '✕ Close';
    } else {
        navToggle.textContent = '☰ Menu';
    }
}

if (navToggle && siteNav) {
    navToggle.addEventListener('click', toggleNavigation);
}

updateFooterDates();
