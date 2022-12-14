document.addEventListener("DOMContentLoaded", function(event) {
    const BUTTON_ID = 'mobile_menu_button';
    const MAIN_CONTENT_CLASS = 'main_content';
    const MOBILE_NAV_ID = 'navigation_mobile';
    const MOBILE_NAV_LINK_CLASS = 'mobile_navlink';

    let menuButton = document.getElementById(BUTTON_ID);
    let mainContent = document.getElementsByClassName(MAIN_CONTENT_CLASS)[0]; // yes I know, a bit hacky...  but in my case it is always here so hopefully no errors
    let mobileMenu = document.getElementById(MOBILE_NAV_ID)
    let mobileButtons = document.getElementsByClassName(MOBILE_NAV_LINK_CLASS);

    let isMenuOpen = false; // State of the menu

    if(menuButton == null || mobileButtons.length == 0) {
        // Required DOM structure not available. Stop execution
        return;
    }

    /**
     * Burger-Button in top right of website to toggle the menu
     */
    menuButton.addEventListener('click', function(event) {
        event.preventDefault();
        toggleMenu();
    });

    /**
     * Iterate through all found mobilebuttons and listen for button clicks. 
     * 
     * Don't stop propagation for link to work.
     */
    for (var index = 0; index < mobileButtons.length; index++) {
        var button = mobileButtons.item(index);
        
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // toggle/close menu
            toggleMenu();
    
            // scroll into view 
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    }

    /**
     * toggles the menu based on isMenuOpen and updates state.
     */
    function toggleMenu(){
        if(isMenuOpen) {
            // close menu
            console.log("menu closing");

            mainContent.style.right = '0';
            mobileMenu.style.right = '-280px'

            menuButton.innerHTML = '<i class="fa fa-bars"></i>'
            isMenuOpen = false;
        }else{
            // open menu
            console.log("menu opening");

            mainContent.style.right = '280px';
            mobileMenu.style.right = "0"

            menuButton.innerHTML = '<i class="fa fa-times"></i>'
            isMenuOpen = true;
        }
    }
});