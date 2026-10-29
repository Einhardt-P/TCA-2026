import novoReadLine from "./funcoes/readline.js"
import { simOuNao } from "./funcoes/dialogoOpcao.js";
import { escolherOpcao } from "./funcoes/dialogoOpcao.js";
import { wait } from "./funcoes/wait.js";
import process from "node:process";
import { definirSom } from "./funcoes/tocarSom.js";

let musica = null;

async function escreverTempo(dialogo, tempoEscrever, tempoTerminar) {
    for (let i = 0; i < dialogo.length; i++) {
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
let nomeEntrada = await rl.question("DIGITE SEU NOME:\n\n");
console.clear();
rl.close();


    process.stdout.write("\x1B[2J\x1B[H");
    process.stdout.write("\x1B[?25l");

    
    for (let escolha = "Não"; escolha === "Não";) {
        console.clear();
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        escolha = await simOuNao("Você aceita esse nome?");
        
        if (escolha === "Não" || escolha === "Voltar") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
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
await escreverTempo("Certo, certo.", 50, 2000);
await escreverTempo("Agora, vamos dar um nome a seu receptáculo neste mundo.", 100, 1000);
let rl1 = novoReadLine();
let nomeVessel = await rl1.question("DIGITE O NOME DO SEU RECEPTÁCULO:\n\n");
console.clear()
rl1.close();

    process.stdout.write("\x1B[2J\x1B[H");
    process.stdout.write("\x1B[?25l");

    
    for (let escolha = "Não"; escolha === "Não";) {
        console.clear();
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        escolha = await simOuNao("Você aceita esse nome?");
        
        if (escolha === "Não" || escolha === "Voltar") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
            let rl = novoReadLine();
            nomeVessel = "";
            console.clear();
            await wait(1000);
            nomeVessel = await rl.question("DIGITE O NOME DO SEU RECEPTÁCULO:\n\n");
            rl.close();
        }
    }

        process.stdin.setRawMode(false);
        process.stdin.pause();
await wait(1000);
console.clear();
if (nomeEntrada.toLowerCase === nomeVessel.toLowerCase) {
    await escreverTempo(`'${nomeVessel}'.`, 50, 1500);
    await escreverTempo("Claro, claro. Obviamente vocês dois são o mesmo.", 100, 2000);
} else {
    await escreverTempo(`Nós o chamamos de '${nomeVessel}'.`, 100, 2000);
}
await escreverTempo(`${nomeEntrada}... Espere eu terminar o código.`, 100, 1000);