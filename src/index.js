import initLiveStats from './features/live-stats.js';
import initPosthog from './features/posthog.js';

initPosthog();

document.addEventListener('DOMContentLoaded', () => {
    initLiveStats();
})