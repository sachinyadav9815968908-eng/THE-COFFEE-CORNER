// Wait for the entire HTML document to be loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // === 1. JS-POWERED RESPONSIVE MENU ===
  const navToggle = document.querySelector('label[for="click"]'); // The <label> is our toggle button
  const navMenu = document.querySelector("nav ul");
  const navLinks = document.querySelectorAll("nav ul li a"); // Get all nav links
  const menuBtn = document.querySelector(".menu_btn");
  const closeBtn = document.querySelector(".close_btn");

  if (navToggle && navMenu) {
    // When the toggle button is clicked
    navToggle.addEventListener("click", (e) => {
      navMenu.classList.toggle("show-menu");

      // Toggle button icons
      if (navMenu.classList.contains("show-menu")) {
        menuBtn.style.display = "none";
        closeBtn.style.display = "block";
      } else {
        menuBtn.style.display = "block";
        closeBtn.style.display = "none";
      }
    });
  }

  // Close the mobile menu when a link is clicked
  if (navLinks && navMenu) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
        // Also reset the button icons
        menuBtn.style.display = "block";
        closeBtn.style.display = "none";
      });
    });
  }

  // === 2. CONTACT FORM VALIDATION ===
  const contactForm = document.querySelector(".contact_form form");
  const nameField = document.getElementById("Name");
  const emailField = document.getElementById("email");
  const numberField = document.getElementById("number");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Prevent the form from submitting by default
      e.preventDefault();

      let isValid = true;

      // Simple validation
      if (nameField.value.trim() === "") {
        isValid = false;
        alert("Please enter your full name.");
        nameField.focus();
        return;
      }

      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        alert("Please enter a valid email address.");
        emailField.focus();
        return;
      }

      if (numberField.value.trim() === "") {
        isValid = false;
        alert("Please enter your contact number.");
        numberField.focus();
        return;
      }

      // If all checks pass
      if (isValid) {
        alert("Thank you for your message! (Form submitted successfully)");
        contactForm.reset(); // Clear the form
      }
    });
  }

  // === 3. ACTIVE NAV-LINK ON SCROLL (SCROLLSPY) ===
  // Get all sections that have an ID
  const sections = document.querySelectorAll("section[id]");
  const navListItems = document.querySelectorAll("nav ul li a");

  if (sections.length > 0 && navListItems.length > 0) {
    const updateActiveLink = () => {
      let currentSectionId = "home"; // Default to 'home'

      // Find the section that is most "current"
      // We'll check from the bottom up
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if the top of the viewport is *past* the top of the section
        // Add a 100px offset to trigger a bit later
        if (window.scrollY >= sectionTop - 100) {
          currentSectionId = section.getAttribute("id");
        }
      });

      // Now update the active class on the nav links
      navListItems.forEach((link) => {
        link.classList.remove("active");
        // The link's href is like "#about", but the section ID is "about"
        if (link.getAttribute("href") === "#" + currentSectionId) {
          link.classList.add("active");
        }
        // Special case for the "Home" link
        if (
          currentSectionId === "home" &&
          link.getAttribute("href") === "#"
        ) {
          link.classList.add("active");
        }
      });
    };

    // Run the function once on load
    updateActiveLink();

    // Run the function every time the user scrolls
    window.addEventListener("scroll", updateActiveLink);
  }
});