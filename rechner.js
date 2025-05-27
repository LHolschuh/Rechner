document.addEventListener('DOMContentLoaded', () => {
    // Elemente
    const slider1 = document.getElementById("myRange1");
    const wertImmo = document.getElementById("wertImmo");
    const slider2 = document.getElementById("myRange2");
    const zahlung = document.getElementById("zahlung");
    const maxValue2 = document.getElementById("maxValue2");
    const verkaufen = document.getElementById("verkaufen");
    const verbleibend = document.getElementById("verbleibend");
    const nutzung = document.getElementById("nutzung");
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const gesamttext = document.getElementById('gesamttext');
    const gesamtwert = document.getElementById('gesamtwert');
    const anteilprozent = document.getElementById('anteilProzent');
    const anteilwert = document.getElementById('anteilwert');
    const entgeltwert = document.getElementById('entgeltwert');
    const auszahlung1 = document.getElementById('auszahlung1');
    const auszahlung2 = document.getElementById('auszahlung2');
    const gesamt = document.getElementById('gesamt');
    const vergleich= document.getElementById('vergleich');
    const slider3 = document.getElementById("myRange3");
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {
        slider.addEventListener("touchmove", () => {
            slider.style.opacity = "1"; // Optische Rückmeldung für Touch-Nutzer
        });
    });

    // Helper-Funktionen
    const calculateValue = (sliderValue) => Math.round(sliderValue);

    const updateResults = () => {
        const immoWert = parseFloat(slider1.value);
        const sofortZahlung = parseFloat(slider2.value);

        // Prozentwerte berechnen
        const verkaufenProzent = ((sofortZahlung / immoWert) * 100).toFixed(0);
        const verbleibendProzent = (100 - verkaufenProzent).toFixed(0);
        const nutzungsgebuehr = ((sofortZahlung * 0.0529) / 12).toFixed(0);

        // Ergebnisse im DOM aktualisieren
        verkaufen.innerHTML = `Anteil, den Sie verkaufen: ${verkaufenProzent} %`;
        verbleibend.innerHTML = `In Ihrem Besitz verbleibend: ${verbleibendProzent} %`;
        nutzung.innerHTML = `Monatliche Nutzungsgebühr (5,29 % p.a.): ${nutzungsgebuehr} €`;

        return { verkaufenProzent, verbleibendProzent };
    };

    // Chart-Konfiguration
    const chartConfig = {
        type: 'doughnut',
        data: {
            labels: ['In Ihrem Besitz verbleibend', 'Anteil, den Sie verkaufen'],
            datasets: [{
                label: 'Anteil in Prozent',
                data: [100, 0], // Initialer Wert
                backgroundColor: ['#6A9033', '#d3d3d3'],
                borderColor: ['rgb(255,255,255)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true }
            }
        }
    };

    let pieChart = new Chart(ctx, chartConfig);

    const updateChart = ({ verkaufenProzent, verbleibendProzent }) => {
        pieChart.data.datasets[0].data = [verbleibendProzent, verkaufenProzent];
        pieChart.update();
    };

    // Slider 1 aktualisieren
    const updateSlider1 = () => {
        const immoWert = calculateValue(slider1.value);
        wertImmo.innerHTML = `${immoWert.toLocaleString("de-DE")} €`;



        // Maximalwert für Slider 2 berechnen
        const maxLowerValue = Math.floor(immoWert * 0.5);
        maxValue2.innerHTML = `${maxLowerValue.toLocaleString("de-DE")} €`;
        slider2.max = maxLowerValue;

        // Prüfen, ob Slider 2 noch passt
        if (parseFloat(slider2.value) > maxLowerValue) {
            slider2.value = maxLowerValue;
        }

        zahlung.innerHTML = `${calculateValue(slider2.value).toLocaleString("de-DE")} €`;

        // Ergebnisse und Chart aktualisieren
        const results = updateResults();
        updateChart(results);
        updateValues();
    };

    // Slider 2 aktualisieren
    const updateSlider2 = () => {
        const sofortZahlung = calculateValue(slider2.value);
        zahlung.innerHTML = `${sofortZahlung.toLocaleString("de-DE")} €`;

        // Ergebnisse und Chart aktualisieren
        const results = updateResults();
        updateChart(results);
        updateValues();
    };
    function updateValues() {
        const jahre = slider3.value;
        const immoWert = parseFloat(slider1.value);
        const sofortZahlung = parseFloat(slider2.value);
        const verkaufenProzent = ((sofortZahlung / immoWert) * 100).toFixed(0);
        const verbleibendProzent = (100 - verkaufenProzent).toFixed(0);
        const nutzungsgebuehr = ((sofortZahlung * 0.0529) / 12).toFixed(0);
        const gesamtwertNachJahren = Math.round(immoWert * Math.pow(1.02, jahre));
        gesamttext.innerHTML = `Gesamtwert der Immobilie nach ${jahre} Jahren`;
gesamtwert.innerHTML = `${Math.round(immoWert * Math.pow(1.02, jahre)).toLocaleString("de-DE")} €`;
anteilprozent.innerHTML = `Ihr Anteil ${verbleibendProzent} %`;
const anteilWert = Math.round(gesamtwertNachJahren * verbleibendProzent/100);
anteilwert.innerHTML = `${anteilWert.toLocaleString("de-DE")} €`;
const entgeltWert = Math.round(gesamtwertNachJahren * 0.0375);
entgeltwert.innerHTML = `${entgeltWert.toLocaleString("de-DE")} €`;
auszahlung1.innerHTML = `${sofortZahlung.toLocaleString("de-DE")} €`;
const auszahlungZwei = anteilWert - entgeltWert;
auszahlung2.innerHTML = `${auszahlungZwei.toLocaleString("de-DE")} €`;
gesamt.innerHTML = `${(sofortZahlung + auszahlungZwei).toLocaleString("de-DE")} €`;
vergleich.innerHTML = `${immoWert.toLocaleString("de-DE")} €`;

        }

    // Initial laden
    updateSlider1();
    updateResults();
    updateValues();

    // Events registrieren
    slider1.addEventListener('input', updateSlider1);
    slider2.addEventListener('input', updateSlider2);
    slider3.addEventListener('input', updateValues);
});