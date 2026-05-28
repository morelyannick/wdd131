// Get current year and last modified date
document.addEventListener('DOMContentLoaded', function () {
    // Update current year if needed
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Get last modified date
    document.lastModified;
});
