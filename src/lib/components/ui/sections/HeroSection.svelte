<script>
  import { ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import * as m from '$paraglide/messages.js';
</script>

<section class="gradient-bg py-20 lg:py-32">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="text-center lg:text-left">
        <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          {m.hero_title?.() || 'Web Scraping Simplified'}
        </h1>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          {m.hero_description?.() || 'Extract data from any website with our powerful API. Fast, reliable and easy to use.'}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button href="/register" size="lg" class="flex items-center gap-2">
            {m.hero_cta_primary?.() || 'Get Started Free'}
            <ArrowRight class="w-5 h-5" />
          </Button>
          <Button href="#try-demo" variant="outline" size="lg">
            {m.hero_cta_secondary?.() || 'Try Demo'}
          </Button>
        </div>
      </div>
      
      <div class="flex justify-center">
        <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <div class="flex-1 bg-gray-100 rounded px-3 py-1 text-sm text-gray-600">
              https://example.com
            </div>
          </div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div class="flex items-center space-x-2 mt-4">
              <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-sm text-gray-600">Extracting data...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>