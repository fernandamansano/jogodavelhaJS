// Função para coletar os nomes dos jogadores  
function coletarNomes() {
    document.getElementById("playerForms").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o recarregamento da página

        // Obtém os valores dos inputs
        var nome1 = document.getElementById("player1").value;
        var nome2 = document.getElementById("player2").value;

        if (nome1 !== "" && nome2 !== "") {
            // Salva os nomes no localStorage para serem acessados na página do jogo
            localStorage.setItem("player1", nome1);
            localStorage.setItem("player2", nome2);

            // Redireciona para a página do jogo
            window.location.href = "game.html";
        } else {
            alert("Por favor, insira os nomes dos dois jogadores.");
        }
    });
}

// Chamando a função para coletar nomes na página inicial
if (document.getElementById("playerForms")) {
    coletarNomes();
}

let selected;
let player = "X";

//Setando posições de vitória
let posicoes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

function iniciarJogo() {
    selected = [];

    // Recupera os nomes dos jogadores do localStorage
    let nomeJogador1 = localStorage.getItem("player1");
    let nomeJogador2 = localStorage.getItem("player2");

    const vezPlayer = document.getElementById("vezPlayer");
    vezPlayer.innerHTML = `JOGADOR DA VEZ: ${nomeJogador1.toUpperCase()} (X)`; 

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

// Chama iniciarJogo após o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", iniciarJogo);

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    const vezPlayer = document.getElementById("vezPlayer");
    
    setTimeout(() => {
        checarVencedor();
    }, 100);

    // Alterna o jogador
    if (player === "X") {
        player = "O";
        vezPlayer.innerHTML = `JOGADOR DA VEZ: ${localStorage.getItem("player2").toUpperCase()} (O)`;
    } else {
        player = "X";
        vezPlayer.innerHTML = `JOGADOR DA VEZ: ${localStorage.getItem("player1").toUpperCase()} (X)`;
    }
}

function checarVencedor() {
    let playerUltimoMovimento = player === "X" ? "O" : "X";

    let nomeJogador1 = localStorage.getItem("player1");
    let nomeJogador2 = localStorage.getItem("player2");

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerUltimoMovimento)
        .map((item) => item[1]);
    
    for (pos of posicoes) {
        if (pos.every((item) => items.includes(item))) {
            let vencedor = playerUltimoMovimento === "X" ? nomeJogador1 : nomeJogador2;
            document.getElementById("msg-resultado").innerText = vencedor.toUpperCase() + " GANHOU!!";
            document.getElementById("resultadoJogo").style.display = "block"; //exibe mensagem
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        document.getElementById("msg-resultado").innerText = "DEU EMPATE!";
        document.getElementById("resultadoJogo").style.display = "block"; 
        return;
    }
}

function fecharMsg() {
    document.getElementById("resultadoJogo").style.display = "none"; //fecha mensagem
}

function reiniciarJogo() {
    fecharMsg(); // Fecha o modal
    setTimeout(() => { 
        location.reload(); //Recarrega a página
    }, 1000);
}
