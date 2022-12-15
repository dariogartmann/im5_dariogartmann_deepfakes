document.addEventListener("DOMContentLoaded", function(event) {
    
    /**
     * Iterarte over all a-tags with class scrollable.
     * 
     * Change scrolling behaviour to be smooth
     */
    document.querySelectorAll('a[href^="#"].scrollable').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });
});