// Endpoint do Apps Script
const endpoint = "https://script.google.com/macros/s/AKfycbzLih2c45N0fWtMR3tCkh2CVCUBCxHllYDgSjx9mbXHYUAxWn6PvFkVc8SFY-147ueUQw/exec";

// Função para exibir o ranking
function mostrarRanking(dados) {
    const div = document.getElementById("ranking");
    let html = "<table><tr><th>Posição</th><th>Nome da Equipe</th><th>Pontuação</th></tr>";

    // Agrupa por equipe e soma a pontuação
    const ranking = {};
    dados.forEach(linha => {
        const equipe = linha["Nome da Equipe"];
        const pontosTexto = linha["Pontuação"];
        const pontos = parseInt(pontosTexto.split("/")[0].trim()) || 0; // pega só o número antes da barra

        if (!ranking[equipe]) ranking[equipe] = 0;
        ranking[equipe] += pontos;
    });

    // Converte para array e ordena
    const rankingArray = Object.entries(ranking)
        .map(([equipe, pontos]) => ({ equipe, pontos }))
        .sort((a, b) => b.pontos - a.pontos);

    // Monta a tabela
    rankingArray.forEach((t, i) => {
        html += `<tr><td>${i + 1}</td><td>${t.equipe}</td><td>${t.pontos}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Função para exibir as rodadas
function mostrarRodadas(dados) {
    const div = document.getElementById("rodadas");
    let html = "<table><tr><th>Rodada</th><th>Nome da Equipe</th><th>Aliança</th><th>Pontuação</th><th>Juiz</th></tr>";

    dados.forEach(r => {
        html += `
            <tr>
                <td>${r["Rodadas"]}</td>
                <td>${r["Nome da Equipe"]}</td>
                <td>${r["Aliança"]}</td>
                <td>${r["Pontuação"]}</td>
                <td>${r["Juiz"]}</td>
            </tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Buscar dados do Google Sheets
fetch(endpoint)
    .then(res => res.json())
    .then(dados => {
        console.log(dados); // 👀 veja no console se os nomes das colunas estão certinhos
        mostrarRanking(dados);
        mostrarRodadas(dados);
    })
    .catch(err => console.error("Erro ao carregar dados:", err));
