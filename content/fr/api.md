---
title: "Référence API"
slug: api
description: "Documentation complète de l'API"
author: "Équipe de développement"
date: 2025-01-01
tags: api, documentation, référence, endpoints
---

# Référence API

Référence complète pour l’API ScrapeMaster.

## URL de base

```
https://api.scrapemaster.com/v1
```


## Authentification

Toutes les requêtes API nécessitent une authentification avec votre clé API :

```bash
Authorization: Bearer VOTRE_CLÉ_API
```

## Endpoints

### POST /scrape

Lancer une nouvelle tâche de scraping.

**Corps de la requête :**

```json
{
  "url": "https://example.com",
  "format": "json",
  "screenshot": true,
  "wait_for": ".content-loaded",
  "headers": {
    "User-Agent": "Custom Bot 1.0"
  }
}
```

**Response:**
```json
{
  "job_id": "job_123456",
  "status": "pending",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### GET /jobs/{job_id}

Obtenir le statut et les résultats d’une tâche.

**Response:**
```json
{
  "job_id": "job_123456",
  "status": "completed",
  "url": "https://example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:30:15Z",
  "results": {
    "title": "Page Exemple",
    "content": "Contenu de la page...",
    "links": ["https://example.com/page1"],
    "images": ["https://example.com/image.jpg"]
  }
}
```

### GET /jobs

Lister toutes les tâches.

**Paramètres de requête :**
- limit : Nombre de tâches (par défaut : 20)
- offset : Ignorer un nombre de tâches (par défaut : 0)
- status : Filtrer par statut

**Réponse:**
```json
{
  "jobs": [...],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

## Codes de statut

- 200 - Succès
- 201 - Créé
- 400 - Requête invalide
- 401 - Non autorisé
- 429 - Limite de requêtes atteinte
- 500 - Erreur serveur

## Limites de requêtes

- Les limites varient selon le plan :
- Gratuit : 1 requête/min
- Starter : 10 requêtes/min
- Pro : 50 requêtes/min
- Entreprise : Personnalisé