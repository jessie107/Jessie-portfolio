// Simple portfolio.js with minimal path handling
(function() {
  console.log("Portfolio JS loading...");

  // SIMPLE PATH HANDLING - only applied once
  // This function checks if we're on GitHub Pages and formats paths accordingly
  function fixPath(path) {
    // Skip already processed or absolute URLs
    if (path.startsWith('http') || path.startsWith('//')) {
      return path;
    }
    
    // For GitHub Pages project sites
    if (window.location.hostname.includes('github.io')) {
      const pathSegments = window.location.pathname.split('/');
      if (pathSegments.length > 1 && pathSegments[1]) {
        // This is a project site (username.github.io/repo-name/)
        const repoName = pathSegments[1];
        // Remove any leading slashes from the path
        const cleanPath = path.replace(/^\/+/, '');
        return `/${repoName}/${cleanPath}`;
      }
    }
    
    // For local development, return path as is
    return path;
  }

  // FIX IMAGE PATHS - applied once on page load
  function fixAllImagePaths() {
    console.log("Fixing image paths...");
    
    // Fix regular <img> elements
    document.querySelectorAll('img').forEach(img => {
      if (!img.dataset.pathFixed) { // Only fix once
        const originalSrc = img.getAttribute('src');
        img.src = fixPath(originalSrc);
        img.dataset.pathFixed = 'true'; // Mark as fixed
      }
    });
    
    // Fix modal image references
    document.querySelectorAll('[onclick*="openFullMedia"]').forEach(el => {
      if (!el.dataset.pathFixed) { // Only fix once
        const onclick = el.getAttribute('onclick');
        const match = onclick.match(/openFullMedia\(['"]([^'"]+)['"]/);
        if (match && match[1]) {
          const originalPath = match[1];
          const newPath = fixPath(originalPath);
          const newOnclick = onclick.replace(originalPath, newPath);
          el.setAttribute('onclick', newOnclick);
          el.dataset.pathFixed = 'true'; // Mark as fixed
        }
      }
    });
  }

  // BASIC UI FUNCTIONS
  // Hamburger menu functions
  window.hamburg = function() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
  };

  window.cancel = function() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
  };

  // THEME FUNCTIONALITY
  // Theme toggle function
  window.toggleTheme = function() {
    console.log("Toggle theme called");
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    if (htmlElement.classList.contains('dark-theme')) {
      htmlElement.classList.remove('dark-theme');
      htmlElement.classList.add('light-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      if (themeIconMobile) {
        themeIconMobile.classList.remove('fa-sun');
        themeIconMobile.classList.add('fa-moon');
      }
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.remove('light-theme');
      htmlElement.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      if (themeIconMobile) {
        themeIconMobile.classList.remove('fa-moon');
        themeIconMobile.classList.add('fa-sun');
      }
      localStorage.setItem('theme', 'dark');
    }
  };

  // Apply saved theme on load
  function applyTheme() {
    console.log("Applying theme");
    const savedTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    if (!themeIcon) {
      console.error("Theme icon not found!");
      return;
    }
    
    if (savedTheme === 'light') {
      htmlElement.classList.remove('dark-theme');
      htmlElement.classList.add('light-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      if (themeIconMobile) {
        themeIconMobile.classList.remove('fa-sun');
        themeIconMobile.classList.add('fa-moon');
      }
    } else {
      // Default to dark theme
      htmlElement.classList.remove('light-theme');
      htmlElement.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      if (themeIconMobile) {
        themeIconMobile.classList.remove('fa-moon');
        themeIconMobile.classList.add('fa-sun');
      }
    }
  }

  // MODAL FUNCTIONALITY
  // Open modal function
  window.openModal = function(modalId) {
    console.log("Opening modal:", modalId);
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with ID ${modalId} not found!`);
      return;
    }
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Close modal function
  window.closeModal = function(modalId) {
    console.log("Closing modal:", modalId);
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with ID ${modalId} not found!`);
      return;
    }
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Media viewer function
  window.openFullMedia = function(media, caption = '') {
    console.log("Opening media:", media);
    
    const mediaViewModal = document.getElementById('media-view-modal');
    const container = document.getElementById('full-media-container');
    const captionElement = document.getElementById('media-caption');
    
    if (!mediaViewModal || !container || !captionElement) {
      console.error("Media view elements not found!");
      return;
    }
    
    if (media.endsWith('.pdf')) {
      container.innerHTML = `<embed class="pdf-embed" src="${media}" type="application/pdf">`;
    } else if (media.endsWith('.mp4') || media.endsWith('.webm')) {
      container.innerHTML = `
        <video controls class="video-player">
          <source src="${media}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      container.innerHTML = `<img src="${media}" alt="${caption || 'Full view'}">`;
    }
    
    if (caption) {
      captionElement.textContent = caption;
      captionElement.style.display = 'block';
    } else {
      captionElement.style.display = 'none';
    }
    
    openModal('media-view-modal');
  };

  // TYPEWRITER EFFECT
  const texts = ["DEVELOPER", "LEARNER", "PROBLEM SOLVER"];
  let textIndex = 0;
  let charIndex = 0;
  let textElement = null;

  function typeWriter() {
    if (!textElement) {
      textElement = document.querySelector('.typewriter-text');
      if (!textElement) {
        setTimeout(typeWriter, 500); // Try again if element not found yet
        return;
      }
    }
    
    if (charIndex < texts[textIndex].length) {
      textElement.innerHTML += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(eraseText, 1000);
    }
  }

  function eraseText() {
    if (!textElement) return;
    
    if (textElement.innerHTML.length > 0) {
      textElement.innerHTML = textElement.innerHTML.slice(0, -1);
      setTimeout(eraseText, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }

  // Click outside modal to close
  function setupModalClickOutside() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    });
  }

  // INITIALIZATION
  // Run when DOM is fully loaded
  function init() {
    console.log("Initializing portfolio...");
    
    // First fix all image paths - this happens ONCE
    fixAllImagePaths();
    
    // Apply theme
    applyTheme();
    
    // Start typewriter effect
    typeWriter();
    
    // Set up modal click-outside closing
    setupModalClickOutside();
    
    console.log("Portfolio initialized successfully!");
  }

  // Run initialization when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // DOM already loaded
    init();
  }
})();
