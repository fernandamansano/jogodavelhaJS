//Coletando nome dos jogadores

document.getElementById("Players").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    var nome1 = document.getElementById("player1").value;
    var nome2 = document.getElementById("player2").value;

    if (nome1 !== "" && nome2 !== "") {
        // Salva os nomes no localStorage para acessar na próxima página
        localStorage.setItem("player1", nome1);
        localStorage.setItem("player2", nome2);

        // Redireciona para a página do jogo
        window.location.href = "game.html";
    } else {
        alert("Por favor, insira os nomes dos dois jogadores.");
    }
});

// Recupera os nomes dos jogadores do localStorage
let nomeJogador1 = localStorage.getItem("player1");
let nomeJogador2 = localStorage.getItem("player2");


const vezPlayer = document.querySelector(".vezPlayer");

let selected;

//Setando posições de vitória
let positions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9],
];

//https://www.youtube.com/watch?v=0EiX9c4vzRs&ab_channel=FelipeRocha%E2%80%A2dicasparadevs
//https://www.youtube.com/watch?v=ohl1tK-azxw