const currentYearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');
const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.getElementById('site-navigation');

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
}

if (menuToggle && siteNavigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNavigation.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));

        if (isOpen) {
            menuToggle.textContent = '✕ Close';
        } else {
            menuToggle.textContent = '☰ Menu';
        }
    });
}
