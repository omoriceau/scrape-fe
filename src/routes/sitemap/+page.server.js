
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export function load() {
  const files = getMarkdownFiles();

  const pages = files.map(file => {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: data.slug,
      title: data.title,
    };
  });

  return {
    pages,
  };
}
