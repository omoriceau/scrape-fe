// routes/[...slug]/+page.js
import { content, slugIndex, fileIndex, languageIndex} from '$lib/server/markdown';
import { initializeMarkdownData } from '$lib/markdown.js';
import { error } from '@sveltejs/kit';
import * as m from '$paraglide/messages.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
  const slugPath = params.slug;
  const page = slugIndex[slugPath];
  const parentData = await parent();
  console.log(slugPath, Object.keys(slugIndex), ">>>")

  // Initialize data if available
  if (parentData?.markdownData) {
    initializeMarkdownData(parentData.markdownData);
  }
  
  if (!page) {
    throw error(404, `${m.page_not_found()}: ${slugPath}. ${m.check_markdown_file()}`);
  }

  return {
    markdownData: {
      content,
      slugIndex,
      fileIndex,
      languageIndex,
      currentPage: page
    },
    slug: slugPath
  };
}