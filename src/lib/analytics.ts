export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  // Placeholder for actual analytics API call (e.g., Google Analytics, Mixpanel, PostHog)
  console.log(`[Analytics] Event: ${eventName}`, eventData || {});
  
  // Example implementation:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', eventName, eventData);
  // }
};
