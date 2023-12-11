// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Example data, this will come from the server in a real scenario
    const exampleInscriptions = [
        { id: '#47258241', content: 'MINT yisu 2100' },
        { id: '#47258242', content: 'MINT yisu 2100' },
        // ... more inscriptions
    ];

    const inscriptionsContainer = document.getElementById('inscriptions-container');
    
    // Function to create an inscription card
    function createInscriptionCard(inscription) {
        const card = document.createElement('div');
        card.className = 'inscription-card';
        card.innerHTML = `
            <div>${inscription.content}</div>
            <div>${inscription.id}</div>
        `;
        return card;
    }

    // Populate the inscriptions container with cards
    exampleInscriptions.forEach(inscription => {
        inscriptionsContainer.appendChild(createInscriptionCard(inscription));
    });
});
