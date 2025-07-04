---
title: "Documentation"
description: "Guide complet pour utiliser l'API ScrapeMaster"
---

# Documentation ScrapeMaster

Bienvenue dans la documentation de l'API ScrapeMaster. Ce guide vous aidera à démarrer avec le scraping web en utilisant notre API puissante.

## Démarrage rapide

### 1. Obtenez votre clé API
Inscrivez-vous et récupérez votre clé API depuis le tableau de bord.

### 2. Faites votre première requête
```bash
curl -X POST https://api.scrapemaster.com/scrape \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "format": "json"
  }'
```

### 3. Traitez la réponse

```json
{
  "job_id": "job_123456",
  "status": "processing",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Référence API 

### Authentification 

Toutes les requêtes API nécessitent une authentification via votre clé API dans l'en-tête Authorization : 

``` Authorization: Bearer VOTRE_CLÉ_API ``` 

### URL de base 

``` https://api.scrapemaster.com ``` 

### Endpoints 

#### POST /scrape 

Démarrer une nouvelle tâche de scraping. 

**Paramètres :** 
- `url` (obligatoire) : URL à scraper 
- `format` (optionnel) : Format de sortie (json, csv, xml, text) 
- `screenshot` (optionnel) : Prendre une capture d’écran (booléen) 
- `wait_for` (optionnel) : Sélecteur CSS ou millisecondes à attendre 
- `headers` (optionnel) : En-têtes HTTP personnalisés 
- `user_agent` (optionnel) : User agent personnalisé 

**Exemple :** 

```json 
{ 
  "url": "https://example.com", 
  "format": "json", 
  "screenshot": true, 
  "wait_for": ".content-loaded", 
  "headers": { "X-Custom-Header": "value" } 
} 
``` 

#### GET /jobs/{job_id} 

Obtenir le statut et les résultats d’une tâche de scraping. 

**Réponse :** 

```json 
{ 
  "job_id": "job_123456", 
  "status": "completed", 
  "url": "https://example.com", 
  "created_at": "2024-01-15T10:30:00Z", 
  "completed_at": "2024-01-15T10:30:15Z", 
  "results": 
    { 
      "title": "Page Exemple", 
      "content": "...", 
      "links": [...], 
      "images": [...] 
    } 
  } 
``` 

#### GET /jobs 

Lister toutes vos tâches de scraping. 

**Paramètres :** 
- `limit` (optionnel) : Nombre de tâches à retourner (par défaut : 20) 
- `offset` (optionnel) : Nombre de tâches à ignorer (par défaut : 0) 
- `status` (optionnel) : Filtrer par statut (pending, processing, completed, failed) ## SDKs ### JavaScript/Node.js 

```bash 
npm install @scrapemaster/sdk 

``` 

```javascript 

const ScrapeMaster = require('@scrapemaster/sdk'); 
const client = new ScrapeMaster('VOTRE_CLÉ_API'); 

async function scrapeWebsite() { 
  const job = await client.scrape({ 
    url: 'https://example.com', 
    format: 'json' 
  }); 
  
  const results = await client.waitForCompletion(job.job_id); 
  console.log(results); } 
``` 

### Python 

```bash 
pip install scrapemaster 
``` 

``` python 
from scrapemaster 
import ScrapeMaster 

client = ScrapeMaster('VOTRE_CLÉ_API') 
job = client.scrape( url='https://example.com', format='json' ) 
results = client.wait_for_completion(job['job_id']) 
print(results) 
``` 

## Limites de requêtes 

Les limites dépendent de votre plan : 

- Gratuit : 1 requête par minute 
- Starter : 10 requêtes par minute 
- Professionnel : 50 requêtes par minute 
- Entreprise : Limites personnalisées 

## Gestion des erreurs L’API utilise des codes HTTP standards : 
- `200` - Succès 
- `400` - Requête invalide 
- `401` - Non autorisé 
- `429` - Limite de requêtes atteinte 
- `500` - Erreur interne serveur 

Les réponses d’erreur incluent des détails : 

```json 
{ 
  "error": { 
    "code": "INVALID_URL", 
    "message": "L’URL fournie n’est pas valide" 
  } 
} 
``` 

## Bonnes pratiques 
1. **Respecter robots.txt** : vérifiez toujours le fichier robots.txt du site cible 
2. **Utiliser des délais** : n’inondez pas les serveurs cibles avec des requêtes rapides 
3. **Gérer les erreurs** : implémentez une gestion correcte des erreurs et des retries 
4. **Mettre en cache les résultats** : quand c’est approprié, mettez en cache les données extraites 
5. **Surveiller l’utilisation** : suivez votre consommation d’API et vos limites 

## Support 

Besoin d’aide ? Contactez notre équipe support : 

- Email : support@scrapemaster.com 
- Documentation : https://docs.scrapemaster.com 
- Page statut : https://status.scrapemaster.com