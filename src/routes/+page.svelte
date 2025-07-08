<script>
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import HeroSection from '$lib/components/ui/sections/HeroSection.svelte';
  import DemoSection from '$lib/components/ui/sections/DemoSection.svelte';
  import FeaturesSection from '$lib/components/ui/sections/FeaturesSection.svelte';
  import HowItWorksSection from '$lib/components/ui/sections/HowItWorksSection.svelte';
  import PricingSection from '$lib/components/ui/sections/PricingSection.svelte';
  import CTASection from '$lib/components/ui/sections/CTASection.svelte';
</script>

<svelte:head>
  <title>ScrapeMaster - Professional Web Scraping Service</title>
  <meta name="description" content="Extract data from any website with our powerful API. Fast, reliable, and easy to use web scraping service." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Header />
  
  <main class="flex-1">
    <HeroSection />
    <DemoSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PricingSection />
    <CTASection />
  </main>
  
  <Footer />
</div>

