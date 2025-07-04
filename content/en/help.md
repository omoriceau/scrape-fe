---
title: "Help Center"
description: "Get help with ScrapeMaster"
---

# Help Center

Find answers to common questions and get help with ScrapeMaster.

## Getting Started

### How do I get started?
1. Sign up for a free account
2. Get your API key from the dashboard
3. Make your first API request
4. View results in your dashboard

### What can I scrape?
You can scrape most publicly accessible websites. Please respect:
- robots.txt files
- Terms of service
- Rate limits
- Copyright laws

## Common Issues

### My scraping job failed
Common reasons for failures:
- Invalid URL
- Website blocking requests
- Network timeout
- Rate limiting

### I'm getting rate limited
- Check your plan limits
- Upgrade your plan
- Implement delays between requests
- Use our built-in rate limiting

### JavaScript not rendering
- Enable JavaScript rendering in your request
- Use the `wait_for` parameter
- Increase timeout settings

## Best Practices

### Respectful Scraping
- Follow robots.txt
- Don't overwhelm servers
- Use appropriate delays
- Cache results when possible

### Performance Tips
- Use specific selectors
- Minimize data extraction
- Batch similar requests
- Monitor your usage

## Troubleshooting

### Check Job Status
Always check the job status before assuming failure:
```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.scrapemaster.com/jobs/JOB_ID
```

### Common Error Codes
- `400`: Invalid request parameters
- `401`: Invalid API key
- `429`: Rate limit exceeded
- `500`: Server error

### Contact Support
If you need additional help:
- Email: support@scrapemaster.com
- Response time: Within 24 hours
- Include your job ID and error details