import { wait } from "./funcoes/wait.js";
import process from "node:process";
import 
async function escreverTempo(dialogo, tempoEscrever, tempoTerminar) {
    let textoInteiro = "";
    for (let i = 0; i < dialogo.length; i++) {
        textoInteiro += dialogo[i];
        process.stdout.write(textoInteiro);
    if (dialogo[i] !== "," || dialogo[i] !== ".") {
       await wait(tempoEscrever);
    } else {
        await wait(tempoEscrever * 2)
    }
     if (textoInteiro.length !== dialogo.length) {
          console.clear();
        
        } else {
        await wait(tempoTerminar);
        console.clear();
        }
    };
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
const nomeEntrada = (`DIGITE SEU NOME:\n\n`);
await wait(1000)
console.clear();
await escreverTempo(`'${nomeEntrada}'`, 50, 1000);
await escreverTempo("Certo, certo.", 50, 2000);