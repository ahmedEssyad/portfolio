#!/bin/bash

# Portfolio Migration Script
# Migre automatiquement vers la version améliorée

echo "🚀 Portfolio Migration Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the portfolio directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Erreur: index.html non trouvé${NC}"
    echo "Veuillez exécuter ce script depuis le dossier portfolio"
    exit 1
fi

echo -e "${YELLOW}⚠️  Ce script va modifier votre portfolio${NC}"
echo "Voulez-vous continuer? (y/n)"
read -r response

if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "Migration annulée"
    exit 0
fi

echo ""
echo "📁 Étape 1/5 : Création des dossiers..."
mkdir -p assets/css assets/js assets/cv
echo -e "${GREEN}✓ Dossiers créés${NC}"

echo ""
echo "📋 Étape 2/5 : Backup des anciens fichiers..."
timestamp=$(date +%Y%m%d_%H%M%S)
mkdir -p backup_$timestamp

# Backup old files
if [ -f "index.html" ]; then
    cp index.html backup_$timestamp/
    echo -e "${GREEN}✓ index.html sauvegardé${NC}"
fi

if [ -f "style.css" ]; then
    cp style.css backup_$timestamp/
    echo -e "${GREEN}✓ style.css sauvegardé${NC}"
fi

if [ -f "script.js" ]; then
    cp script.js backup_$timestamp/
    echo -e "${GREEN}✓ script.js sauvegardé${NC}"
fi

echo ""
echo "🔄 Étape 3/5 : Migration des fichiers..."

# Check if improved version exists
if [ -f "index-improved.html" ]; then
    mv index.html index-old.html
    mv index-improved.html index.html
    echo -e "${GREEN}✓ index.html migré${NC}"
else
    echo -e "${RED}❌ index-improved.html non trouvé${NC}"
    echo "Veuillez vérifier que tous les fichiers sont présents"
    exit 1
fi

echo ""
echo "🧹 Étape 4/5 : Nettoyage (optionnel)..."
echo "Voulez-vous supprimer les anciens fichiers CSS/JS? (y/n)"
read -r cleanup

if [[ "$cleanup" =~ ^[Yy]$ ]]; then
    # Move old files to backup instead of deleting
    [ -f "style.css" ] && mv style.css backup_$timestamp/
    [ -f "style-optimized.css" ] && mv style-optimized.css backup_$timestamp/
    [ -f "script.js" ] && mv script.js backup_$timestamp/
    [ -f "script-modern.js" ] && mv script-modern.js backup_$timestamp/
    [ -f "script-optimized.js" ] && mv script-optimized.js backup_$timestamp/
    [ -f "modal.js" ] && mv modal.js backup_$timestamp/
    echo -e "${GREEN}✓ Anciens fichiers déplacés vers backup_$timestamp/${NC}"
else
    echo -e "${YELLOW}⊘ Nettoyage ignoré${NC}"
fi

echo ""
echo "✅ Étape 5/5 : Vérification..."

# Check if required files exist
errors=0

if [ ! -f "assets/css/main.min.css" ]; then
    echo -e "${RED}❌ assets/css/main.min.css manquant${NC}"
    errors=$((errors+1))
fi

if [ ! -f "assets/js/main.min.js" ]; then
    echo -e "${RED}❌ assets/js/main.min.js manquant${NC}"
    errors=$((errors+1))
fi

if [ ! -f "manifest.json" ]; then
    echo -e "${YELLOW}⚠️  manifest.json manquant (optionnel pour PWA)${NC}"
fi

if [ ! -f "sw.js" ]; then
    echo -e "${YELLOW}⚠️  sw.js manquant (optionnel pour PWA)${NC}"
fi

echo ""
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}🎉 Migration réussie !${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "1. Ajoutez votre CV dans assets/cv/Mohamed-Essyad-CV.pdf"
    echo "2. Créez les icônes PWA dans images/"
    echo "3. Testez dans un navigateur"
    echo "4. Vérifiez le mode Dark/Light"
    echo ""
    echo "📚 Documentation :"
    echo "- README-IMPROVEMENTS.md : Guide complet"
    echo "- QUICK-START.md : Démarrage rapide"
    echo "- SUMMARY.md : Récapitulatif"
    echo ""
    echo "💾 Backup : backup_$timestamp/"
    echo ""
    echo -e "${GREEN}Votre portfolio est maintenant optimisé ! 🚀${NC}"
else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}❌ Migration incomplète${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo "Vérifiez que tous les fichiers nécessaires sont présents"
    echo "Consultez README-IMPROVEMENTS.md pour plus d'informations"
    exit 1
fi
