//+page.server.js
import { content, slugIndex, fileIndex, languageIndex } from '$lib/server/markdown';
import { initializeMarkdownData } from '$lib/markdown.js';
import { error } from '@sveltejs/kit';
import * as m from '$paraglide/messages.js';


/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
  const parentData = await parent();

  // Initialize data if available
  if (parentData?.markdownData) {
    initializeMarkdownData(parentData.markdownData);
  }

  return {
    markdownData: {
      content,
      slugIndex,
      fileIndex,
      languageIndex,
      currentPage: slugIndex['index'] 
    },
    slug: slugIndex
  };
}