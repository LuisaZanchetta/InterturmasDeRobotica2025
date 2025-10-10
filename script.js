// Endpoint do Apps Script
const endpointRanking = "https://script.google.com/macros/s/AKfycbzLih2c45N0fWtMR3tCkh2CVCUBCxHllYDgSjx9mbXHYUAxWn6PvFkVc8SFY-147ueUQw/exec";

// Função auxiliar para acessar os campos sem se preocupar com letras maiúsculas/minúsculas
function getValor(obj, chaveProcurada) {
    const chave = Object.keys(obj).find(k => k.trim().toLowerCase() === chaveProcurada.trim().toLowerCase());
    return chave ? obj[chave] : "";
}

// Função para criar tabela de ranking
function mostrarRanking(dados) {
    const div = document.getElementById("ranking");
    let html = "<table><tr><th>Posição</th><th>Time</th><th>Pontos</th></tr>";

    // Ordena pelo campo 'Pontuação Total' (caso o valor tenha barra ou texto, extrai número)
    dados.sort((a, b) => {
        const pontosA = parseInt(getValor(a, "Pontuação Total")) || 0;
        const pontosB = parseInt(getValor(b, "Pontuação Total")) || 0;
        return pontosB - pontosA;
    });

    dados.forEach((t, i) => {
        const nome = getValor(t, "Nome da Equipe");
        const pontos = getValor(t, "Pontuação Total");
        html += `<tr><td>${i + 1}</td><td>${nome}</td><td>${pontos}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Função para criar tabela de rodadas
function mostrarRodadas(dados) {
    const div = document.getElementById("rodadas");
    let html = "<table><tr><th>Rodada</th><th>Aliança Vermelha</th><th>Aliança Azul</th></tr>";

    dados.forEach(r => {
        const rodada = getValor(r, "Rodadas");
        const vermelha1 = getValor(r, "Vermelha 1");
        const vermelha2 = getValor(r, "Vermelha 2");
        const azul1 = getValor(r, "Azul 1");
        const azul2 = getValor(r, "Azul 2");

        const vermelha = [vermelha1, vermelha2].filter(Boolean).join(" + ");
        const azul = [azul1, azul2].filter(Boolean).join(" + ");

        html += `<tr><td>${rodada}</td><td>${vermelha}</td><td>${azul}</td></tr>`;
    });

    html += "</table>";
    div.innerHTML = html;
}

// Busca os dados do JSON e atualiza o site
fetch(endpointRanking)
    .then(res => res.json())
    .then(dados => {
        console.log("Dados recebidos:", dados); // ajuda a conferir no console
        mostrarRanking(dados);
        mostrarRodadas(dados);
    })
    .catch(err => console.error("Erro ao carregar dados:", err));
