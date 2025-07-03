import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const siteUrl = 'https://your-domain.com'; // Replace with your domain

// Function to get all markdown files from the content directory
function getMarkdownFiles() {
  const contentDir = path.join(process.cwd(), 'content');
  const languages = fs.readdirSync(contentDir);
  let files = [];

  for (const lang of languages) {
    const langDir = path.join(contentDir, lang);
    const langFiles = fs.readdirSync(langDir).map(file => path.join(langDir, file));
    files = [...files, ...langFiles];
  }

  return files;
}

export async function GET() {
  const files = getMarkdownFiles();

  const pages = files.map(file => {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: data.slug,
      date: data.date,
    };
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${siteUrl}/${page.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${new Date(page.date).toISOString()}</lastmod>
  </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}