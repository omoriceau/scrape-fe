---
title: "Centre d’Aide"
slug: aide
description: "Obtenez de l’aide avec ScrapeMaster"
author: "Équipe de Support"
date: 2025-01-01
tags: aide, support, faq, documentation
lang: fr
---

# Centre d’Aide

Trouvez des réponses aux questions courantes et obtenez de l’aide avec ScrapeMaster.

## Premiers Pas

### Comment démarrer ?
1. Inscrivez-vous pour un compte gratuit  
2. Récupérez votre clé API depuis le tableau de bord  
3. Effectuez votre première requête API  
4. Consultez les résultats dans votre tableau de bord  

### Que puis-je scraper ?
Vous pouvez extraire la plupart des sites web accessibles au public. Veuillez respecter :  
- les fichiers robots.txt  
- les conditions d’utilisation  
- les limites de fréquence  
- les lois sur le droit d’auteur  

## Problèmes Courants

### Mon travail de scraping a échoué  
Causes fréquentes d’échec :  
- URL invalide  
- Site bloquant les requêtes  
- Délai d’attente réseau dépassé  
- Limitation de fréquence  

### Je suis limité par la fréquence  
- Vérifiez les limites de votre forfait  
- Passez à un forfait supérieur  
- Implémentez des délais entre les requêtes  
- Utilisez notre limitation de débit intégrée  

### Le JavaScript ne s’affiche pas  
- Activez le rendu JavaScript dans votre requête  
- Utilisez le paramètre `wait_for`  
- Augmentez les délais d’attente  

## Bonnes Pratiques

### Scraping Respectueux  
- Respectez les fichiers robots.txt  
- Ne surchargez pas les serveurs  
- Utilisez des délais appropriés  
- Mettez en cache les résultats si possible  

### Conseils de Performance  
- Utilisez des sélecteurs spécifiques  
- Minimisez l’extraction de données  
- Regroupez les requêtes similaires  
- Surveillez votre utilisation  

## Dépannage

### Vérifiez le statut du travail  
Toujours vérifier le statut avant de conclure à un échec :  
```bash
curl -H "Authorization: Bearer VOTRE_CLÉ" \
  https://api.scrapemaster.com/jobs/ID_DU_TRAVAIL
