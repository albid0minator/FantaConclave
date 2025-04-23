document.addEventListener('DOMContentLoaded', function() {
    const cardinaliContainer = document.getElementById('cardinali-container');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // Variabile per conservare la copia dei dati originali
    let cardinaliCopy = [...cardinali];

    // Funzione per creare una card di cardinale
    // Funzione per creare una card di cardinale
    function createCardinalCard(cardinale) {
        const cardElement = document.createElement('div');
        cardElement.className = 'cardinal-card';
        cardElement.innerHTML = `
        <img src="${cardinale.imageUrl}" alt="${cardinale.nome}">
        <div class="info">
            <h3>${cardinale.nome}</h3>
            <p>${cardinale.eta || calculateAge(cardinale.dataNascita)} anni</p>
            <p>${cardinale.paese}</p>
            <p>${cardinale.ruolo}</p>
            <div class="stats">
                <span>${cardinale.continente}</span>
                <span class="score-badge">${cardinale.punteggio || 0} pt</span>
            </div>
        </div>
        <div class="info-overlay">Clicca per maggiori informazioni</div>
    `;

        // Aggiunta dell'evento per reindirizzare a Wikipedia quando si clicca sulla scheda
        cardElement.addEventListener('click', function() {
            window.open(cardinale.wikiUrl, '_blank');
        });

        return cardElement;
    }

    // Funzione per calcolare l'età dai dati di nascita
    function calculateAge(dataNascita) {
        if (!dataNascita) return "N/A";

        const [day, month, year] = dataNascita.split('/').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    // Funzione per ordinare e visualizzare i cardinali
    function sortAndDisplayCardinali(sortKey) {
        // Svuota il container
        cardinaliContainer.innerHTML = '';

        // Clona l'array originale per non modificarlo
        const sortedCardinali = [...cardinaliCopy];

        // Applica l'ordinamento in base alla chiave selezionata
        switch(sortKey) {
            case 'nome':
                sortedCardinali.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'paese':
                sortedCardinali.sort((a, b) => a.paese.localeCompare(b.paese));
                break;
            case 'continente':
                sortedCardinali.sort((a, b) => a.continente.localeCompare(b.continente));
                break;
            case 'punteggio':
                sortedCardinali.sort((a, b) => (b.punteggio || 0) - (a.punteggio || 0)); // Ordine decrescente
                break;
            default:
                // Lascia l'ordine originale
                break;
        }

        // Crea e aggiungi le card per ogni cardinale
        sortedCardinali.forEach(cardinale => {
            cardinaliContainer.appendChild(createCardinalCard(cardinale));
        });
    }

    // Gestisce i clic sui pulsanti di ordinamento
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Rimuove la classe active da tutti i pulsanti
            sortButtons.forEach(btn => btn.classList.remove('active'));
            // Aggiunge la classe active al pulsante cliccato
            this.classList.add('active');

            // Ordina e visualizza i cardinali in base alla chiave selezionata
            sortAndDisplayCardinali(this.getAttribute('data-sort'));
        });
    });

    // Salva una copia dei dati originali e mostra le card all'avvio
    cardinaliCopy = [...cardinali];
    sortAndDisplayCardinali('default');

    // Gestione della navigazione a schede
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentPanes = document.querySelectorAll('.content-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            contentPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });

// Gestione della ricerca
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

// Funzione per filtrare i cardinali in base al testo di ricerca
    function searchCardinali() {
        const searchText = searchInput.value.toLowerCase();

        // Se il campo di ricerca è vuoto, visualizza tutti i cardinali ordinati normalmente
        if (searchText.trim() === '') {
            // Trova il pulsante di ordinamento attivo e usa quel criterio
            const activeButton = document.querySelector('.sort-btn.active');
            sortAndDisplayCardinali(activeButton.getAttribute('data-sort'));
            return;
        }

        // Clona l'array originale
        const filteredCardinali = cardinaliCopy.filter(cardinale => {
            // Cerca nel nome, paese, ruolo, continente
            return cardinale.nome.toLowerCase().includes(searchText) ||
                cardinale.paese.toLowerCase().includes(searchText) ||
                cardinale.ruolo.toLowerCase().includes(searchText) ||
                cardinale.continente.toLowerCase().includes(searchText);
        });

        // Svuota il container
        cardinaliContainer.innerHTML = '';

        // Se non ci sono risultati, mostra un messaggio
        if (filteredCardinali.length === 0) {
            cardinaliContainer.innerHTML = '<div class="no-results">Nessun cardinale trovato. Prova con una ricerca diversa.</div>';
            return;
        }

        // Crea e aggiungi le card per ogni cardinale filtrato
        filteredCardinali.forEach(cardinale => {
            cardinaliContainer.appendChild(createCardinalCard(cardinale));
        });
    }

// Gestisci il clic sul pulsante di ricerca
    searchButton.addEventListener('click', searchCardinali);

// Gestisci la ricerca quando si preme "Invio" nella barra di ricerca
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchCardinali();
        }
    });

// Resetta la ricerca quando si cancella il contenuto della barra
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            // Trova il pulsante di ordinamento attivo e usa quel criterio
            const activeButton = document.querySelector('.sort-btn.active');
            sortAndDisplayCardinali(activeButton.getAttribute('data-sort'));
        }
    });




});



