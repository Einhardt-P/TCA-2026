import fs from "node:fs/promises";
import novoReadLine from "./readline.js";
import {posJogador} from "../index.js";

let MAPASJSON = await fs.readFile(
  "./arquivos/modelos/setoresMapa.json",
  "utf8",
);
let setores = JSON.parse(MAPASJSON);

export function criarMapa(mapa) {
  return mapa
    .replace(/\r\n?/g, "\n")
    .replace(/^\n|\n$/g, "")
    .split("\n");
}

export function carregarMapaJSON(linhas) {
  return linhas.map((linha) => [...linha.replace(/\r$/, "")]);

  posJogador.x = localAtual["Spawn"]["X"];
  posJogador.y = localAtual["Spawn"]["Y"];
}

async function adicionarJSON(mundo) {
  let rl = novoReadLine();
  let nome = await rl.question("Nome do Mapa:\n");
  let mapa = await rl.question("Mapa (Arquivo .txt):\n");
  rl.close();
  mapa = "../arquivos/modelos/txt/" + mapa;
  mapa = await fs.readFile(mapa, "utf8");
  
  let mapaTexto = criarMapa(mapa);
  setores[mundo][nome] = {};
  setores[mundo][nome]["mapa"] = mapaTexto;

  MAPASJSON = JSON.stringify(setores, null, 2);
  await fs.writeFile("../arquivos/modelos/setoresMapa.json", MAPASJSON, "utf8");
}
