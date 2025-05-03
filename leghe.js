document.addEventListener('DOMContentLoaded', function() {
    // Riferimento all'elemento contenitore delle leghe
    const legheContainer = document.getElementById('leghe-container');
    const searchInput = document.getElementById('search-leghe');
    const sortSelect = document.getElementById('sort-leghe');

    // Funzione per visualizzare le leghe in formato compatto
    function displayLegheCompact(leghe) {
        // Svuota il contenitore
        legheContainer.innerHTML = '';

        // Se non ci sono leghe, mostra un messaggio
        if (leghe.length === 0) {
            legheContainer.innerHTML = '<p>Nessuna lega trovata.</p>';
            return;
        }

        // Crea un elemento per ogni lega
        leghe.forEach(lega => {
            // Crea l'elemento della lega
            const legaElement = document.createElement('div');
            legaElement.className = 'lega-card';

            // Crea l'intestazione con titolo e conteggio
            const legaHeader = document.createElement('div');
            legaHeader.className = 'lega-header';

            const legaTitle = document.createElement('h3');
            legaTitle.className = 'lega-title';
            legaTitle.textContent = lega.nome;

            const legaCount = document.createElement('span');
            legaCount.className = 'lega-count';
            legaCount.textContent = lega.partecipanti.length;

            legaHeader.appendChild(legaTitle);
            legaHeader.appendChild(legaCount);

            // Crea la lista compatta dei partecipanti (primi 4)
            const partecipantiList = document.createElement('div');
            partecipantiList.className = 'partecipanti-compact';

            // Mostra solo i primi 4 partecipanti inizialmente
            const visibleParticipants = lega.partecipanti.slice(0, 4);
            const hiddenParticipants = lega.partecipanti.slice(4);

            visibleParticipants.forEach(partecipante => {
                const partecipanteChip = document.createElement('span');
                partecipanteChip.className = 'partecipante-chip';
                partecipanteChip.textContent = partecipante.nome;
                partecipantiList.appendChild(partecipanteChip);
            });

            // Se ci sono più di 4 partecipanti, aggiungi un pulsante "mostra altro"
            let showMoreBtn = null;
            if (hiddenParticipants.length > 0) {
                const moreChip = document.createElement('span');
                moreChip.className = 'partecipante-chip';
                moreChip.textContent = `+${hiddenParticipants.length}`;
                partecipantiList.appendChild(moreChip);

                // Aggiungi il pulsante "mostra altro"
                showMoreBtn = document.createElement('div');
                showMoreBtn.className = 'show-more';
                showMoreBtn.textContent = 'Mostra tutti';
                showMoreBtn.dataset.expanded = 'false';

                // Gestisci il click sul pulsante
                showMoreBtn.addEventListener('click', function() {
                    if (this.dataset.expanded === 'false') {
                        // Espandi la lista
                        partecipantiList.innerHTML = '';
                        lega.partecipanti.forEach(partecipante => {
                            const partecipanteChip = document.createElement('span');
                            partecipanteChip.className = 'partecipante-chip';
                            partecipanteChip.textContent = partecipante.nome;
                            partecipantiList.appendChild(partecipanteChip);
                        });
                        this.textContent = 'Mostra meno';
                        this.dataset.expanded = 'true';
                    } else {
                        // Comprimi la lista
                        partecipantiList.innerHTML = '';
                        visibleParticipants.forEach(partecipante => {
                            const partecipanteChip = document.createElement('span');
                            partecipanteChip.className = 'partecipante-chip';
                            partecipanteChip.textContent = partecipante.nome;
                            partecipantiList.appendChild(partecipanteChip);
                        });

                        const moreChip = document.createElement('span');
                        moreChip.className = 'partecipante-chip';
                        moreChip.textContent = `+${hiddenParticipants.length}`;
                        partecipantiList.appendChild(moreChip);

                        this.textContent = 'Mostra tutti';
                        this.dataset.expanded = 'false';
                    }
                });
            }

            // Assembla tutti gli elementi
            legaElement.appendChild(legaHeader);
            legaElement.appendChild(partecipantiList);
            if (showMoreBtn) {
                legaElement.appendChild(showMoreBtn);
            }

            // Aggiungi la lega al contenitore
            legheContainer.appendChild(legaElement);
        });
    }

    // Funzione per filtrare e ordinare le leghe
    function filterAndSortLeghe() {
        if (typeof legheDati === 'undefined') return;

        const searchTerm = searchInput.value.toLowerCase();
        const sortBy = sortSelect.value;

        // Filtra le leghe in base al termine di ricerca
        let filteredLeghe = legheDati.filter(lega =>
            lega.nome.toLowerCase().includes(searchTerm)
        );

        // Ordina le leghe
        if (sortBy === 'nome') {
            filteredLeghe.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (sortBy === 'partecipanti') {
            filteredLeghe.sort((a, b) => b.partecipanti.length - a.partecipanti.length);
        }

        // Visualizza le leghe filtrate e ordinate
        displayLegheCompact(filteredLeghe);
    }

    // Aggiungi listener per la ricerca e l'ordinamento
    if (searchInput && sortSelect) {
        searchInput.addEventListener('input', filterAndSortLeghe);
        sortSelect.addEventListener('change', filterAndSortLeghe);
    }

    // Inizializza la visualizzazione con tutte le leghe disponibili
    if (typeof legheDati !== 'undefined') {
        displayLegheCompact(legheDati);
    } else {
        console.error('File legheDati.js non caricato correttamente');
        legheContainer.innerHTML = '<p>Impossibile caricare i dati delle leghe. Riprova più tardi.</p>';
    }
});