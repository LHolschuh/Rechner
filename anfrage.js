document.addEventListener('DOMContentLoaded', () => {
// Werte aus der URL abrufen
const params = new URLSearchParams(window.location.search);
const wertImmo = params.get("wertImmo");
const zahlung = params.get("zahlung");
console.log(wertImmo);

    const wert = document.getElementById("wert");
    const auszahlung = document.getElementById("auszahlung");

    wert.value = `${wertImmo}`;
    auszahlung.value = `${zahlung}`;


    const submitButton = document.querySelector(".custom-color1");

    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Buttons

        // Suche alle Labels und überprüfe, ob sie ein Sternchen (*) enthalten
        const labels = document.querySelectorAll("label");
        let allFieldsFilled = true;

        labels.forEach((label) => {
            if (label.textContent.includes("*")) {
                // Suche das zugehörige Input- oder Textarea-Feld im gleichen Container
                const input = label.closest(".field").querySelector("input, textarea");
                if (input && !input.value.trim()) {
                    allFieldsFilled = false;

                    // Warnung: Zeige rote Umrandung
                    input.style.borderColor = "red";
                    input.style.boxShadow = "0 0 5px rgba(255, 0, 0, 0.5)";
                } else if (input) {
                    // Entferne die Warnung, wenn das Feld ausgefüllt ist
                    input.style.borderColor = "";
                    input.style.boxShadow = "";
                }
            }
        });

        if (!allFieldsFilled) {
            //alert("Bitte alle mit * markierten Felder ausfüllen!");
        } else {
            window.location.href = "mailVersendet.html";
        }
    });

    const backButton = document.querySelector(".custom-color2");

    backButton.addEventListener("click", () => {
        // Weiterleitung zu rechner.html
        window.location.href = "rechner.html";
    });
    });