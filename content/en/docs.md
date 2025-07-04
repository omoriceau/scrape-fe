---
title: "Documentation"
description: "Complete guide to using ScrapeMaster API"
---

# ScrapeMaster Documentation

Welcome to the ScrapeMaster API documentation. This guide will help you get started with web scraping using our powerful API.

## Quick Start

### 1. Get Your API Key
Sign up for an account and get your API key from the dashboard.

### 2. Make Your First Request
```bash
curl -X POST https://api.scrapemaster.com/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "format": "json"
  }'
```

### 3. Handle the Response
```json
{
  "job_id": "job_123456",
  "status": "processing",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## API Reference

### Authentication
All API requests require authentication using your API key in the Authorization header:
```
Authorization: Bearer YOUR_API_KEY
```

### Base URL
```
https://api.scrapemaster.com
```

### Endpoints

#### POST /scrape
Start a new scraping job.

**Parameters:**
- `url` (required): The URL to scrape
- `format` (optional): Output format (json, csv, xml, text)
- `screenshot` (optional): Take a screenshot (boolean)
- `wait_for` (optional): CSS selector or milliseconds to wait
- `headers` (optional): Custom HTTP headers
- `user_agent` (optional): Custom user agent

**Example:**
```json
{
  "url": "https://example.com",
  "format": "json",
  "screenshot": true,
  "wait_for": ".content-loaded",
  "headers": {
    "X-Custom-Header": "value"
  }
}
```

#### GET /jobs/{job_id}
Get the status and results of a scraping job.

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
    "content": "...",
    "links": [...],
    "images": [...]
  }
}
```

#### GET /jobs
List all your scraping jobs.

**Parameters:**
- `limit` (optional): Number of jobs to return (default: 20)
- `offset` (optional): Number of jobs to skip (default: 0)
- `status` (optional): Filter by status (pending, processing, completed, failed)

## SDKs

### JavaScript/Node.js
```bash
npm install @scrapemaster/sdk
```

```javascript
const ScrapeMaster = require('@scrapemaster/sdk');

const client = new ScrapeMaster('YOUR_API_KEY');

async function scrapeWebsite() {
  const job = await client.scrape({
    url: 'https://example.com',
    format: 'json'
  });
  
  const results = await client.waitForCompletion(job.job_id);
  console.log(results);
}
```

### Python
```bash
pip install scrapemaster
```

```python
from scrapemaster import ScrapeMaster

client = ScrapeMaster('YOUR_API_KEY')

job = client.scrape(
    url='https://example.com',
    format='json'
)

results = client.wait_for_completion(job['job_id'])
print(results)
```

## Rate Limits

Rate limits depend on your plan:
- Free: 1 request per minute
- Starter: 10 requests per minute
- Professional: 50 requests per minute
- Enterprise: Custom limits

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

Error responses include details:
```json
{
  "error": {
    "code": "INVALID_URL",
    "message": "The provided URL is not valid"
  }
}
```

## Best Practices

1. **Respect robots.txt**: Always check the target site's robots.txt file
2. **Use delays**: Don't overwhelm target servers with rapid requests
3. **Handle errors**: Implement proper error handling and retries
4. **Cache results**: Cache scraped data when appropriate
5. **Monitor usage**: Keep track of your API usage and limits

## Support

Need help? Contact our support team:
- Email: support@scrapemaster.com
- Documentation: https://docs.scrapemaster.com
- Status Page: https://status.scrapemaster.com