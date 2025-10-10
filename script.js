// Endpoint do Apps Script
const endpointRanking = "https://script.google.com/macros/s/AKfycbzLih2c45N0fWtMR3tCkh2CVCUBCxHllYDgSjx9mbXHYUAxWn6PvFkVc8SFY-147ueUQw/exec";

// Função para criar tabela de ranking
function mostrarRanking(dados) {
    const div = document.getElementById("ranking");
    let html = "<table><tr><th>Posição</th><th>Time</th><th>Pontos</th></tr>";

    // Ordena pelo campo 'Pontuação Total' decrescente
    dados.sort((a,b) => b["Pontuação Total"] - a["Pontuação Total"]);

    dados.forEach((t, i) => {
        html += `<tr><td>${i+1}</td><td>${t["Nome da Equipe"]}</td><td>${t["Pontuação Total"]}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Função para criar tabela de rodadas
function mostrarRodadas(dados) {
    const div = document.getElementById("rodadas");
    let html = "<table><tr><th>Rodada</th><th>Aliança Vermelha</th><th>Aliança Azul</th></tr>";

    dados.forEach(r => {
        // Combina os nomes das equipes de cada aliança
        const vermelha = `${r["Vermelha 1"]} + ${r["Vermelha 2"]}`;
        const azul = `${r["Azul 1"]} + ${r["Azul 2"]}`;
        html += `<tr><td>${r["Rodadas"]}</td><td>${vermelha}</td><td>${azul}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Busca os dados do JSON e atualiza o site
fetch(endpointRanking)
    .then(res => res.json())
    .then(dados => {
        console.log(dados); // verifique se os nomes batem com a planilha
        mostrarRanking(dados);
        mostrarRodadas(dados);
    })
    .catch(err => console.error("Erro ao carregar dados:", err));
