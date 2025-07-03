<!-- routes/+page.svelte -->
<script>
  import { getPagesByLanguage, getAvailableLanguages } from '$lib/markdown.js';
  import * as m from '$paraglide/messages.js';
  import { setLanguage, currentLanguage, languageChanged, getLanguageDisplayName, formatDate as i18nFormatDate } from '$lib/i18n.js';
  import { onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  
  const languages = getAvailableLanguages();
  let previousLanguage = $currentLanguage;
  let messageKey = 0;
  
  // Configurable settings
  let maxPostsToShow = 3;
  let excerptLength = 150; // characters
  
  // Reactive variables
  let blogPosts = [];
  let postsByDate = {};
  let allPages = [];
  let pagesByLanguage = {};
  
  // Function to extract excerpt from content
  /**
   * @param {string} content
   */
  function getExcerpt(content, length = excerptLength) {
    if (!content) return '';
    
    // Remove markdown syntax for a cleaner excerpt
    const cleanContent = content
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\n\s*\n/g, ' ') // Replace double newlines with space
      .replace(/\n/g, ' ') // Replace single newlines with space
      .trim();
    
    if (cleanContent.length <= length) return cleanContent;
    
    const truncated = cleanContent.substring(0, length);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  }
  
  // Function to get blog posts from the posts directory
  /**
   * @param {string} lang
   */
  function getBlogPosts(lang) {
    const pages = getPagesByLanguage(lang);
    
    console.log("getBlogPosts", pages)
    // Filter for posts (assuming they're in a 'posts' folder or have a specific pattern)
    const posts = pages.filter(page => {
      // You might need to adjust this logic based on your file structure
      return page.filename == 'posts';
    });
    
    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.meta.date || a.meta.published || '1970-01-01');
      const dateB = new Date(b.meta.date || b.meta.published || '1970-01-01');
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  // Function to group posts by date
  /**
   * @param {any[]} posts
   */
  function groupPostsByDate(posts) {
    const grouped = {};
    
    posts.forEach((/** @type {{ meta: { date: any; published: any; }; }} */ post) => {
      const date = new Date(post.meta.date || post.meta.published || '1970-01-01');
      const year = date.getFullYear();
      const month = date.toLocaleString($currentLanguage, { month: 'long' });
      const key = `${year}-${month}`;
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(post);
    });
    
    return grouped;
  }
  
  // Reactive updates when language changes
  $: {
    console.log('Language changed, updating content...');
    
    // Get all pages for display
    allPages = [];
    languages.forEach(lang => {
      const pages = getPagesByLanguage(lang);
      allPages = [...allPages, ...pages];
    });
    
    // Group pages by language
    pagesByLanguage = {};
    languages.forEach(lang => {
      pagesByLanguage[lang] = getPagesByLanguage(lang);
    });
    
    // Get blog posts for current language
    blogPosts = getBlogPosts($currentLanguage);
    postsByDate = groupPostsByDate(blogPosts);
    
    // Update message key to force re-render
    messageKey = $languageChanged;
  }

  /**
   * @param {string} lang
   */
  function handleLanguageChange(lang) {
    console.log('Button clicked, changing to:', lang);
    setLanguage(lang);
  }

  onMount(() => {
    console.log('Component mounted, current language:', $currentLanguage);
  });
</script>

<svelte:head>
  <title>{m.site_title()} - {m.site_description()}</title>
  <meta name="description" content={m.site_tagline({ name: 'Svelte' })} />
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-12">
  <div class="hero-content text-center py-16">
    <div class="max-w-md">
      {#key messageKey}
        <h1 class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {m.site_title()}
        </h1>
        <p class="py-6 text-lg opacity-80">
          {m.site_tagline({ name: 'Svelte' })}
        </p>
        <div class="flex gap-4 justify-center">
          <div class="badge badge-primary badge-lg">{m.badge_svelte_version()}</div>
          <div class="badge badge-secondary badge-lg">{m.badge_multi_language()}</div>
          <div class="badge badge-accent badge-lg">{m.badge_markdown()}</div>
        </div>
      {/key}
      
      <!-- Language switcher -->
      <div class="flex gap-2 justify-center mt-6">
        {#each languages as lang}
          <button 
            on:click={() => handleLanguageChange(lang)} 
            class="btn btn-sm"
            class:btn-primary={$currentLanguage === lang}
            class:btn-outline={$currentLanguage !== lang}
          >
            {getLanguageDisplayName(lang)}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<!-- Main Content Area -->
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <!-- Main Blog Content -->
  <div class="lg:col-span-3">
    {#if blogPosts.length > 0}
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2">Latest Posts</h2>
        <p class="text-lg opacity-70 mb-6">Recent articles and updates from our blog</p>
        
        <!-- Settings Controls (you can remove these in production) -->
        <div class="flex gap-4 mb-6 p-4 bg-base-200 rounded-lg">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Max posts to show:</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              bind:value={maxPostsToShow}
              class="range range-primary range-sm"
            />
            <span class="text-sm opacity-70">{maxPostsToShow}</span>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Excerpt length:</span>
            </label>
            <input 
              type="range" 
              min="50" 
              max="300" 
              step="10"
              bind:value={excerptLength}
              class="range range-secondary range-sm"
            />
            <span class="text-sm opacity-70">{excerptLength} chars</span>
          </div>
        </div>
      </div>
      
      <!-- Blog Posts -->
      <div class="space-y-8">
        {#each blogPosts.slice(0, maxPostsToShow) as post}
          <article class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div class="card-body">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="card-title text-2xl mb-2">
                    <a href="/{post.slug}" class="link link-hover">
                      {post.meta.title || post.slug}
                    </a>
                  </h3>
                  {#if post.meta.date || post.meta.published}
                    <div class="text-sm opacity-60 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 002.25 2.25v7.5" />
                      </svg>
                      {i18nFormatDate(post.meta.date || post.meta.published)}
                    </div>
                  {/if}
                </div>
                {#if post.meta.category || post.meta.tags}
                  <div class="flex gap-2">
                    {#if post.meta.category}
                      <div class="badge badge-primary badge-sm">{post.meta.category}</div>
                    {/if}
                    {#if post.meta.tags}
                      {#each (typeof post.meta.tags === 'string' ? post.meta.tags.split(',') : post.meta.tags).slice(0, 2) as tag}
                        <div class="badge badge-ghost badge-sm">{tag.trim()}</div>
                      {/each}
                    {/if}
                  </div>
                {/if}
              </div>
              
              {#if post.meta.description}
                <p class="text-base opacity-80 mb-4">{post.meta.description}</p>
              {:else if post.content}
                <p class="text-base opacity-80 mb-4">{getExcerpt(post.content, excerptLength)}</p>
              {/if}
              
              <div class="card-actions justify-between items-center">
                <div class="flex items-center gap-3">
                  {#if post.meta.author}
                    <div class="flex items-center gap-2 text-sm opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      {post.meta.author}
                    </div>
                  {/if}
                  {#if post.meta.readTime}
                    <div class="text-sm opacity-70">{post.meta.readTime} min read</div>
                  {/if}
                </div>
                <a href="/{post.slug}" class="btn btn-primary btn-sm">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        {/each}
      </div>
      
      {#if blogPosts.length > maxPostsToShow}
        <div class="text-center mt-8">
          <a href="/blog" class="btn btn-outline btn-lg">
            View All Posts ({blogPosts.length})
          </a>
        </div>
      {/if}
    {:else}
      <div class="hero bg-base-200 rounded-2xl">
        <div class="hero-content text-center py-16">
          <div class="max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto mb-4 opacity-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h2 class="text-2xl font-bold mb-4">No Blog Posts Found</h2>
            <p class="opacity-70">
              Create some blog posts in your <code>/content/{$currentLanguage}/posts</code> directory to get started.
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Sidebar -->
  <div class="lg:col-span-1">
    <div class="sticky top-8 space-y-6">
      <!-- Archive by Date -->
      {#if Object.keys(postsByDate).length > 0}
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h3 class="card-title text-lg mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 002.25 2.25v7.5" />
              </svg>
              Archive
            </h3>
            <div class="space-y-2">
              {#each Object.entries(postsByDate) as [period, posts]}
                <div class="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-base-200 transition-colors">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-primary rounded-full"></div>
                    <span class="text-sm font-medium">{period.replace('-', ' ')}</span>
                  </div>
                  <div class="badge badge-ghost badge-sm">{posts.length}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Quick Stats -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            Quick Stats
          </h3>
          <div class="space-y-3">
            <div class="stat">
              <div class="stat-title text-xs">Total Posts</div>
              <div class="stat-value text-lg text-primary">{blogPosts.length}</div>
            </div>
            <div class="stat">
              <div class="stat-title text-xs">Languages</div>
              <div class="stat-value text-lg text-secondary">{languages.length}</div>
            </div>
            <div class="stat">
              <div class="stat-title text-xs">Current Language</div>
              <div class="stat-value text-lg text-accent">{getLanguageDisplayName($currentLanguage)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>