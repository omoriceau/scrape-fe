---
title: "API Reference"
description: "Complete API documentation"
---

# API Reference

Complete reference for the ScrapeMaster API.

## Base URL

```
https://api.scrapemaster.com/v1
```

## Authentication

All API requests require authentication using your API key:

```bash
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### POST /scrape

Start a new scraping job.

**Request Body:**
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

Get job status and results.

**Response:**
```json
{
  "job_id": "job_123456",
  "status": "completed",
  "url": "https://example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:30:15Z",
  "results": {
    "title": "Example Page",
    "content": "Page content...",
    "links": ["https://example.com/page1"],
    "images": ["https://example.com/image.jpg"]
  }
}
```

### GET /jobs

List all jobs.

**Query Parameters:**
- `limit`: Number of jobs (default: 20)
- `offset`: Skip jobs (default: 0)
- `status`: Filter by status

**Response:**
```json
{
  "jobs": [...],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `429` - Rate Limited
- `500` - Server Error

## Rate Limits

Limits vary by plan:
- Free: 1 req/min
- Starter: 10 req/min
- Pro: 50 req/min
- Enterprise: Custom