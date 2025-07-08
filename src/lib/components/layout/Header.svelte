<script>
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth.js';
  import Button from '$lib/components/ui/Button.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { Menu, User, LogOut, Globe } from 'lucide-svelte';
  import * as m from '$paraglide/messages.js';
  
  let mobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <Globe class="w-8 h-8 text-blue-600" />
          <span class="text-xl font-bold text-gradient">
            {m.site_title?.() || 'ScrapeMaster'}
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <a 
          href="/" 
          class="text-gray-600 hover:text-gray-900 transition-colors"
          class:text-blue-600={$page.url.pathname === '/'}
        >
          {m.nav_home?.() || 'Home'}
        </a>
        {#if $auth.isAuthenticated}
          <a 
            href="/dashboard" 
            class="text-gray-600 hover:text-gray-900 transition-colors"
            class:text-blue-600={$page.url.pathname === '/dashboard'}
          >
            {m.nav_dashboard?.() || 'Dashboard'}
          </a>
          <a 
            href="/scrape" 
            class="text-gray-600 hover:text-gray-900 transition-colors"
            class:text-blue-600={$page.url.pathname === '/scrape'}
          >
            {m.nav_scrape?.() || 'Scrape'}
          </a>
        {/if}
        <a 
          href="/pricing" 
          class="text-gray-600 hover:text-gray-900 transition-colors"
          class:text-blue-600={$page.url.pathname === '/pricing'}
        >
          {m.nav_pricing?.() || 'Pricing'}
        </a>
        <a 
          href="/docs" 
          class="text-gray-600 hover:text-gray-900 transition-colors"
          class:text-blue-600={$page.url.pathname === '/docs'}
        >
          {m.nav_docs?.() || 'Docs'}
        </a>
      </nav>

      <!-- Right side controls -->
      <div class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <ThemeToggle />
        
        <!-- Language Switcher -->
        <LanguageSwitcher currentPage={$page.url.pathname} />
        
        <!-- User Menu or Login/Register -->
        {#if $auth.isAuthenticated}
          <div class="relative">
            <button 
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onclick={() => mobileMenuOpen = !mobileMenuOpen}
            >
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User class="w-4 h-4 text-blue-600" />
              </div>
              <span class="hidden sm:block text-sm font-medium text-gray-700">
                {$auth.user?.email}
              </span>
            </button>
            
            {#if mobileMenuOpen}
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <a href="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {m.nav_account?.() || 'Account Settings'}
                </a>
                <button 
                  onclick={auth.logout}
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut class="w-4 h-4" />
                  <span>{m.nav_logout?.() || 'Logout'}</span>
                </button>
              </div>
            {/if}
          </div>
        {:else}
          <div class="flex items-center space-x-3">
            <Button href="/login" variant="ghost">
              {m.nav_login?.() || 'Login'}
            </Button>
            <Button href="/register">
              {m.nav_register?.() || 'Get Started'}
            </Button>
          </div>
        {/if}

        <!-- Mobile menu button -->
        <button 
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onclick={() => mobileMenuOpen = !mobileMenuOpen}
        >
          <Menu class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <div class="md:hidden border-t border-gray-200 py-4">
        <nav class="flex flex-col space-y-2">
          <a 
            href="/" 
            class="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            class:text-blue-600={$page.url.pathname === '/'}
          >
            {m.nav_home?.() || 'Home'}
          </a>
          {#if $auth.isAuthenticated}
            <a 
              href="/dashboard" 
              class="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              class:text-blue-600={$page.url.pathname === '/dashboard'}
            >
              {m.nav_dashboard?.() || 'Dashboard'}
            </a>
            <a 
              href="/scrape" 
              class="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              class:text-blue-600={$page.url.pathname === '/scrape'}
            >
              {m.nav_scrape?.() || 'Scrape'}
            </a>
          {/if}
          <a 
            href="/pricing" 
            class="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            class:text-blue-600={$page.url.pathname === '/pricing'}
          >
            {m.nav_pricing?.() || 'Pricing'}
          </a>
          <a 
            href="/docs" 
            class="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            class:text-blue-600={$page.url.pathname === '/docs'}
          >
            {m.nav_docs?.() || 'Docs'}
          </a>
          
          <!-- Mobile-only auth buttons -->
          {#if !$auth.isAuthenticated}
            <div class="border-t border-gray-200 pt-4 mt-4">
              <a 
                href="/login" 
                class="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {m.nav_login?.() || 'Login'}
              </a>
              <a 
                href="/register" 
                class="block px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                {m.nav_register?.() || 'Get Started'}
              </a>
            </div>
          {/if}
        </nav>
      </div>
    {/if}
  </div>
</header>