// File JavaScript per gestire la visualizzazione delle leghe
document.addEventListener('DOMContentLoaded', function() {
    // Riferimento all'elemento contenitore delle leghe
    const legheContainer = document.getElementById('leghe-container');

    // Funzione per visualizzare le leghe
    function displayLeghe(leghe) {
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

            // Crea il titolo della lega
            const legaTitle = document.createElement('h3');
            legaTitle.className = 'lega-title';
            legaTitle.textContent = lega.nome;

            // Crea la lista dei partecipanti
            const partecipantiList = document.createElement('ul');
            partecipantiList.className = 'partecipanti-list';

            // Aggiungi i partecipanti alla lista
            lega.partecipanti.forEach((partecipante, index) => {
                const partecipanteItem = document.createElement('li');
                partecipanteItem.className = 'partecipante-item';

                const partecipanteName = document.createElement('span');
                partecipanteName.className = 'partecipante-name';
                partecipanteName.textContent = `${index + 1}. ${partecipante.nome}`;

                partecipanteItem.appendChild(partecipanteName);
                partecipantiList.appendChild(partecipanteItem);
            });

            // Assembla tutti gli elementi
            legaElement.appendChild(legaTitle);
            legaElement.appendChild(partecipantiList);

            // Aggiungi la lega al contenitore
            legheContainer.appendChild(legaElement);
        });
    }

    // Inizializza la visualizzazione con tutte le leghe disponibili
    if (typeof legheDati !== 'undefined') {
        displayLeghe(legheDati);
    } else {
        console.error('File legheDati.js non caricato correttamente');
        legheContainer.innerHTML = '<p>Impossibile caricare i dati delle leghe. Riprova più tardi.</p>';
    }
});