// Endpoint do Apps Script
const endpointRanking = "https://script.google.com/macros/s/AKfycbzLih2c45N0fWtMR3tCkh2CVCUBCxHllYDgSjx9mbXHYUAxWn6PvFkVc8SFY-147ueUQw/exec";

// Função para criar tabela de ranking de pontuações (todos os registros)
function mostrarRankingPontuacoes(dados) {
    const div = document.getElementById("ranking");
    let html = "<h2>Ranking de Pontuações</h2>";
    html += "<table><tr><th>Posição</th><th>Equipe</th><th>Pontuação</th></tr>";

    // Ordena os registros pela pontuação (primeiro número antes da barra)
    dados.sort((a, b) => {
        const pontosA = parseInt(a["Pontuação Total"].split("/")[0]) || 0;
        const pontosB = parseInt(b["Pontuação Total"].split("/")[0]) || 0;
        return pontosB - pontosA;
    });

    dados.forEach((t, i) => {
        html += `<tr><td>${i + 1}</td><td>${t["Nome da Equipe"]}</td><td>${t["Pontuação Total"]}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Função para criar o ranking geral (melhor pontuação de cada equipe)
function mostrarRankingGeral(dados) {
    const div = document.getElementById("rankingGeral");
    let html = "<h2>Ranking Geral</h2>";
    html += "<table><tr><th>Posição</th><th>Equipe</th><th>Melhor Pontuação</th></tr>";

    const equipes = {};

    // Percorre todos os registros e guarda a melhor pontuação de cada equipe
    dados.forEach(t => {
        const nome = t["Nome da Equipe"];
        const pontos = parseInt(t["Pontuação Total"].split("/")[0]) || 0;

        if (!equipes[nome] || pontos > equipes[nome]) {
            equipes[nome] = pontos;
        }
    });

    // Converte em array e ordena do maior para o menor
    const rankingGeral = Object.entries(equipes)
        .map(([time, pontos]) => ({ time, pontos }))
        .sort((a, b) => b.pontos - a.pontos);

    rankingGeral.forEach((t, i) => {
        html += `<tr><td>${i + 1}</td><td>${t.time}</td><td>${t.pontos}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Busca os dados do JSON e atualiza o site
fetch(endpointRanking)
    .then(res => res.json())
    .then(dados => {
        mostrarRankingPontuacoes(dados);
        mostrarRankingGeral(dados);
    })
    .catch(err => console.error("Erro ao carregar dados:", err));
