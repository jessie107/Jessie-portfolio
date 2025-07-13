// Image path fixer for both local and GitHub Pages environments
(function() {
  // Check if we're on GitHub Pages
  const isGitHub = window.location.hostname.includes('github.io');
  
  // Get repository name (only needed for GitHub Pages project sites)
  function getRepoName() {
    if (!isGitHub) return '';
    
    const pathParts = window.location.pathname.split('/');
    // If this is a GitHub project page (username.github.io/repo-name)
    if (pathParts.length > 1) {
      return pathParts[1];
    }
    return '';
  }
  
  // Build the correct base path
  const repoName = getRepoName();
  const basePath = isGitHub && repoName ? `/${repoName}/` : '/';
  
  console.log(`Environment: ${isGitHub ? 'GitHub Pages' : 'Local'}`);
  console.log(`Base path: ${basePath}`);
  
  // Fix all image src paths
  function fixImages() {
    document.querySelectorAll('img').forEach(img => {
      // Get the filename from current src
      let currentSrc = img.getAttribute('src');
      
      // Skip if it's an absolute URL
      if (currentSrc.startsWith('http') || currentSrc.startsWith('//')) {
        return;
      }
      
      // Strip any leading slashes
      while (currentSrc.startsWith('/')) {
        currentSrc = currentSrc.substring(1);
      }
      
      // For GitHub Pages project site, prepend repo name
      if (isGitHub && repoName) {
        img.src = `/${repoName}/${currentSrc}`;
        console.log(`Fixed image path: ${currentSrc} -> /${repoName}/${currentSrc}`);
      }
    });
  }
  
  // Fix onclick attributes that open images
  function fixOnclickPaths() {
    document.querySelectorAll('[onclick*="openFullMedia"]').forEach(el => {
      const onclick = el.getAttribute('onclick');
      // Extract the quoted path from openFullMedia('path')
      const match = onclick.match(/openFullMedia\(['"]([^'"]+)['"]/);
      
      if (match && match[1]) {
        let path = match[1];
        // Skip absolute URLs
        if (path.startsWith('http') || path.startsWith('//')) {
          return;
        }
        
        // Strip leading slashes
        while (path.startsWith('/')) {
          path = path.substring(1);
        }
        
        // Replace with corrected path
        if (isGitHub && repoName) {
          const newPath = `/${repoName}/${path}`;
          const newOnclick = onclick.replace(match[1], newPath);
          el.setAttribute('onclick', newOnclick);
          console.log(`Fixed onclick path: ${path} -> ${newPath}`);
        }
      }
    });
  }
  
  // Run when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      fixImages();
      fixOnclickPaths();
    });
  } else {
    // DOM already loaded
    fixImages();
    fixOnclickPaths();
  }
})();