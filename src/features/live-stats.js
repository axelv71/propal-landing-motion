import { logStyled } from '../utils/logger.js';
import { animate, inView } from 'motion';

async function getLiveStats() {
    const response = await fetch('https://app.propal.io/api/landing');
    const data = await response.json();

    return {
        totalProposals: data.acceptedProposalCount,
        totalOpportunities: data.opportunitySum,
        totalProposalAccepted: data.acceptedProposalCount,
    }
}

function animateCounter(element, targetValue, duration = 2.5) {
    animate(0, targetValue, {
        duration: duration,
        easing: "spring", // Spring simple sans paramètres
        stiffness: 100,
        damping: 40, // Beaucoup plus d'amortissement pour ralentir davantage
        onUpdate: (latest) => {
            // Utilise des décimales pour un rendu plus fluide, puis arrondit à la fin
            const value = Math.round(latest);
            element.innerHTML = value.toLocaleString(); // Ajoute des séparateurs de milliers pour un meilleur rendu
        },
    });
}

export default function initLiveStats() {
    logStyled('INIT', 'Live Stats');
    const totalProposals = document.getElementById('totalProposals');
    const totalOpportunities = document.getElementById('totalOpportunities');
    const totalProposalAccepted = document.getElementById('totalProposalAccepted');

    getLiveStats().then(liveStats => {        
        // Animation pour chaque élément quand il devient visible
        inView(totalProposals, () => {
            animateCounter(totalProposals, liveStats.totalProposals);
        });

        inView(totalOpportunities, () => {
            animateCounter(totalOpportunities, liveStats.totalOpportunities);
        });

        inView(totalProposalAccepted, () => {
            animateCounter(totalProposalAccepted, liveStats.totalProposalAccepted);
        });

    }).catch(error => {
        logStyled('ERROR', `Erreur lors de la récupération des stats: ${error}`);
    });
}