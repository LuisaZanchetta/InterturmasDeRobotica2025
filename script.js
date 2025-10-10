// DADOS SIMULADOS - substitua com fetch da planilha depois
const ranking = [
    {time: "Time A", pontos: 25},
    {time: "Time B", pontos: 20},
    {time: "Time C", pontos: 15}
];

const rodadas = [
    {rodada: 1, vermelha: "Time A 10", azul: "Time B 5"},
    {rodada: 2, vermelha: "Time B 15", azul: "Time C 10"},
    {rodada: 3, vermelha: "Time A 5", azul: "Time C 5"}
];

// Função para criar tabela de ranking
function mostrarRanking() {
    const div = document.getElementById("ranking");
    let html = "<table><tr><th>Posição</th><th>Time</th><th>Pontos</th></tr>";
    ranking.sort((a,b) => b.pontos - a.pontos);
    ranking.forEach((t, i) => {
        html += `<tr><td>${i+1}</td><td>${t.time}</td><td>${t.pontos}</td></tr>`;
    });
    html += "</table>";
    div.innerHTML = html;
}

// Função para criar tabela de rodadas
function mostrarRodadas() {
    const div = document.getElementById("rodadas");
    let html = "<table><tr><th>Rodada</th><th>Aliança Vermelha</th><th>Aliança Azul</th></tr>";
    rodadas.forEach(r => {
        html += `<tr><td>${r.rodada}</td><td>${r.vermelha}</td><td>${r.azul}</td></tr>`;
    });
    html += "</table>";
    div.innerHTML = html;
}

// Executa as funções
mostrarRanking();
mostrarRodadas();
