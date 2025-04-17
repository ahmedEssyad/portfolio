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

    // Animation pour les barres de compétences
    const animateSkillBars = () => {
      const skillBars = document.querySelectorAll('.skill-progress');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const width = entry.target.parentElement.previousElementSibling.lastElementChild.textContent;
            entry.target.style.width = width;
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      skillBars.forEach(bar => observer.observe(bar));
    };
    
    // Animation des sections
    const animateSections = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => section.classList.add('fade-in'));
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      sections.forEach(section => observer.observe(section));
    };
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simuler l'envoi du formulaire
        setTimeout(() => {
          // Afficher un message de succès
          const notification = document.createElement('div');
          notification.className = 'notification success';
          notification.textContent = 'Message envoyé avec succès!';
          document.body.appendChild(notification);
          
          // Afficher la notification
          setTimeout(() => notification.classList.add('show'), 10);
          
          // Supprimer la notification après quelques secondes
          setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
          }, 3000);
          
          // Réinitialiser le formulaire
          contactForm.reset();
        }, 1000);
      });
    }
    
    // Activer toutes les animations
    animateSkillBars();
    animateSections();
    
    // Ajouter une classe active aux liens de navigation lors du défilement
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // Gestion du bouton "back-to-top"
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
  
    // Gestion du bouton thème clair/sombre
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
          icon.classList.replace('fa-moon', 'fa-sun');
        } else {
          icon.classList.replace('fa-sun', 'fa-moon');
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.querySelector('.cv-download-button');
    
    if (downloadButton) {
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
    }
  
    // Smooth scrolling pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Corriger le lien dans la modal pour rediriger vers la section de contact
    const redirectToContactBtn = document.getElementById('redirectToContact');
    if (redirectToContactBtn) {
      redirectToContactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Fermer la modal
        const modal = document.getElementById('accessDeniedModal');
        if (modal) {
          modal.style.display = 'none';
          modal.classList.remove('modal-visible');
        }
        
        // Défiler vers la section de contact
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          window.scrollTo({
            top: contactSection.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    }
  });
