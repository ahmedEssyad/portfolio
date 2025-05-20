/**
 * Gestion de la modal "Access Denied"
 * Fonction propre pour ouvrir, animer et fermer la modal
 */

// Fonction pour ouvrir la modal
function triggerAccessDenied() {
  console.log("Access denied function triggered");
  
  // Récupération de la modal
  const modal = document.getElementById('accessDeniedModal');
  
  if (!modal) {
    console.error("Modal element not found!");
    return false;
  }
  
  // Affichage de la modal
  modal.classList.add('visible');
  
  // Animation des lignes de terminal
  const outputLines = modal.querySelectorAll('.terminal-output .output-line');
  outputLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('active');
    }, 300 * index);
  });
  
  // Empêcher le comportement par défaut des liens
  return false;
}

// Initialisation de la modal lors du chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('accessDeniedModal');
  
  if (!modal) {
    console.error("Modal element not found during initialization!");
    return;
  }
  
  // Fonction pour fermer la modal
  function closeModal() {
    modal.classList.remove('visible');
  }
  
  // Ajout de l'événement pour fermer la modal via le bouton X
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeModal();
    });
  }
  
  // Fermeture en cliquant à l'extérieur du contenu de la modal
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Redirection vers la section contact depuis la modal
  const contactBtn = modal.querySelector('#redirectToContact');
  if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
      
      // Scroll jusqu'à la section de contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Gestion des liens qui déclenchent la modal
  const accessDeniedLinks = document.querySelectorAll('[onclick*="triggerAccessDenied"]');
  accessDeniedLinks.forEach(link => {
    link.onclick = null; // Supprimer l'attribut onclick inline
    link.addEventListener('click', function(e) {
      e.preventDefault();
      triggerAccessDenied();
    });
  });
});
