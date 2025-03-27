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
        link.href = 'https://drive.google.com/file/d/1D9bZCkNdxJdmXiK5qziKJmNZJoZL2iEe/view?usp=drivesdk'; // Replace with your actual CV URL
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
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Disable submit button during submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Submit form using Fetch API
    fetch('https://formspree.io/f/manedwjq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message
      })
    })
    .then(response => {
      if (response.ok) {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset(); // Clear form fields
        
        // Reset form labels
        const labels = contactForm.querySelectorAll('.form-label');
        labels.forEach(label => {
          label.classList.remove('active');
        });
      } else {
        // Handle error response
        return response.json().then(errorData => {
          throw new Error(errorData.error || 'Failed to send message');
        });
      }
    })
    .catch(error => {
      console.error('Submission Error:', error);
      showNotification(error.message || 'Network error. Please try again.', 'error');
    })
    .finally(() => {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
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
