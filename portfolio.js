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

const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
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
    const savedTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
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
    document.getElementById(modalId).style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
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
    python: ['python1.jpg', 'python2.jpg'],
    computing: ['computing1.jpg', 'computing2.jpg'],
    leadership: ['leadership1.jpg', 'leadership2.jpg', 'leadership3.jpg'],
    cca: ['cca1.jpg', 'cca2.jpg'],
    cert: [
        { src: 'certs/AMC_cert.jpg', title: 'Australian Mathematics Competition Certificate' },
        { src: 'certs/ASSMC_cert.jpg', title: 'All Singapore Secondary Maths Competition Certificate' },
        { src: 'certs/MasterChef_cert.jpg', title: 'Master Chef Competition Certificate' },
        { src: 'certs/HSI_cert.jpg', title: 'Historical Scene Investigation Certificate' },
        { src: 'certs/CT_cert.jpg', title: 'Computational Thinking Certificate' },
        { src: 'certs/SoleStories_cert.jpg', title: 'Sole Stories Workshop Certificate' },
        { src: 'certs/NUS_cert.jpg', title: 'NUS Computing Workshop Certificate' }
    ],
    cooking: ['cooking1.jpg', 'cooking2.jpg'],
    lockpicking: ['lockpicking1.jpg', 'lockpicking2.jpg', 'lockpicking3.jpg', 'lockpicking_demo.mp4'],
    photography: [
        'photos/photo1.jpg', 'photos/photo2.jpg', 'photos/photo3.jpg', 'photos/photo4.jpg', 
        'photos/photo5.jpg', 'photos/photo6.jpg', 'photos/photo7.jpg', 'photos/photo8.jpg', 
        'photos/photo9.jpg', 'photos/photo10.jpg'
    ]
};

// Display a media item in the container
function displayMedia(container, media, title = '') {
    if (media.endsWith('.pdf')) {
        container.innerHTML = `<embed class="pdf-embed" src="${media}" type="application/pdf">`;
    } else if (media.endsWith('.doc') || media.endsWith('.docx')) {
        // For Word documents, show a placeholder with download option
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
        container.innerHTML = `<img src="${media}" alt="${title || 'Media'}">`;
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
    const mediaViewModal = document.getElementById('media-view-modal');
    const container = document.getElementById('full-media-container');
    const captionElement = document.getElementById('media-caption');
    
    if (media.endsWith('.pdf')) {
        container.innerHTML = `<embed class="pdf-embed" src="${media}" type="application/pdf">`;
    } else if (media.endsWith('.doc') || media.endsWith('.docx')) {
        // For Word documents, show a placeholder with download option
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

// Handle file uploads - Replaced with notification function
function handleFileUpload(input, galleryType) {
    alert("This feature has been disabled. Please contact the administrator to add photos.");
}

// Document ready function
window.onload = function() {
    typeWriter();
    applyTheme();
    
    // Current date and time in footer
    const currentDateTime = "2025-07-13 13:59:07";
    const currentLogin = "jessie107";
    
    // Fix certificate image references
    fixCertificateImages();
};

// Fix certificate image references
function fixCertificateImages() {
    // Fix any certificate related issues
    document.querySelectorAll('.certificate-item img').forEach(img => {
        // Make sure the certificate images have proper paths
        if (img.src.endsWith('cert') || !img.src.includes('.')) {
            const imgSrc = img.src;
            const baseSrc = imgSrc.substring(0, imgSrc.lastIndexOf('/') + 1);
            const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
            img.src = `${baseSrc}${imgName}.jpg`;
        }
    });
}