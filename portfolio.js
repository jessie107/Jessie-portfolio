// Start by ensuring the file is being loaded
console.log("Portfolio JS loaded successfully");

// Path helper function for all resources
function getResourcePath(path) {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    if (!isGitHubPages) {
        // Local development - use path as-is
        return path;
    }
    
    // For GitHub Pages - handle repository path
    const pathSegments = window.location.pathname.split('/');
    // If this is a project page (username.github.io/repo-name)
    if (pathSegments.length > 2 && pathSegments[1] !== '') {
        return '/' + pathSegments[1] + '/' + path;
    }
    
    // User page (username.github.io) - use path as is
    return '/' + path;
}

function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
}

// for Typewriter effect
const texts = [
    "DEVELOPER",
    "LEARNER",
    "PROBLEM SOLVER"
];

let speed = 100;

let textElements = null;  // Initialize variable
let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if (!textElements) {
        textElements = document.querySelector(".typewriter-text");
        if (!textElements) {
            console.error("Typewriter element not found!");
            return;
        }
    }
    
    if (charcterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (!textElements) return;
    
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    }
    else {
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// Theme toggle functionality
function toggleTheme() {
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
}

// Apply saved theme on page load
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

// Modal popup functionality
function openModal(modalId) {
    console.log("Opening modal:", modalId);
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID ${modalId} not found!`);
        return;
    }
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeModal(modalId) {
    console.log("Closing modal:", modalId);
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID ${modalId} not found!`);
        return;
    }
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Close modal when clicking outside of modal content
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
}

// Fix all image paths
function fixImagePaths() {
    // Fix all image src attributes
    document.querySelectorAll('img').forEach(img => {
        const originalSrc = img.getAttribute('src');
        img.src = getResourcePath(originalSrc);
        console.log(`Updated image path: ${originalSrc} -> ${img.src}`);
    });
    
    // Fix images referenced in onclick attributes
    document.querySelectorAll('[onclick*="openFullMedia"]').forEach(el => {
        const onclick = el.getAttribute('onclick');
        // Extract the file path from the onclick attribute
        const match = onclick.match(/openFullMedia\(['"]([^'"]+)['"]/);
        if (match && match[1]) {
            const originalPath = match[1];
            const newPath = getResourcePath(originalPath);
            const newOnclick = onclick.replace(originalPath, newPath);
            el.setAttribute('onclick', newOnclick);
            console.log(`Updated onclick path: ${originalPath} -> ${newPath}`);
        }
    });
}

// Open full-screen view of a specific media
function openFullMedia(media, caption = '') {
    console.log("Opening full media:", media);
    const mediaViewModal = document.getElementById('media-view-modal');
    const container = document.getElementById('full-media-container');
    const captionElement = document.getElementById('media-caption');
    
    if (!mediaViewModal || !container || !captionElement) {
        console.error("Media view elements not found!");
        return;
    }
    
    if (media.endsWith('.pdf')) {
        container.innerHTML = `<embed class="pdf-embed" src="${media}" type="application/pdf">`;
    } else if (media.endsWith('.doc') || media.endsWith('.docx')) {
        container.innerHTML = `
            <div class="doc-viewer">
                <div class="doc-icon"><i class="fas fa-file-word fa-4x"></i></div>
                <h3>Microsoft Word Document</h3>
                <p>Word documents cannot be previewed directly in the browser.</p>
                <a href="${media}" download class="download-btn">
                    <i class="fas fa-download"></i> Download Document
                </a>
            </div>
        `;
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
    
    // Set caption if provided
    if (caption) {
        captionElement.textContent = caption;
        captionElement.style.display = 'block';
    } else {
        captionElement.style.display = 'none';
    }
    
    openModal('media-view-modal');
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    console.log("Current URL:", window.location.href);
    
    // Initialize theme and typewriter
    typeWriter();
    applyTheme();
    
    // Fix image paths - CRITICAL FOR BOTH LOCAL AND GITHUB PAGES
    fixImagePaths();
    
    // Set up listeners after everything is loaded
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        console.log("Theme toggle found");
        // No need to add another event listener as we already have onclick in HTML
    } else {
        console.error("Theme toggle not found in DOM");
    }
    
    // Check if modals exist
    const modals = document.querySelectorAll('.modal');
    console.log("Found", modals.length, "modals");
});

// Fall back if window.onload wasn't triggered
setTimeout(function() {
    if (!textElements) {
        console.log("Initializing typewriter via setTimeout");
        typeWriter();
    }
}, 1000);