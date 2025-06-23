import posthog from 'posthog-js';
import { logStyled } from '../utils/logger.js';

export default function initPosthog() {
    logStyled('INIT', 'Posthog');

    posthog.init('phc_7xr4WnG1tFe47rI9uP32KLTuvmlFmjMoBWIYUlpDnjU', 
        { 
            api_host: 'https://eu.i.posthog.com',
            autocapture: true,
            defaults: '2025-05-24' ,
            loaded: (ph) => {
                if (location.hostname === 'propal.io') {
                  ph.capture('pageview', { source: 'landing' });
                }
              },
        });

    logStyled('SUCCESS', 'Posthog initialized');
}