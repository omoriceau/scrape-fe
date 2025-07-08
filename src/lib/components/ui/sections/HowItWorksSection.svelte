<script>
  import * as m from '$paraglide/messages.js';
  
  const steps = [
    {
      number: 1,
      title: 'Enter URL',
      description: 'Simply paste the URL of the website you want to scrape',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      number: 2,
      title: 'Configure Options',
      description: 'Choose your extraction preferences and data format',
      color: 'bg-green-100 text-green-600'
    },
    {
      number: 3,
      title: 'Get Results',
      description: 'Download your extracted data in seconds',
      color: 'bg-purple-100 text-purple-600'
    }
  ];
</script>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        {m.how_it_works_title?.() || 'How It Works'}
      </h2>
      <p class="text-lg text-gray-600">
        {m.how_it_works_subtitle?.() || 'Get started in three simple steps'}
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each steps as step}
        <div class="text-center">
          <div class="w-16 h-16 {step.color} rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold">{step.number}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{step.number}. {step.title}</h3>
          <p class="text-gray-600">{step.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>