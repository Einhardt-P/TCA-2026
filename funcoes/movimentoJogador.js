import { criarMapa } from "./criarMapa.js";
let beiraDoLago =
    `  __    __    __    __    __    __    __    __    #*******************************************
     (00)  (00)  (00)  (00)  (00)  (00)  (00)  (00)   #*******************************************
    (0000)(0000)(0000)(0000)(0000)(0000)(0000)(0000)  #*******************************************
      }{    }{    }{    }{    }{    }{    }{    }{    #******************************************* 
                                                      #******************************************* 
    ###################################################******************************************* 
                                                      |******************************************* 
                                                   () |******************************************* 
                                                      |******************************************* 
                                                      |******************************************* 
                                                      |******************************************* 
    ###################################################******************************************* 
      __    __    __    __    __    __    __    __    #******************************************* 
     (00)  (00)  (00)  (00)  (00)  (00)  (00)  (00)   #******************************************* 
    (0000)(0000)(0000)(0000)(0000)(0000)(0000)(0000)  #*******************************************
      }{    }{    }{    }{    }{    }{    }{    }{    #******************************************* 
                                                      #*******************************************`

const posJogador = {
    x: 1,
    y: 8
}
const sprites = [
    "▲",
    "▶",
    "▼",
    "◀"
];
let almaPersTrue = 0;
let visualAlma = sprites[0];
const modosDaAlma = ["Paciência", "Bravura", "Integridade", "Perseverança", "Bondade", "Justiça"]
let mapa = [
    ["= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["| ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "| "],
    ["= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= ", "= "]
];
mapa = criarMapa(beiraDoLago)
let mapaGerado = ""

let selecaoAlma = 0;
let modoAtual = "";

function renderizarMapa(Mapa) {

    process.stdout.write("\x1B[H")

    for (let y = 0; y < Mapa.length; y++) {
        let linha = "";

        for (let x = 0; x < Mapa[y].length; x++) {
        if (modoAtual !== "Perseverança") {
            if (x === posJogador.x && y === posJogador.y) {
                linha += visualAlma;
            } else {
                linha += Mapa[y][x];
                mapaGerado = linha
            }
        } else {
                    if ((Mapa[y][x] === " ") && (y % 2 === 0) && (Mapa[y][x] !== visualAlma)) {
                        Mapa[y][x] = "- ";
                        almaPersTrue = 1;
                    } else {
                        if (x === posJogador.x && y === posJogador.y) {
                            linha += visualAlma;
                        } else {
                            linha += mapa[y][x];
                            mapaGerado = linha;
                        }
                    }
            posJogador.x = 9;
            posJogador.y = 4;
            almaPersTrue = 1;
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
        mapa[novoY][novoX] === "#" || mapa[novoY][novoX] === "|" || mapa[novoY][novoX] === "="
    ) {
        return;
    }

    posJogador.x = novoX;
    posJogador.y = novoY;

    renderizarMapa(mapa);

}

process.stdout.write("\x1B[2J\x1B[H");
process.stdout.write("\x1B[?25l");

renderizarMapa(mapa);

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");


function modoAlma(modo) {
        let mult = 1;
        if (selecaoAlma < 0) {
            selecaoAlma = modosDaAlma.length;
        } else {
            if (selecaoAlma > modosDaAlma.length) {
                selecaoAlma = 0;
            }
        };

        if (modo === "Perseverança") {
            mult = 2;
        }

        modoAtual = modosDaAlma[selecaoAlma];
        lerPos(mult)
}

function lerPos(mult) {
    process.stdin.on("data", (tecla) => {
        switch (tecla.toLowerCase()) {
            case "w":
                mover(0, -1 * mult);
                visualAlma = sprites[0];
                break;

            case "s":
                mover(0, 1 *  mult);
                visualAlma = sprites[2];
                break;

            case "a":
                mover(-1, 0);
                visualAlma = sprites[3];
                break;

            case "d":
                mover(1, 0);
                visualAlma = sprites[1];
                break;

        }

    })
}

modoAlma(modoAtual);