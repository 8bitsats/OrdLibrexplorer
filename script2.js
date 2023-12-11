// script.js
document.addEventListener('DOMContentLoaded', function() {
    fetchInscriptions().then(displayInscriptions);

    document.getElementById('search-button').addEventListener('click', function() {
        const query = document.getElementById('search-input').value;
        searchInscriptions(query).then(displayInscriptions);
    });
});

function fetchInscriptions() {
    // Fetch inscriptions from your API
    return fetch('/api/latest-inscriptions').then(response => response.json());
}

function searchInscriptions(query) {
    // Fetch search results from your API
    return fetch(`/api/search?query=${encodeURIComponent(query)}`).then(response => response.json());
}

function displayInscriptions(inscriptions) {
    const container = document.getElementById('inscriptions-container');
    container.innerHTML = ''; // Clear existing inscriptions

    inscriptions.forEach(inscription => {
        const element = document.createElement('div');
        element.className = 'inscription-card';
        element.innerHTML = `
            <h3>Inscription #${inscription.id}</h3>
            <p>${inscription.content}</p>
            <!-- More details can be added here -->
        `;
        container.appendChild(element);
    });
}
