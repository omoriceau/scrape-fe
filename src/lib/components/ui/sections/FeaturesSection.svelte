<script>
  import { Zap, Shield, Users } from 'lucide-svelte';
  import * as m from '$paraglide/messages.js';
  
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get your data in seconds, not minutes',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: '99.9% Uptime',
      description: 'Reliable service you can count on',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Easy to Use',
      description: 'No coding required - just enter a URL',
      color: 'text-purple-600'
    }
  ];
</script>

<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        {m.features_title?.() || 'Why Choose Our Service?'}
      </h2>
      <p class="text-lg text-gray-600">
        {m.features_subtitle?.() || 'Built for developers, designed for scale'}
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="card text-center card-hover">
          <svelte:component this={feature.icon} class="w-12 h-12 {feature.color} mx-auto mb-4" />
          <h3 class="text-xl font-bold mb-2">{feature.title}</h3>
          <p class="text-gray-600">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>