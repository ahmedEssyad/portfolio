document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    
    navToggle.addEventListener("click", function() {
      navMenu.classList.toggle("show");
      navToggle.classList.toggle("active");
    });
  
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        navMenu.classList.remove("show");
        navToggle.classList.remove("active");
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.querySelector('.cv-download-button');
    
    downloadButton.addEventListener('click', function() {
      // Add active class to show progress
      downloadButton.classList.add('active');
      
      // Simulate download completion after 2 seconds
      setTimeout(function() {
        downloadButton.classList.add('complete');
        
        // Actual download action
        const link = document.createElement('a');
        link.href = 'YOUR_CV_URL_HERE'; // Replace with your actual CV URL
        link.download = 'محمد_اسياد_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset after 3 seconds
        setTimeout(function() {
          downloadButton.classList.remove('active', 'complete');
        }, 3000);
      }, 2000);
    });
  });

