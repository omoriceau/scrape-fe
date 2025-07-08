import { writable } from 'svelte/store';

function createScrapingStore() {
  const { subscribe, set, update } = writable({
    jobs: [],
    currentJob: null,
    loading: false,
    error: null
  });

  return {
    subscribe,
    
    async submitJob(url, options = {}) {
      update(s => ({ ...s, loading: true, error: null }));
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const job = {
          id: Date.now(),
          url,
          status: 'pending',
          created_at: new Date().toISOString(),
          options,
          progress: 0
        };
        
        update(s => ({ 
          ...s, 
          jobs: [job, ...s.jobs], 
          currentJob: job,
          loading: false 
        }));
        
        // Simulate job progression
        this.simulateJobProgress(job.id);
        
        return { success: true, jobId: job.id };
      } catch (error) {
        update(s => ({ ...s, loading: false, error: error.message }));
        return { success: false, error: error.message };
      }
    },
    
    async simulateJobProgress(jobId) {
      const progressSteps = [20, 40, 60, 80, 100];
      const statuses = ['processing', 'processing', 'processing', 'processing', 'completed'];
      
      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        update(s => ({
          ...s,
          jobs: s.jobs.map(job => 
            job.id === jobId 
              ? { 
                  ...job, 
                  progress: progressSteps[i], 
                  status: statuses[i],
                  ...(statuses[i] === 'completed' && {
                    results: {
                      title: 'Sample Page Title',
                      description: 'Sample page description extracted from the website.',
                      links: ['https://example.com/page1', 'https://example.com/page2'],
                      images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
                    }
                  })
                }
              : job
          ),
          currentJob: s.currentJob?.id === jobId 
            ? { 
                ...s.currentJob, 
                progress: progressSteps[i], 
                status: statuses[i],
                ...(statuses[i] === 'completed' && {
                  results: {
                    title: 'Sample Page Title',
                    description: 'Sample page description extracted from the website.',
                    links: ['https://example.com/page1', 'https://example.com/page2'],
                    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
                  }
                })
              }
            : s.currentJob
        }));
      }
    },
    
    clearCurrentJob() {
      update(s => ({ ...s, currentJob: null }));
    }
  };
}

export const scraping = createScrapingStore();