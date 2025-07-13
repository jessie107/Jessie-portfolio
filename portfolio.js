// Start by ensuring the file is being loaded
console.log("Portfolio JS loaded successfully");

// Path helper function - detects environment and returns correct path
function getCorrectPath(path) {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (!isGitHubPages) {
        // Local environment - use path as-is
        return path;
    }
    
    // Get repository name from URL path for GitHub Pages
    const pathSegments = window.location.pathname.split('/');
    let repoName = '';
    
    // If this is a project page (not user page)
    if (pathSegments.length > 1 && pathSegments[1]) {
        repoName = pathSegments[1];
        
        // Clean the path (remove any leading slashes)
        const cleanPath = path.replace(/^\/+/, '');
        return `/${repoName}/${cleanPath}`;
    }
    
    // User page (username.github.io) - just ensure leading slash
    return path.startsWith('/') ? path : `/${path}`;
}

// Fix all image paths on page load
function fixAllImagePaths() {
    console.log("Fixing image paths...");
    
    // Fix <img> elements
    document.querySelectorAll('img').forEach(img => {
        const originalSrc = img.getAttribute('src');
        // Skip already absolute URLs
        if (originalSrc.startsWith('http') || originalSrc.startsWith('//')) {
            return;
        }
        
        const newSrc = getCorrectPath(originalSrc);
        img.src = newSrc;
        console.log(`Updated image: ${originalSrc} → ${newSrc}`);
    });
    
    // Fix onclick attributes that reference images
    document.querySelectorAll('[onclick*="openFullMedia"]').forEach(el => {
        const onclick = el.getAttribute('onclick');
        // Extract the path from openFullMedia('path')
        const match = onclick.match(/openFullMedia\(['"]([^'"]+)['"]/);
        
        if (match && match[1]) {
            const originalPath = match[1];
            // Skip absolute URLs
            if (originalPath.startsWith('http') || originalPath.startsWith('//')) {
                return;
            }
            
            const newPath = getCorrectPath(originalPath);
            const newOnclick = onclick.replace(match[1], newPath);
            el.setAttribute('onclick', newOnclick);
            console.log(`Updated onclick: ${originalPath} → ${newPath}`);
        }
    });
    
    // Fix video sources
    document.querySelectorAll('video source').forEach(source => {
        const originalSrc = source.getAttribute('src');
        if (originalSrc.startsWith('http') || originalSrc.startsWith('//')) {
            return;
        }
        
        const newSrc = getCorrectPath(originalSrc);
        source.src = newSrc;
    });
    
    // Fix PDF embeds
    document.querySelectorAll('embed[type="application/pdf"]').forEach(embed => {
        const originalSrc = embed.getAttribute('src');
        if (originalSrc.startsWith('http') || originalSrc.startsWith('//')) {
            return;
        }
        
        const newSrc = getCorrectPath(originalSrc);
        embed.src = newSrc;
    });
}

// Basic navigation functions
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

// Media gallery functionality
const galleryData = {
    about: ['about1.jpg', 'about2.jpg'],
    cyber: ['cyber1.jpg', 'cyber2.jpg'],
    web: ['web1.jpg', 'web2.jpg'],
    python: ['python1.jpg', 'python2.jpg', 'python3.jpg', 'python4.jpg'],
    computing: ['computing1.jpg', 'computing2.jpg'],
    leadership: ['Leadership_class.jpg', 'Leadership_class2.jpg', 'Leadership_class3.jpg'],
    cca: ['CCA1.jpg', 'CCA2.jpg'],
    cert: [
        { src: 'AMC_cert.jpg', title: 'Australian Mathematics Competition Certificate' },
        { src: 'ASSMC_cert.jpg', title: 'All Singapore Secondary Maths Competition Certificate' },
        { src: 'MasterChef_cert.jpg', title: 'Master Chef Competition Certificate' },
        { src: 'HSI_cert.jpg', title: 'Historical Scene Investigation Certificate' },
        { src: 'SoleStories_cert.jpg', title: 'Sole Stories Workshop Certificate' },
        { src: 'NUS_cert.jpg', title: 'NUS Computing Workshop Certificate' }
    ],
    cooking: ['cooking1.jpg', 'cooking2.jpg', 'cooking3.jpg', 'cooking4.jpg'],
    lockpicking: ['lockpicking_video.mp4'],
    photography: [
        'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 
        'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 
        'photo9.jpg', 'photo10.jpg'
    ]
};

// Display a media item in the container
function displayMedia(container, media, title = '') {
    // Get the correct path for the media
    const mediaPath = getCorrectPath(media);
    
    if (mediaPath.endsWith('.pdf')) {
        container.innerHTML = `<embed class="pdf-embed" src="${mediaPath}" type="application/pdf">`;
    } else if (mediaPath.endsWith('.doc') || mediaPath.endsWith('.docx')) {
        container.innerHTML = `
            <div class="doc-viewer">
                <div class="doc-icon"><i class="fas fa-file-word fa-4x"></i></div>
                <h3>Microsoft Word Document</h3>
                <p>Word documents cannot be previewed directly in the browser.</p>
                <a href="${mediaPath}" download class="download-btn">
                    <i class="fas fa-download"></i> Download Document
                </a>
            </div>
        `;
    } else if (mediaPath.endsWith('.mp4') || mediaPath.endsWith('.webm')) {
        container.innerHTML = `
            <video controls class="video-player">
                <source src="${mediaPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        container.innerHTML = `<img src="${mediaPath}" alt="${title || 'Media'}">`;
    }
    
    // Update title if provided
    if (title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'media-title';
        titleElement.textContent = title;
        container.appendChild(titleElement);
    }
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
    
    // No need to process the path here - it's already been processed
    // in the onclick attribute by fixAllImagePaths()
    
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

// Fix certificate image references
function fixCertificateImages() {
    console.log("Fixing certificate images");
    // Fix any certificate related issues
    document.querySelectorAll('.certificate-item img').forEach(img => {
        console.log("Processing certificate image:", img.src);
        // Make sure the certificate images have proper paths
        if (img.src.endsWith('cert') || !img.src.includes('.')) {
            const imgSrc = img.src;
            const baseSrc = imgSrc.substring(0, imgSrc.lastIndexOf('/') + 1);
            const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
            img.src = `${baseSrc}${imgName}.jpg`;
            console.log("Updated image src:", img.src);
        }
    });
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    console.log("Current URL:", window.location.href);
    console.log("Path:", window.location.pathname);
    
    // First initialize theme and typewriter
    typeWriter();
    applyTheme();
    
    // Fix all image paths BEFORE trying to display them
    fixAllImagePaths();
    fixCertificateImages();
    
    // Additional check to ensure theme toggle works
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        console.log("Theme toggle found");
        // This element already has onclick in the HTML, so we don't add another handler
    } else {
        console.error("Theme toggle not found in DOM");
    }
    
    // Check if modals exist
    const modals = document.querySelectorAll('.modal');
    console.log("Found", modals.length, "modals");
    
    // Add environment info to console
    const isGitHub = window.location.hostname.includes('github.io');
    const pathSegments = window.location.pathname.split('/');
    const repoName = pathSegments.length > 1 ? pathSegments[1] : '';
    console.log(`Environment: ${isGitHub ? 'GitHub Pages' : 'Local Development'}`);
    if (isGitHub) {
        console.log(`Repository name: ${repoName || 'User site'}`);
    }
});

// Fall back if window.onload wasn't triggered
setTimeout(function() {
    if (!textElements) {
        console.log("Initializing typewriter via setTimeout");
        typeWriter();
    }
}, 1000);
