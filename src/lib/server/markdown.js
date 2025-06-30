import matter from 'gray-matter';
import { marked } from 'marked';

// Configure marked for better output
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

// Import all markdown files
const files = import.meta.glob('/content/**/*.md', { as: 'raw', eager: true });

const content = {};
const slugIndex = {}; // slug -> page
const fileIndex = {}; // filename -> lang -> page
const languageIndex = {}; // lang -> [pages]

// Process all markdown files
for (const path in files) {
  const raw = files[path];
  const parsed = matter(raw);

  const parts = path.split('/');
  const lang = parts[2];
  const filenameWithExt = parts[3];
  const filename = filenameWithExt.replace('.md', '');

  const slug = parsed.data.slug || filename;
  const html = marked.parse(parsed.content);

  const page = {
    html,
    meta: parsed.data,
    filename,
    slug,
    lang,
    path
  };

  // Index by slug for routing
  slugIndex[slug] = page;

  // Index by filename for language switching
  if (!fileIndex[filename]) fileIndex[filename] = {};
  fileIndex[filename][lang] = page;

  // Index by language
  if (!languageIndex[lang]) languageIndex[lang] = [];
  languageIndex[lang].push(page);

  // Organize by lang as well
  if (!content[lang]) content[lang] = {};
  content[lang][slug] = page;
}

export { content, slugIndex, fileIndex, languageIndex };