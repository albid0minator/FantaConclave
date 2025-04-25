const voteData = [
    { name: "Matteo Zuppi", votes: 429 },
    { name: "Pierbattista Pizzaballa", votes: 235 },
    { name: "Luis Tagle", votes: 396 },
    { name: "Pietro Parolin", votes: 292 },
    { name: "Fridolin Ambongo", votes: 157 },
    { name: "Jean-Claude Hollerich", votes: 36 },
    { name: "Péter Erdő", votes: 96 },
    { name: "Willem Eijk", votes: 15 },
    { name: "Peter Turkson", votes: 81 },
    { name: "Carlos Aguiar Retes", votes: 19 },
    { name: "George Jacob Koovakad", votes: 25 },
    { name: "Dominique Mamberti", votes: 8 },
    { name: "Blase Cupich", votes: 15 },
    { name: "Baldassarre Reina", votes: 21 },
    { name: "Anders Arborelius", votes: 20 },
    { name: "Charles Bo", votes: 50 },
    { name: "Malcom Ranjith", votes: 17 },
    { name: "Wilton Gregory", votes: 48 },
    { name: "Giuseppe Betori", votes: 15 },
    { name: "Fernando Vérgez Alzaga", votes: 19 },
    { name: "Mario Grech", votes: 27 },
    { name: "Robert Francis Prevost", votes: 67 },
    { name: "Ángel Fernández Artime", votes: 8 },
    { name: "Robert Sarah", votes: 146 },
    { name: "Jean-Marc Aveline", votes: 31 },
    { name: "Daniel Fernando Sturla Berhouet", votes: 10 },
    { name: "Thomas Aquino Manyo Maeda", votes: 25 },
    { name: "Leonardo Ulrich Steiner", votes: 13 },
    { name: "Gerhard Ludwig Müller", votes: 14 },
    { name: "Mykola Bychok", votes: 0 },
    { name: "Giorgio Marengo", votes: 15 },
    { name: "Raymond Leo Burke", votes: 16 },
    { name: "Domenico Battaglia", votes: 10 },
    { name: "Joseph William Tobin", votes: 2 },
    { name: "Roberto Repole", votes: 10 },
    { name: "Timothy Radcliffe", votes: 3 }
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