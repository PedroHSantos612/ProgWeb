"use strict";
function calcularAreaCirculo(raio) {
    return Math.PI * raio ** 2;
}
function calcularCircunferencia(raio) {
    return 2 * Math.PI * raio;
}
document.getElementById("calculadora")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputRaio = document.getElementById("raio");
    const raio = parseFloat(inputRaio.value);
    if (!isNaN(raio)) {
        const area = calcularAreaCirculo(raio);
        const circunferencia = calcularCircunferencia(raio);
        document.getElementById("area").textContent = area.toFixed(2);
        document.getElementById("circunferencia").textContent = circunferencia.toFixed(2);
    }
});
