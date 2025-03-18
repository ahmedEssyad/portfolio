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

// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  // Add floating label effect for form inputs
  const formInputs = document.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    // Add active class to labels when input has content
    input.addEventListener('input', function() {
      const label = this.nextElementSibling;
      if (this.value) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });
    
    // Check if input already has content (e.g., on page refresh)
    if (input.value) {
      input.nextElementSibling.classList.add('active');
    }
  });
  
  // Handle form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Normally you would send this data to a server
    // For demonstration, we'll just show a success message
    // and clear the form
    
    // In a real implementation, you would use fetch() or axios to send data:
    /*
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      })
    })
    .then(response => response.json())
    .then(data => {
      showNotification('Message sent successfully!', 'success');
      contactForm.reset();
      resetFormLabels();
    })
    .catch(error => {
      showNotification('Failed to send message. Please try again.', 'error');
      console.error('Error:', error);
    });
    */
    
    // Demo version - just show success and reset
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
    resetFormLabels();
  });
  
  // Function to reset form labels after form reset
  function resetFormLabels() {
    const labels = document.querySelectorAll('.form-label');
    labels.forEach(label => {
      label.classList.remove('active');
    });
  }
  
  // Function to show notifications
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to the page
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
});