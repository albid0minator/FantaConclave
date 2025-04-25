const voteData = [
    { "name": "Matteo Zuppi", "votes": 769 },
    { "name": "Pierbattista Pizzaballa", "votes": 443 },
    { "name": "Luis Tagle", "votes": 704 },
    { "name": "Pietro Parolin", "votes": 508 },
    { "name": "Fridolin Ambongo", "votes": 277 },
    { "name": "Jean-Claude Hollerich", "votes": 67 },
    { "name": "Péter Erdő", "votes": 160 },
    { "name": "Willem Eijk", "votes": 23 },
    { "name": "Peter Turkson", "votes": 153 },
    { "name": "Carlos Aguiar Retes", "votes": 33 },
    { "name": "George Jacob Koovakad", "votes": 41 },
    { "name": "Dominique Mamberti", "votes": 21 },
    { "name": "Blase Cupich", "votes": 34 },
    { "name": "Baldassarre Reina", "votes": 47 },
    { "name": "Anders Arborelius", "votes": 38 },
    { "name": "Charles Bo", "votes": 93 },
    { "name": "Malcom Ranjith", "votes": 32 },
    { "name": "Wilton Gregory", "votes": 89 },
    { "name": "Giuseppe Betori", "votes": 25 },
    { "name": "Fernando Vérgez Alzaga", "votes": 34 },
    { "name": "Mario Grech", "votes": 37 },
    { "name": "Robert Francis Prevost", "votes": 104 },
    { "name": "Ángel Fernández Artime", "votes": 16 },
    { "name": "Robert Sarah", "votes": 265 },
    { "name": "Jean-Marc Aveline", "votes": 52 },
    { "name": "Daniel Fernando Sturla Berhouet", "votes": 17 },
    { "name": "Thomas Aquino Manyo Maeda", "votes": 35 },
    { "name": "Leonardo Ulrich Steiner", "votes": 17 },
    { "name": "Gerhard Ludwig Müller", "votes": 24 },
    { "name": "Mykola Bychok", "votes": 0 },
    { "name": "Giorgio Marengo", "votes": 45 },
    { "name": "Raymond Leo Burke", "votes": 42 },
    { "name": "Domenico Battaglia", "votes": 26 },
    { "name": "Joseph William Tobin", "votes": 19 },
    { "name": "Roberto Repole", "votes": 19 },
    { "name": "Timothy Radcliffe", "votes": 18 },
    { "name": "Kevin Joseph Farrell", "votes": 1 },
    { "name": "Fabio Baggio", "votes": 1 }
]

// Filtra e ordina i dati (mostra solo voti superiori a 20)
const filteredData = voteData
    .filter(item => item.votes >= 20)
    .sort((a, b) => b.votes - a.votes);

// Ottieni le etichette e i valori
const labels = filteredData.map(item => item.name);
const values = filteredData.map(item => item.votes);

let myChart = null;

// Crea colori per il grafico
function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * 137.5) % 360;
        colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
    }
    return colors;
}

// Funzione per creare o aggiornare il grafico
function createChart(type) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Distruggi il grafico precedente se esiste
    if (myChart) {
        myChart.destroy();
    }

    const colors = generateColors(filteredData.length);

    let chartConfig = {
        type: type === 'horizontalBar' ? 'bar' : type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Numero di scelte',
                data: values,
                backgroundColor: colors,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: type === 'pie',
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (type === 'pie') {
                                return context.label + ': ' + context.raw + ' (' +
                                    Math.round((context.raw / values.reduce((a, b) => a + b, 0)) * 100) + '%)';
                            } else {
                                return context.raw;
                            }
                        }
                    }
                }
            }
        }
    };

    // Configura specificamente per barre orizzontali
    if (type === 'horizontalBar') {
        chartConfig.options.indexAxis = 'y';
    }

    myChart = new Chart(ctx, chartConfig);
}

// Aggiungi event listener ai pulsanti
document.getElementById('barChartBtn').addEventListener('click', () => createChart('bar'));
document.getElementById('pieChartBtn').addEventListener('click', () => createChart('pie'));
document.getElementById('horizontalBarBtn').addEventListener('click', () => createChart('horizontalBar'));

// Crea il grafico iniziale (barre verticali)
document.addEventListener('DOMContentLoaded', () => createChart('bar'));