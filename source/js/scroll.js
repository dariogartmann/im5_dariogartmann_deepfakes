document.addEventListener("DOMContentLoaded", function(event) {
    // smooth scrolling for anchors with class="scrollable"
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