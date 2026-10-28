import novoReadLine from "./funcoes/readline.js"
import { simOuNao } from "./funcoes/dialogoOpcao.js";
import { escolherOpcao } from "./funcoes/dialogoOpcao.js";
import { wait } from "./funcoes/wait.js";
import process from "node:process";
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
await escreverTempo("Você está aí?", 200, 2000);
await escreverTempo("Nós estamos...", 200, 1000);
await escreverTempo("Conectados?", 200, 2000);
console.clear();
await wait(1000);
await escreverTempo("Você chegou aqui muito cedo.", 50, 1000);
await escreverTempo("Você não deveria estar aqui.", 50, 1000);
await escreverTempo("Mas, não vejo razão para não te deixar aqui.", 50, 2000);
await escreverTempo("Primeiro, seu nome:", 100, 2000);
let rl = novoReadLine();
let nomeEntrada = await rl.question("DIGITE SEU NOME:\n\n");
rl.close();

    process.stdout.write("\x1B[2J\x1B[H");
    process.stdout.write("\x1B[?25l");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    for (let escolha = "Não"; escolha === "Não";) {
        let rl = novoReadLine();
        console.clear();
        escolha = await simOuNao("Você aceita esse nome?");
        rl.close();
        if (escolha === "Não") {
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
await escreverTempo(`'${nomeEntrada}'`, 50, 1000);
await escreverTempo("Certo, certo.", 50, 2000);
await escreverTempo(`${nomeEntrada}... Espere eu terminar o código.`, 100, 1000);