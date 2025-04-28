const voteData = [
    { "name": "Matteo Zuppi", "votes": 1796 },
    { "name": "Pierbattista Pizzaballa", "votes": 1038 },
    { "name": "Luis Tagle", "votes": 1610 },
    { "name": "Pietro Parolin", "votes": 1246 },
    { "name": "Fridolin Ambongo", "votes": 590 },
    { "name": "Jean-Claude Hollerich", "votes": 165 },
    { "name": "Péter Erdő", "votes": 332 },
    { "name": "Willem Eijk", "votes": 48 },
    { "name": "Peter Turkson", "votes": 390 },
    { "name": "Carlos Aguiar Retes", "votes": 63 },
    { "name": "George Jacob Koovakad", "votes": 87 },
    { "name": "Dominique Mamberti", "votes": 76 },
    { "name": "Blase Cupich", "votes": 80 },
    { "name": "Baldassarre Reina", "votes": 91 },
    { "name": "Anders Arborelius", "votes": 82 },
    { "name": "Charles Bo", "votes": 220 },
    { "name": "Malcom Ranjith", "votes": 72 },
    { "name": "Wilton Gregory", "votes": 237 },
    { "name": "Giuseppe Betori", "votes": 52 },
    { "name": "Fernando Vérgez Alzaga", "votes": 95 },
    { "name": "Mario Grech", "votes": 97 },
    { "name": "Robert Francis Prevost", "votes": 200 },
    { "name": "Ángel Fernández Artime", "votes": 41 },
    { "name": "Robert Sarah", "votes": 666 },
    { "name": "Jean-Marc Aveline", "votes": 136 },
    { "name": "Daniel Fernando Sturla Berhouet", "votes": 43 },
    { "name": "Thomas Aquino Manyo Maeda", "votes": 124 },
    { "name": "Leonardo Ulrich Steiner", "votes": 33 },
    { "name": "Gerhard Ludwig Müller", "votes": 78 },
    { "name": "Mykola Bychok", "votes": 0 },
    { "name": "Giorgio Marengo", "votes": 146 },
    { "name": "Raymond Leo Burke", "votes": 156 },
    { "name": "Domenico Battaglia", "votes": 92 },
    { "name": "Joseph William Tobin", "votes": 75 },
    { "name": "Roberto Repole", "votes": 70 },
    { "name": "Timothy Radcliffe", "votes": 76 },
    { "name": "Kevin Joseph Farrell", "votes": 76 },
    { "name": "Fabio Baggio", "votes": 61 },
    { "name": "L'Outsider", "votes": 0 }
];


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