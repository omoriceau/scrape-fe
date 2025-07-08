<script>
  import { Globe, Play } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import * as m from '$paraglide/messages.js';
  
  let url = '';
  let format = 'json';
  let isLoading = false;
  let result = null;
  
  const handleSubmit = async () => {
    if (!url) return;
    
    isLoading = true;
    // Simulate API call
    setTimeout(() => {
      result = {
        status: 'success',
        data: 'Sample scraped data would appear here...'
      };
      isLoading = false;
    }, 2000);
  };
</script>

<section id="try-demo" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        {m.demo_title?.() || 'Try It Now - No Registration Required'}
      </h2>
      <p class="text-lg text-gray-600">
        {m.demo_description?.() || 'Experience the power of our web scraping service with a free demo'}
      </p>
    </div>
    
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card">
          <div class="space-y-6">
            <div class="flex items-center space-x-2">
              <Globe class="w-6 h-6 text-blue-600" />
              <h3 class="text-lg font-semibold">Web Scraper Demo</h3>
            </div>
            
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700" for="url">
                  Target URL <span class="text-red-500">*</span>
                </label>
                <input
                  id="url"
                  type="url"
                  bind:value={url}
                  placeholder="Enter website URL (e.g., https://example.com)"
                  required
                  class="input"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="format" class="block text-sm font-medium text-gray-700 mb-1">
                    Output Format
                  </label>
                  <select id="format" bind:value={format} class="input">
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                
                <div class="flex items-end">
                  <Button 
                    type="submit" 
                    disabled={isLoading || !url}
                    class="w-full flex items-center justify-center gap-2"
                  >
                    {#if isLoading}
                      <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Scraping...
                    {:else}
                      <Play class="w-4 h-4" />
                      Scrape Now
                    {/if}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div class="card">
          {#if result}
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Results</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <pre class="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          {:else}
            <div class="text-center py-12">
              <Globe class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-500 mb-2">Ready to Scrape</h3>
              <p class="text-sm text-gray-400">
                Enter a URL above and click "Scrape Now" to see the magic happen
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>