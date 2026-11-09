import novoReadLine from "./funcoes/readline.js"
import { simOuNao } from "./funcoes/dialogoOpcao.js";
import { escolherOpcao } from "./funcoes/dialogoOpcao.js";
import { wait } from "./funcoes/wait.js";
import process from "node:process";
import { definirSom } from "./funcoes/tocarSom.js";
import fs from "node:fs/promises";
import { carregarMapaJSON } from "./funcoes/criarMapa.js";

function ativarRawMode() {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
}
function fecharRawMode() {
    process.stdin.setRawMode(false);
    process.stdin.pause();
}

const MAPASJSON = await fs.readFile("./arquivos/modelos/setoresMapa.json", "utf8");
const setores = JSON.parse(MAPASJSON);

function processarMapaJSON(mundo, mapa) {
  mapa = setores[mundo][mapa]["mapa"];
  return mapa.map((linha) => [...linha]);
}

const posJogador = {
    x: 46,
    y: 8
}
const sprites = [
    "▲",
    "▶",
    "▼",
    "◀"
];
let visualAlma = sprites[0];
const modosDaAlma = ["Paciência", "Bravura", "Integridade", "Perseverança", "Bondade", "Justiça"]
let areaCombate = [
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
let mapa = areaCombate
let mapaGerado = ""

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
        mapa[novoY][novoX] === "#" ||
        mapa[novoY][novoX] === "|" ||
        mapa[novoY][novoX] === "=" ||
        mapa[novoY][novoX] === "@"
    ) {
        return;
    }

    posJogador.x = novoX;
    posJogador.y = novoY;

}


function iniciarMovimento(modo) {
        let mult = 1;
        if (modo === "Perseverança") {
            mult = 2;
        }
        lerPos(mult)
}

function lerPos(mult) {
    process.stdin.on("data", (tecla) => {
        switch (tecla.toLowerCase()) {
            case "w":
                visualAlma = sprites[0];
                mover(0, -1 * mult);
                break;
                
            case "d":
                visualAlma = sprites[1];
                mover(1, 0);
                break;
                
            case "s":
                visualAlma = sprites[2];
                mover(0, 1 *  mult);
                break;

            case "a":
                visualAlma = sprites[3];
                mover(-1, 0);
                break;

            case "z":
                    if (visualAlma === sprites[0] && mapa[y - 1][x] === coordInterativa.some()) {
                        mapa[y - 1][x]
                    } 

        }

    })
    
}



const NPCJSON = await fs.readFile("./arquivos/npcs.json", "utf-8");
const npcs = JSON.parse(NPCJSON);

let musica = null;

async function escreverTempo(dialogo, tempoEscrever, tempoTerminar) {
    for (let i = 0; i < dialogo.length; i++) {
        process.stdout.write(dialogo[i]);
        const devePausarMais = [",", ".", "!", "?", ";"].includes(dialogo[i]);
        await wait(devePausarMais ? tempoEscrever / 2 : tempoEscrever);
    }

    await wait(tempoTerminar);
    console.clear();
}

async function escreverVoz(voz, dialogo, tempoEscrever, tempoTerminar) {
    for (let i = 0; i < dialogo.length; i++) {
        process.stdout.write(dialogo[i]);
        definirSom(voz, false, 1);
        const devePausarMais = [",", ".", "!", "?", ";"].includes(dialogo[i]);
        await wait(devePausarMais ? tempoEscrever / 2 : tempoEscrever);
    }

    await wait(tempoTerminar);
    console.clear();
}
async function iniciarJogo() {
    console.log("Iniciando jogo...");
    await wait(1000);
    console.clear();

}

await iniciarJogo();
musica = definirSom("./sound/AUDIO_DRONE.wav", true, 1);
await escreverTempo("Você está aí?", 200, 2000);
await escreverTempo("Nós estamos...", 200, 1000);
await escreverTempo("Conectados?", 200, 2000);
console.clear();
await wait(1000);
await escreverTempo("Você chegou aqui muito cedo.", 50, 1000);
await escreverTempo("Você não deveria estar aqui.", 50, 1000);
await escreverTempo("Mas, não vejo razão para não te deixar aqui.", 50, 2000);
await escreverTempo("Sem mais delongas, que comecemos.", 100, 2000);
await escreverTempo("Primeiro, seu nome.", 100, 2000);
let rl = novoReadLine();
export let nomeEntrada = await rl.question("DIGITE SEU NOME:\n\n");
console.clear();
rl.close();


        process.stdout.write("\x1B[2J\x1B[H");
        process.stdout.write("\x1B[?25l");

        
        for (let escolha = "Não"; escolha === "Não";) {
            console.clear();
            ativarRawMode();
            escolha = await simOuNao("Você aceita esse nome?");
        
        if (escolha === "Não" || escolha === "Voltar") {
            fecharRawMode();
            let rl = novoReadLine();
            nomeEntrada = "";
            console.clear();
            await wait(1000);
            nomeEntrada = await rl.question("DIGITE SEU NOME:\n\n");
            rl.close();
        }
    }
    process.stdin.setRawMode(false);
    process.stdin.pause();
    

await wait(1000);
console.clear();
await escreverTempo(`'${nomeEntrada}'`, 50, 1500);
await escreverTempo("Agora, vamos dar um nome a seu receptáculo neste mundo.", 50, 1000);
let rl1 = novoReadLine();
export let nomeVessel = await rl1.question("DIGITE O NOME DO SEU RECEPTÁCULO (Max.: 13 caracteres, sem espaços.):\n\n");
console.clear()
rl1.close();

    process.stdout.write("\x1B[2J\x1B[H");
    process.stdout.write("\x1B[?25l");

    
    for (let escolha = "Não"; escolha === "Não";) {
        console.clear();
        ativarRawMode();
        if (nomeVessel.length < 13 && nomeVessel.includes(" ") === false) {
        escolha = await simOuNao("Você aceita esse nome?");
        } else {
            escolha = "Não";
        }
        if (escolha === "Não" || escolha === "Voltar") {
            fecharRawMode();
            let rl = novoReadLine();
            nomeVessel = "";
            console.clear();
            await wait(1000);
            nomeVessel = await rl.question("DIGITE O NOME DO SEU RECEPTÁCULO (Max.: 13 caracteres, sem espaços.):\n\n");
            rl.close();
        }
    }

    fecharRawMode();
await wait(1000);
console.clear();
if (nomeEntrada.toLowerCase() === nomeVessel.toLowerCase()) {
    await escreverTempo(`'${nomeVessel}'.`, 50, 1500);
    await escreverTempo("Claro, claro. Obviamente vocês dois são o mesmo.", 100, 2000);
} else {
    await escreverTempo(`Nós o chamamos de '${nomeVessel}'.`, 100, 2000);
}
await escreverTempo(`${nomeEntrada}... Não é certo que você saiba o que aconteceu.`, 100, 1000);
await escreverTempo("Esta linha do tempo não deveria ser acessível.", 50, 1500);
await escreverTempo("Você está disposto a passar por sofrimento e angústia?", 50, 1500);
ativarRawMode();
let resposta1 = await escolherOpcao("...", ["Sim", "Não", "Você esqueceu de algo."]);
fecharRawMode();
if (resposta1 === "Sim") {
    console.clear();
    await escreverTempo("Ótimo, você está preparado.", 50, 1500);
    musica.pause();
    await escreverVoz(npcs.Historia.padrao.voz, "Não esqueça.", 250, 3000);
} else if (resposta1 === "Não") {
    console.clear();
    musica.pause();
    await escreverTempo("É uma pena.", 100, 1500);
    await escreverVoz(npcs.Historia.padrao.voz, "Você não tem escolha.", 250, 1000);
    await wait(2000);
} else {
    console.clear();
    await escreverTempo("'Esqueci de algo'... Você fala sobre seu corpo. Estou certo?", 100, 2500);
    musica.pause();
    await escreverTempo("Interesssante. Muito, muito interessante.", 100, 1500);
    await escreverTempo("Vou contar-lhe as regras aqui...", 100, 1000);
    await escreverTempo("Você não escolhe como quer ser.", 200, 2500);
    await wait(1000);
}
fecharRawMode();
definirSom("./sound/snd_impact.wav", false, 1);
await wait(2000);

let localAtual = setores["LightWorld"]["Lago"];
musica = definirSom(localAtual["musica"], true, 1)
mapa = carregarMapaJSON(localAtual["mapa"]);
        process.stdout.write("\x1B[2J\x1B[H");
        process.stdout.write("\x1B[?25l");
        ativarRawMode();

    console.clear();
setInterval(() => {
    renderizarMapa(mapa);
}, (1000/30)); 
iniciarMovimento(modoAtual);