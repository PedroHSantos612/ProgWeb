document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let points = [];

    body.addEventListener('mousemove', (event) => {
        if (points.length >= 8) {
            return; // Não adiciona mais pontos se já houver 8
        }

        // Cria um novo ponto
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";

        // Adiciona o novo ponto ao body e ao array de pontos
        body.appendChild(dot);
        points.push(dot);
    });
});
