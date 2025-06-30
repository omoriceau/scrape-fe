import { getPage } from '$lib/markdown.js';
import { error } from '@sveltejs/kit';
import * as m from '../../paraglide/messages.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const slugPath = params.slug;
  const page = getPage(slugPath);

  if (!page) {
    throw error(404, {
      message: `${m.page_not_found()}: ${slugPath}`,
      hint: m.check_markdown_file()
    });
  }

  return {
    currentPage: page,
    slug: slugPath
  };
}