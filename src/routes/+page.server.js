import { content, slugIndex, fileIndex, languageIndex } from '$lib/server/markdown';

export function load() {
  return {
    markdownData: {
      content,
      slugIndex,
      fileIndex,
      languageIndex,
      currentPage: slugIndex['index'] 
    }
  };
}
