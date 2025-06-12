 /**
 * Fetches HTML content from a given path and injects it into a target DOM element.
 * Provides robust error handling for network issues, HTTP responses, and missing elements.
 *
 * @param {string} filePath - The path to the HTML file (e.g., "../layout/header.html").
 * @param {string} selector - The CSS selector for the target DOM element (e.g., "header", "#mySkills").
 * @returns {Promise<void>} A promise that resolves when the content is injected or rejects on error.
 */
function loadHtmlIntoElement(filePath, selector) {
  return fetch(filePath)
    .then(response => {
      // Check if the HTTP response was successful (status code 200-299)
      if (!response.ok) {
        // Log the HTTP error and return a rejected promise to stop the chain for this fetch.
        console.error(`HTTP error! Status: ${response.status} for ${filePath}`);
        // Returning Promise.reject will send this specific error to the .catch() block.
        return Promise.reject(new Error(`HTTP error ${response.status}`));
      }
      return response.text(); // Parse the response body as text
    })
    .then(data => {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        // If the target element exists, inject the fetched HTML
        targetElement.innerHTML = data;
      } else {
        // Log an error if the target element isn't found
        console.error(`Error: Element with selector "${selector}" not found in the document.`);
        // Returning Promise.reject here for consistency, though not a network error.
        return Promise.reject(new Error(`Element not found: ${selector}`));
      }
    })
    .catch(error => {
      // Catch any errors that occurred during the fetch or DOM manipulation for this specific call
      console.error(`There was a problem loading "${filePath}" into "${selector}":`, error);
      // Optionally, you can update the UI to show a fallback or error message
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        targetElement.innerHTML = `<p style="color: red;">Failed to load content.</p>`;
      }
    });
}

// --- Usage ---

// Load Header
loadHtmlIntoElement("../layout/header.html", "header");

// Load Footer
loadHtmlIntoElement("../layout/footer.html", "footer");

// Load Connect section (assuming #contactMe is where connect.html content goes)
loadHtmlIntoElement("../layout/connect.html", "#contactMe");

// Load Skills section
loadHtmlIntoElement("../layout/skills.html", "#mySkills");

// Load Projects section
loadHtmlIntoElement("../layout/projects.html", "#projectList");

document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('[data-twe-collapse-init]');
    const mobileMenuWrapper = document.querySelector('#mobileMenuWrapper');
    const navLinks = mobileMenuWrapper.querySelectorAll('a');
    const togglerSpans = navbarToggler.querySelectorAll('span');
    const mainNavbar = document.querySelector('[data-twe-navbar-ref]');

    if (navbarToggler && mobileMenuWrapper && mainNavbar) {
        // Function to open the mobile menu
        const openMobileMenu = () => {
            mobileMenuWrapper.classList.remove('hidden'); // Make it visible
            mobileMenuWrapper.classList.add(
                'absolute',         // Position absolutely within the nav
                'top-full',         // Starts right below the parent nav
                'left-0',           // Align to the left edge of the parent nav
                'w-full',           // Take full width
                'bg-white',         // Set a background color
                'z-[998]',          // Ensure it's above other content
                'flex',             // Use flexbox for internal layout
                'flex-col',         // Stack items vertically
                'items-center',     // Center items horizontally
                'shadow-lg'         // <--- ADDED SHADOW HERE
            );

            navbarToggler.setAttribute('aria-expanded', 'true');
            animateTogglerIcon(true);
        };

        // Function to close the mobile menu
        const closeMobileMenu = () => {
            mobileMenuWrapper.classList.add('hidden'); // Hide it
            mobileMenuWrapper.classList.remove(
                'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'z-[998]',
                'flex', 'flex-col', 'items-center',
                'shadow-lg'         // <--- REMOVE SHADOW HERE
            );

            navbarToggler.setAttribute('aria-expanded', 'false');
            animateTogglerIcon(false);
        };

        // Function to animate the hamburger icon (no change)
        const animateTogglerIcon = (isOpen) => {
            if (isOpen) {
                togglerSpans[0].classList.add('rotate-45', 'translate-y-[8px]');
                togglerSpans[1].classList.add('opacity-0');
            } else {
                togglerSpans[0].classList.remove('rotate-45', 'translate-y-[8px]');
                togglerSpans[1].classList.remove('opacity-0');
            }
            // Toggle the third span correctly to match the 2-line animation
            if (isOpen) {
                 togglerSpans[2].classList.add('-rotate-45', '-translate-y-[8px]');
            } else {
                 togglerSpans[2].classList.remove('-rotate-45', '-translate-y-[8px]');
            }
        };

        // Event listener for the toggler button
        navbarToggler.addEventListener('click', () => {
            const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Event listener to close the menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarToggler.getAttribute('aria-expanded') === 'true') {
                    closeMobileMenu();
                }
            });
        });

        // Handle resize for desktop breakpoint
        const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Tailwind's 'lg' breakpoint

        const handleMediaQueryChange = (e) => {
            if (e.matches) {
                // If screen size is desktop or larger, ensure menu is reset
                mobileMenuWrapper.classList.remove(
                    'hidden', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'z-[998]',
                    'flex', 'flex-col', 'items-center',
                    'shadow-lg'         // <--- REMOVE SHADOW HERE
                );
                // Re-apply original desktop classes
                mobileMenuWrapper.classList.add('lg:static', 'lg:ml-6', 'lg:flex', 'lg:h-auto', 'lg:flex-1', 'lg:items-center', 'lg:justify-between', 'lg:border-none', 'lg:bg-none', 'lg:px-0', 'lg:pt-0');
                navbarToggler.setAttribute('aria-expanded', 'false');
                animateTogglerIcon(false);
            } else {
                // If screen size is mobile, ensure menu is hidden if not explicitly opened
                if (navbarToggler.getAttribute('aria-expanded') !== 'true') {
                     mobileMenuWrapper.classList.add('hidden');
                }
            }
        };

        // Initial check and add listener for changes
        handleMediaQueryChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaQueryChange);

    } else {
        console.warn('Mobile menu toggler, menu wrapper (#mobileMenuWrapper), or main navbar not found. Check your HTML selectors.');
    }
});