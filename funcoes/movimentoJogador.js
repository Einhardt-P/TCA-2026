const sprites = [
    "▲",
    "▶",
    "▼",
    "◀"
];
let almaPersTrue = 0;
let visualAlma = sprites[0];
const modosDaAlma = ["Padrão", "Paciência", "Bravura", "Integridade", "Perseverança", "Bondade", "Justiça"]
const mapa = [
    ["=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "="],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "="]
];
let mapaGerado = ""
const posJogador = {
    x: 1,
    y: 1
}

let selecaoAlma = 0;
let modoAtual = "";

function renderizarMapa() {

    process.stdout.write("\x1B[H")

    for (let y = 0; y < mapa.length; y++) {
        let linha = "";

        for (let x = 0; x < mapa[y].length; x++) {
            if (x === posJogador.x && y === posJogador.y && modoAtual !== "Perseverança") {
                linha += visualAlma;
            } else {
                linha += mapa[y][x];
                mapaGerado = linha
            }
        }
        process.stdout.write(linha + "\n");

    }


    process.stdout.write("\nWASD para andar\n");
}

function mover(px, py) {
    const novoX = posJogador.x + px;
    const novoY = posJogador.y + py;

    if (
        novoY < 0 ||
        novoY >= mapa.length ||
        novoX < 0 ||
        novoX >= mapa[novoY].length ||
        mapa[novoY][novoX] === "=" || mapa[novoY][novoX] === "|"
    ) {
        return;
    }

    posJogador.x = novoX;
    posJogador.y = novoY;

    renderizarMapa();

}

process.stdout.write("\x1B[2J\x1B[H");
process.stdout.write("\x1B[?25l");

renderizarMapa();

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

function trocarModo() {
    process.stdin.on("data", (tecla) => {
    switch (tecla) {
    case "\u001B[C":
    modoAlma(-1);
    break;

    case "\u001B[D":
    modoAlma(1);
    break;
    }
   });
}

function modoAlma(soma) {
            selecaoAlma += soma;
            if (modoAtual === "Perseverança") {
            for (let y = 0; y < mapa.length; y++) {
                for (let x = 0; x < mapa[y].length; x++) {
                    if ((mapa[y][x] === " ") && (y % 2 === 0) && (mapa[y][x] !== visualAlma)) {
                        mapa[y][x] = "-";
                        almaPersTrue = 1;
                    }
                }
            }
            posJogador.x = 9;
            posJogador.y = 4;
        } else {
            mapaGerado = mapa;
        }

        if (selecaoAlma < 0) {
            selecaoAlma = modosDaAlma.length;
        } else {
            if (selecaoAlma > modosDaAlma.length) {
                selecaoAlma = 0;
            }
        };

        modoAtual = modosDaAlma[selecaoAlma];

       mapaGerado += `\nModo da alma: ${modoAtual}\nAPERTE AS SETAS LATERAIS PARA MUDAR O MODO`;
}

function lerPos() {
    process.stdin.on("data", (tecla) => {
        switch (tecla.toLowerCase()) {
            case "w":
                mover(0, -(1 + almaPersTrue));
                break;

            case "s":
                mover(0, (1 + almaPersTrue));
                break;

            case "a":
                mover(-1, 0);
                break;

            case "d":
                mover(1, 0);
                break;

        }

    })

}

lerPos();