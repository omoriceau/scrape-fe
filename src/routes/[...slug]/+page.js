// routes/[...slug]/+page.js
import { getPage, initializeMarkdownData } from '$lib/markdown.js';
import { error } from '@sveltejs/kit';
import * as m from '$paraglide/messages.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
  const parentData = await parent();
  
  // Initialize data if available
  if (parentData?.markdownData) {
    initializeMarkdownData(parentData.markdownData);
  }
  
  const slugPath = params.slug;
  const page = getPage(slugPath);

  if (!page) {
    throw error(404, `${m.page_not_found()}: ${slugPath}. ${m.check_markdown_file()}`);
  }

  return {
    currentPage: page,
    slug: slugPath
  };
}