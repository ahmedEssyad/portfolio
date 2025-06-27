/**
 * Portfolio JavaScript - Optimized Version
 * Mohamed Essyad Portfolio - Modern ES6+ Implementation
 */

class PortfolioManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initNavigation();
      this.initDownloadButton();
      this.initContactForm();
      this.initScrollEffects();
      this.initAccessModal();
    });
  }

  // Navigation Management
  initNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        navToggle.classList.remove("active");
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("show");
        navToggle.classList.remove("active");
      }
    });
  }

  // CV Download Animation
  initDownloadButton() {
    const downloadButton = document.querySelector('.cv-download-button');
    
    if (!downloadButton) return;

    downloadButton.addEventListener('click', async () => {
      try {
        downloadButton.classList.add('active');
        
        await this.delay(2000);
        downloadButton.classList.add('complete');
        
        // Create download link
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/file/d/11l0ZOgfjvELU_5wMK3KEeigsX-ycF2Wg/view?usp=drive_link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        await this.delay(3000);
        downloadButton.classList.remove('active', 'complete');
      } catch (error) {
        console.error('Download error:', error);
        downloadButton.classList.remove('active', 'complete');
      }
    });
  }

  // Contact Form Handler
  initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = this.getFormData(contactForm);
      
      if (!this.validateForm(formData)) return;

      await this.submitForm(contactForm, formData);
    });
  }

  getFormData(form) {
    return {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      subject: form.querySelector('#subject').value.trim(),
      message: form.querySelector('#message').value.trim()
    };
  }

  validateForm({ name, email, subject, message }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || !email || !subject || !message) {
      this.showNotification('Please fill in all fields', 'error');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return false;
    }
    
    return true;
  }

  async submitForm(form, data) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        const fieldName = key === 'email' ? '_replyto' : key === 'subject' ? '_subject' : key;
        formData.append(fieldName, value);
      });

      const response = await fetch('https://formspree.io/f/manedwjq', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        this.resetFormLabels(form);
        this.showNotification('Message sent successfully!', 'success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  resetFormLabels(form) {
    form.querySelectorAll('.form-label').forEach(label => {
      label.classList.remove('active');
    });
  }

  // Scroll Effects
  initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.updateActiveNavLink(navLinks, sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  updateActiveNavLink(navLinks, activeSectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  // Access Denied Modal
  initAccessModal() {
    const modal = document.getElementById('accessDeniedModal');
    if (!modal) return;

    // Update all restricted links
    const restrictedLinks = document.querySelectorAll('[onclick*="triggerAccessDenied"]');
    restrictedLinks.forEach(link => {
      link.removeAttribute('onclick');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showAccessDeniedModal();
      });
    });

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideAccessDeniedModal();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideAccessDeniedModal();
      }
    });

    // Contact redirect from modal
    const contactBtn = modal.querySelector('#redirectToContact');
    if (contactBtn) {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideAccessDeniedModal();
        this.scrollToSection('contact');
      });
    }
  }

  showAccessDeniedModal() {
    const modal = document.getElementById('accessDeniedModal');
    if (!modal) return;

    modal.classList.add('visible');
    
    // Animate terminal lines
    const outputLines = modal.querySelectorAll('.terminal-output .output-line');
    outputLines.forEach((line, index) => {
      setTimeout(() => line.classList.add('active'), 300 * index);
    });
  }

  hideAccessDeniedModal() {
    const modal = document.getElementById('accessDeniedModal');
    if (modal) {
      modal.classList.remove('visible');
    }
  }

  // Utility Methods
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  showNotification(message, type) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
      notification.classList.remove('show');
    }, 5000);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global function for backward compatibility
window.triggerAccessDenied = function() {
  const portfolioManager = window.portfolioManager || new PortfolioManager();
  portfolioManager.showAccessDeniedModal();
  return false;
};

// Initialize Portfolio Manager
window.portfolioManager = new PortfolioManager();