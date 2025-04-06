document.addEventListener('DOMContentLoaded', () => {
    const slider1 = document.getElementById("myRange1");
    const wertImmo = document.getElementById("wertImmo");
    const slider2 = document.getElementById("myRange2");
    const zahlung = document.getElementById("zahlung");
    const maxValue2 = document.getElementById("maxValue2");
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Funktion zur Berechnung des Werts des oberen Sliders
    const calculateValue1 = (sliderValue) => {
        return Math.round(sliderValue);
    };

    // Funktion zur Berechnung des Werts des unteren Sliders
    const calculateValue2 = (sliderValue) => {
        return Math.round(sliderValue);
    };

    // Initialer Wert des oberen Sliders anzeigen
    wertImmo.innerHTML = `${calculateValue1(slider1.value).toLocaleString("de-DE")} €`;
    maxValue2.innerHTML = `${(calculateValue1(slider1.value) * 0.5).toLocaleString("de-DE")} €`;
    zahlung.innerHTML = `${calculateValue2(slider2.value).toLocaleString("de-DE")} €`;

    // Daten und Konfiguration des Diagramms
    const data = {
        labels: ['In Ihrem Besitz verbleibend', 'Anteil, den Sie verkaufen'],
        datasets: [{
            label: ' Anteil in Prozent',
            data: [
                (100 - (calculateValue2(slider2.value) / calculateValue1(slider1.value)) * 100),
                (calculateValue2(slider2.value) / calculateValue1(slider1.value)) * 100
            ],
            backgroundColor: [
                '#6A9033',
                '#d3d3d3'
            ],
            borderColor: [
                'rgb(255,255,255)',
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'doughnut', // Typ des Diagramms (Pie = Kreisdiagramm)
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    // Diagramm initialisieren
    let pieChart = new Chart(ctx, config);

    // Funktion zum Aktualisieren des Diagramms
    const updateChart = () => {
        const remaining = (100 - (parseFloat(slider2.value) / parseFloat(slider1.value)) * 100);
        const sold = (parseFloat(slider2.value) / parseFloat(slider1.value)) * 100;

        // Aktualisiere die Daten im Diagramm
        pieChart.data.datasets[0].data = [remaining, sold];
        pieChart.update(); // Diagramm aktualisieren
    };

    // Update des oberen Sliders
    slider1.oninput = function () {
        const upperValue = calculateValue1(this.value);
        wertImmo.innerHTML = `${upperValue.toLocaleString("de-DE")} €`;

        // Maximalwert für den unteren Slider berechnen
        const maxLowerValue = Math.floor(upperValue * 0.5);
        maxValue2.innerHTML = `${maxLowerValue.toLocaleString("de-DE")} €`;
        slider2.max = maxLowerValue;

        // Falls der aktuelle Wert von slider2 zu hoch ist, anpassen
        if (slider2.value > maxLowerValue) {
            slider2.value = maxLowerValue;
        }

        zahlung.innerHTML = `${calculateValue2(slider2.value).toLocaleString("de-DE")} €`;

        // Diagramm aktualisieren
        updateChart();
    };

    // Update des unteren Sliders
    slider2.oninput = function () {
        const lowerValue = calculateValue2(this.value);
        zahlung.innerHTML = `${lowerValue.toLocaleString("de-DE")} €`;

        // Diagramm aktualisieren
        updateChart();
    };
    // Button referenzieren
            const button = document.getElementById("button");

            // Funktion zum Öffnen der Anfrage
            button.addEventListener("click", function () {
                // anfrage.html mit Query-Parametern öffnen
                window.location.href = `anfrage.html?wertImmo=${wertImmo.innerText}&zahlung=${zahlung.innerText}`;
            });

});