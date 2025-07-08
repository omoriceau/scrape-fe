<script>
  import { ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import * as m from '$paraglide/messages.js';
</script>

<section class="py-20 bg-blue-600 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-bold mb-4">
      {m.cta_title?.() || 'Ready to Get Started?'}
    </h2>
    <p class="text-xl mb-8 opacity-90">
      {m.cta_description?.() || 'Join thousands of developers who trust ScrapeMaster for their web scraping needs'}
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        href="/register" 
        variant="secondary" 
        size="lg"
        class="flex items-center gap-2"
      >
        {m.cta_primary?.() || 'Start Free Trial'}
        <ArrowRight class="w-5 h-5" />
      </Button>
      
      <Button 
        href="/contact" 
        variant="outline"
        size="lg"
        class="border-white text-white hover:bg-white hover:text-blue-600"
      >
        {m.cta_secondary?.() || 'Contact Sales'}
      </Button>
    </div>
  </div>
</section>