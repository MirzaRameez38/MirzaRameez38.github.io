// theme-manager.js - Shared theme management for all pages

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // 1. Find the theme toggle button on the page
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // 2. Apply the saved theme from localStorage (or default to light)
    applyTheme();
    
    // 3. Add event listener to the theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Function to toggle between light and dark themes
    function toggleTheme() {
        // Get current theme
        const currentTheme = localStorage.getItem('theme') || 'light';
        // Set new theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Apply the new theme
        applyTheme();
    }
    
    // Function to apply the theme from localStorage
    function applyTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update icon if it exists
        if (themeIcon) {
            if (savedTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }
});

// Apply theme immediately (before DOM loaded) to prevent flickering
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();