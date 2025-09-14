
// Observação: feito com o auxílio do ChatGPT a partir de pseudocódigo produzido previamente.

const form = document.getElementById("calcForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // pega os valores
    const ultimoAbastecimento = parseFloat(document.getElementById("ultimoAbastecimento").value);
    const ultimaDistancia = parseFloat(document.getElementById("ultimaDistancia").value);
    const resultadoDiv = document.getElementById("resultado");
    
    // Limpa mensagens de erro anteriores
    document.getElementById("erroAbastecimento").textContent = "";
    document.getElementById("erroDistancia").textContent = "";
    document.getElementById("resultado").textContent = "";

    resultadoDiv.style.display = "none"; 

    let valido = true;

    // Validação do último abastecimento
    if (!Number.isFinite(ultimoAbastecimento) || ultimoAbastecimento <= 0) {
        document.getElementById("erroAbastecimento").textContent = "Digite um valor válido maior que zero.";
        valido = false;
    }

    // Validação da distância percorrida
    if (!Number.isFinite(ultimaDistancia) || ultimaDistancia <= 0) {
        document.getElementById("erroDistancia").textContent = "Digite um valor válido maior que zero.";
        valido = false;
    }

    if (!valido) return;

    // cálculo do consumo médio
    const consumoMedio = ultimaDistancia / ultimoAbastecimento;

    // Exibe resultado
    resultadoDiv.innerHTML = `O consumo médio do veículo é de <strong style="color: #ff7b00;">${consumoMedio.toFixed(2)} km/L</strong>.`;
    resultadoDiv.style.display = "block";

    // Opcional: enviar dados para service worker
    chrome.runtime.sendMessage({
        action: "saveCalculation",
        data: { ultimoAbastecimento, ultimaDistancia, consumoMedio }
    });
});



