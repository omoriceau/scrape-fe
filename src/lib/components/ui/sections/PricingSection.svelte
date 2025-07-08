<script>
  import { CircleCheckBig } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import * as m from '$paraglide/messages.js';
  
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        '5 requests per hour',
        'Basic data extraction',
        'JSON output'
      ],
      cta: 'Get Started Free',
      href: '/register',
      variant: 'outline'
    },
    {
      name: 'Pro',
      price: 29,
      features: [
        'Unlimited requests',
        'Advanced scraping',
        'Multiple formats',
        'Priority support'
      ],
      cta: 'Start Pro Trial',
      href: '/register',
      variant: 'primary',
      popular: true
    }
  ];
</script>

<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        {m.pricing_title?.() || 'Simple Pricing'}
      </h2>
      <p class="text-lg text-gray-600">
        {m.pricing_subtitle?.() || 'Choose the plan that fits your needs'}
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {#each plans as plan}
        <div class="card text-center relative" class:border-blue-200={plan.popular}>
          {#if plan.popular}
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </span>
            </div>
          {/if}
          
          <h3 class="text-2xl font-bold mb-2">{plan.name}</h3>
          <div class="text-4xl font-bold text-blue-600 mb-4">
            ${plan.price}
            <span class="text-lg text-gray-500">/month</span>
          </div>
          
          <ul class="space-y-2 mb-6 text-left">
            {#each plan.features as feature}
              <li class="flex items-center">
                <CircleCheckBig class="w-4 h-4 text-green-500 mr-2" />
                {feature}
              </li>
            {/each}
          </ul>
          
          <Button href={plan.href} variant={plan.variant} size="lg" class="w-full">
            {plan.cta}
          </Button>
        </div>
      {/each}
    </div>
  </div>
</section>