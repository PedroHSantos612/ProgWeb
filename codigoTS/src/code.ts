function calcularAreaCirculo(raio: number): number {
    return Math.PI * raio ** 2;
}

function calcularCircunferencia(raio: number): number {
    return 2 * Math.PI * raio;
}

document.getElementById("calculadora")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputRaio = document.getElementById("raio") as HTMLInputElement;
    const raio = parseFloat(inputRaio.value);
    if (!isNaN(raio)) {
        const area = calcularAreaCirculo(raio);
        const circunferencia = calcularCircunferencia(raio);
        document.getElementById("area")!.textContent = area.toFixed(2);
        document.getElementById("circunferencia")!.textContent = circunferencia.toFixed(2);
    }
});
