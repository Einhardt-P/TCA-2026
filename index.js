import novoReadLine from "./funcoes/readline.js"
import { simOuNao } from "./funcoes/dialogoOpcao.js";
import { escolherOpcao } from "./funcoes/dialogoOpcao.js";
import { wait } from "./funcoes/wait.js";
import process from "node:process";
import { definirSom } from "./funcoes/tocarSom.js";
import fs from "node:fs/promises";

const NPCJSON = await fs.readFile("./arquivos/npcs.json", "utf-8");
const npcs = JSON.parse(NPCJSON);

let musica = null;

function ativarRawMode() {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
}
function fecharRawMode() {
    process.stdin.setRawMode(false);
    process.stdin.pause();
}

async function escreverTempo(dialogo, tempoEscrever, tempoTerminar) {
    for (let i = 0; i < dialogo.length; i++) {
        process.stdout.write(dialogo[i]);
        const devePausarMais = [",", ".", "!", "?", ";"].includes(dialogo[i]);
        await wait(devePausarMais ? tempoEscrever * 2 : tempoEscrever);
    }

    await wait(tempoTerminar);
    console.clear();
}

async function dialogoPersonagem(voz, dialogo, tempoEscrever, tempoTerminar) {
    for (let i = 0; i < dialogo.length; i++) {
        definirSom(voz, false, 1);
        process.stdout.write(dialogo[i]);
        const devePausarMais = [",", ".", "!", "?", ";"].includes(dialogo[i]);
        await wait(devePausarMais ? tempoEscrever * 2 : tempoEscrever);
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
    let nomeEntrada = await rl.question("DIGI'TE SEU NOME:\n\n");
    console.clear();
    rl.close();


        process.stdout.write("\x1B[2J\x1B[H");
        process.stdout.write("\x1B[?25l");

        
        for (let escolha = "Não"; escolha === "Não";) {
            console.clear();
            ativarRawMode();
            escolha = await simOuNao("Você acei'ta esse nome?");
        
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
let nomeVessel = await rl1.question("DIGITE O NOME DO SEU RECEPTÁCULO (Max.: 13 caracteres, sem espaços.):\n\n");
console.clear()
rl1.close();

    process.stdout.write("\x1B[2J\x1B[H");
    process.stdout.write("\x1B[?25l");

    
    for (let escolha = "Não"; escolha === "Não";) {
        console.clear();
        ativarRawMode();
        if (nomeEntrada.length < 13 && nomeEntrada.includes(" ") === false) {
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
            nomeVessel = await rl.question("DIGITE O NOME DO SEU RECEPTÁCULO:\n\n");
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
    await dialogoPersonagem(npcs.Historia.padrao.voz, "Não esqueça.", 250, 3000);
} else if (resposta1 === "Não") {
    console.clear();
    musica.pause();
    await escreverTempo("É uma pena.", 100, 1500);
    await dialogoPersonagem(npcs.Historia.padrao.voz, "Você não tem escolha.", 250, 1000);
    await wait(2000);
} else {
    await escreverTempo("'Esqueci de algo'... Você fala sobre seu corpo. Estou certo?", 100, 2500);
    musica.pause();
    await escreverTempo("Interesssante. Muito, muito interessante.", 100, 1500);
    await escreverTempo("Vou contar-lhe as regras aqui...", 100, 1000);
    await escreverTempo("Você não escolhe como quer ser.", 200, 2500);
    await wait(1000);
}
definirSom("./sound/snd_impact.wav", false, 1);