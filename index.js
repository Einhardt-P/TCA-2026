import { wait } from "./funcoes/wait.js";
import express from "express";
import rl from "./funcoes/readline.js";

const app = express();

async function iniciarJogo() {
    console.log("Iniciando jogo...");
    await wait(1000);
    console.clear();
    console.log("Começo");
}

await iniciarJogo()