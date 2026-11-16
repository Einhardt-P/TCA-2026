import novoReadLine from "./funcoes/readline.js";
import { simOuNao } from "./funcoes/dialogoOpcao.js";
import { escolherOpcao } from "./funcoes/dialogoOpcao.js";
import { wait } from "./funcoes/wait.js";
import process from "node:process";
import { definirSom } from "./funcoes/tocarSom.js";
import fs from "node:fs/promises";
import { carregarMapaJSON } from "./funcoes/criarMapa.js";

const itensCuraJSON = await fs.readFile(
  "./arquivos/modelos/itensCura.json",
  "utf8",
);
const itensCura = JSON.parse(itensCuraJSON);
const modelosArmasJSON = await fs.readFile(
  "./arquivos/modelos/modelosArmas.json",
  "utf8",
);
const modelosArmas = JSON.parse(modelosArmasJSON);
class clonadorCuras {
  constructor(modelo) {
    this.nome = modelo["nome"];
    this.fatorCura = modelo["fatorCura"];
    this.precoVenda = modelo["precoVenda"];
    this.precoCompra = modelo["precoCompra"];
    this.descricao = modelo["descricao"];
  }

  sobreItem() {
    dialogoConfirmar(npcs.Historia.padrao.voz, this.dialogo, 100);
  }

  usarItem() {
    jogador.HPAtual =
      jogador.HPAtual + this.fatorCura <= jogador.HPMax
        ? jogador.HPAtual + this.fatorCura
        : jogador.HPMax;
  }

  jogarFora(index) {
    jogador.inventarioDW.splice(index, 1);
  }
}
class itemArmaDW {
  constructor(modelo) {
    this.nome = modelo.DarkWorld["nome"];
    this.ID = "DW" + modelo.DarkWorld["ID"];
    this.desc = modelo.DarkWorld["descricao"];
    this.ataque = modelo.DarkWorld["ataque"];
    this.bonusMagia = modelo.DarkWorld["bonusMagia"];
  }
  sobreItem() {
    console.log(this.descricao);
  }
}

class clonadorArmas {
  constructor(modelo) {
    this.nome = modelo["nome"];
    this.ID = "LW" + modelo["ID"];
    this.desc = modelo["descricao"];
    this.ataque = modelo["ataque"];
    this.DarkWorld = new itemArmaDW(modelo);
  }
  sobreItem() {
    console.log(this.descricao);
  }
}

let jogador = {
  nome: "",
  nomeVessel: "",
  HPMax: 100,
  HPAtual: 100,
  raca: "",
  DarkWorld: false,
  LOVE: 0,
  HATE: 0,
  NEUTRAL: 0,
  nullMagia: 1,
  dinheiro: 100,
  localAtual: null,

  armaLW: null,
  armaDW: null,

  defesaLW: 0,
  ataqueLW: 0,
  defesaDW: 1,
  ataqueDW: 0,
  bonusMagia: 0,
  magia: 0,

  armadurasDW: [],
  inventarioLW: [],
  inventarioDW: [],

  inventarioSave: [],
  inventarioChave: [],

  combate: {
    TP: 0,
    inimigosDerrotados: [],
  },
};

async function atualizarAtributos() {
  jogador.DarkWorld = Object.values(setores["DarkWorld"]).includes(localAtual);
  jogador.localAtual = localAtual;
  jogador.NEUTRAL = jogador.LOVE + jogador.HATE;

  let atqArmaLW = 0;
  if (jogador.armaLW) {
    atqArmaLW = jogador.armaLW.ataque;
  }

  let atqArmaDW = 0;
  if (jogador.armaDW) {
    atqArmaDW = jogador.armaDW.ataque;
  }

  if (jogador.armaDW) {
    jogador.bonusMagia = jogador.armaDW.bonusMagia;
  } else {
    jogador.bonusMagia = 0;
  }

  let multDefesaDW = 0;
  for (let i = 0; i < jogador.armadurasDW.length; i++) {
    multDefesaDW += jogador.armadurasDW[i].defesa;
  }

  jogador.defesaLW = 1 * jogador.NEUTRAL;
  jogador.ataqueLW = 1 * jogador.NEUTRAL + atqArmaLW;
  jogador.defesaDW = 1 * multDefesaDW;
  jogador.ataqueDW = 1 * jogador.NEUTRAL + atqArmaDW;
}

async function guardarInventario(item) {
  const inventario = jogador.DarkWorld
    ? jogador.inventarioDW
    : jogador.inventarioLW;

  if (inventario.length < 20) {
    inventario.push(item);
  } else {
    jogador.inventarioSave.push(item);
  }
}

async function equiparArma(arma) {
  jogador.armaLW = arma;
  jogador.armaDW = arma.DarkWorld;
}

async function equiparArmadura(armadura, slot) {
  jogador.armadurasDW[slot] = armadura;
}

async function abrirInventario() {
  await atualizarAtributos();
  telaAtual = "inventario";
  let escolha = "";
  let mensagemSalvar = "";
  for (let aberto = true; aberto; ) {
    if (jogador.DarkWorld) {
      escolha = await escolherOpcao(
        `${mensagemSalvar}\nD$ ${jogador.dinheiro}\n\nINVENTÁRIO:\n`,
        ["ITEM", "EQUIP", "CONFIG", "SALVAR", "SAIR"],
      );
      console.clear();

      if (escolha === "SALVAR") {
        await salvarDadosJogador();
        mensagemSalvar = "Progresso salvo.";
      }

      if (escolha === "ITEM" && jogador.inventarioDW.length > 0) {
        for (let abertoItem = true; abertoItem; ) {
          escolha = await escolherOpcao("ITENS:\n\n", [
            "USAR",
            "FORA",
            "CHAVE",
            "SAIR",
          ]);
          console.clear();

          if (escolha === "USAR") {
            const listaItens = [
              "SAIR",
              ...jogador.inventarioDW.map((item) => item.nome),
            ];
            escolha = await escolherOpcao("ITENS:\n\n", listaItens);
            console.clear();

            if (escolha !== "SAIR") {
              let itemEscolhido = jogador.inventarioDW.find(
                (item) => item.nome === escolha,
              );
              itemEscolhido.usarItem();

              await atualizarAtributos();
            } else {
              abertoItem = false;
            }
          }
        }
      }

      if (escolha === "SAIR") {
        aberto = false;
        telaAtual = "mapa";
      }
    } else {
      let escolha = await escolherOpcao(
        `${mensagemSalvar}\n${jogador.nomeVessel}\n`,
        ["ITEM", "STAT", "CELL", "SALVAR", "SAIR"],
      );

      if (escolha === "SALVAR") {
        await salvarDadosJogador();
        mensagemSalvar = "Progresso salvo.";
      }

      if (escolha === "SAIR") {
        aberto = false;
        redesenhar = true;
        telaAtual = "mapa";
      }
    }
  }
}

async function abrirLoja() {
  const produtos = Object.values(itensCura);
  const armas = Object.values(modelosArmas).filter(
    (modelo) => typeof modelo === "object",
  );
  let mensagem = "";

  telaAtual = "loja";
  redesenhar = false;

  let secao = "";
  while (secao !== "SAIR") {
    secao = await escolherOpcao(`LOJA | D$ ${jogador.dinheiro}`, [
      "ITENS",
      "ARMAS",
      "SAIR",
    ]);

    if (secao === "ITENS") {
      const opcoes = [
        ...produtos.map(
          (produto) => `${produto.nome} - D$ ${produto.precoCompra}`,
        ),
        "VOLTAR",
      ];
      let escolha = "";

      while (escolha !== "VOLTAR") {
        escolha = await escolherOpcao(
          `ITENS | D$ ${jogador.dinheiro}\n${mensagem}`,
          opcoes,
        );
        const produto = produtos.find(
          (item) => `${item.nome} - D$ ${item.precoCompra}` === escolha,
        );

        if (produto && jogador.dinheiro < produto.precoCompra) {
          mensagem = "Dinheiro insuficiente.";
        } else if (produto) {
          jogador.dinheiro -= produto.precoCompra;
          await guardarInventario(new clonadorCuras(produto));
          await salvarDadosJogador();
          mensagem = `${produto.nome} comprado.`;
        }
      }
    } else if (secao === "ARMAS") {
      const opcoes = armas.map((arma) => {
        const variante = jogador.DarkWorld ? arma.DarkWorld : arma;
        return `${variante.nome} - D$ ${variante.ataque}`;
      });
      opcoes.push("VOLTAR");
      let escolha = "";

      while (escolha !== "VOLTAR") {
        escolha = await escolherOpcao(
          `ARMAS | D$ ${jogador.dinheiro}\n${mensagem}`,
          opcoes,
        );
        const arma = armas.find((modelo) => {
          const variante = jogador.DarkWorld ? modelo.DarkWorld : modelo;
          return `${variante.nome} - D$ ${variante.ataque}` === escolha;
        });

        if (arma) {
          const variante = jogador.DarkWorld ? arma.DarkWorld : arma;
          if (jogador.dinheiro < variante.ataque) {
            mensagem = "Dinheiro insuficiente.";
          } else {
            jogador.dinheiro -= variante.ataque;
            await equiparArma(new clonadorArmas(arma));
            await atualizarAtributos();
            await salvarDadosJogador();
            mensagem = `${variante.nome} equipado.`;
          }
        }
      }
    }
  }

  telaAtual = "mapa";
  redesenhar = true;
}

let jogadorJSON = JSON.stringify(jogador);

async function lerDadosJogador() {
  jogadorJSON = await fs.readFile("./arquivos/saves/jogador.json", "utf8");
  jogador = { ...jogador, ...JSON.parse(jogadorJSON) };
  localAtual = jogador.localAtual ?? setores["LightWorld"]["Lago"];
}
async function salvarDadosJogador() {
  jogadorJSON = JSON.stringify(jogador);
  await fs.writeFile("./arquivos/saves/jogador.json", jogadorJSON, "utf8");
}

function ignorarTeclado() {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  const descartar = () => {};
  process.stdin.on("data", descartar);

  return () => {
    process.stdin.off("data", descartar);

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
  };
}

function ativarRawMode() {
  if (!process.stdin.isTTY) return;

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
}

function fecharRawMode() {
  if (!process.stdin.isTTY) return;

  process.stdin.setRawMode(false);
  process.stdin.pause();
}

const MAPASJSON = await fs.readFile(
  "./arquivos/modelos/setoresMapa.json",
  "utf8",
);
const setores = JSON.parse(MAPASJSON);
let localAtual = null;

function processarMapaJSON(mundo, mapa) {
  mapa = setores[mundo][mapa]["mapa"];
  return mapa.map((linha) => [...linha]);
}

export const posJogador = {
  x: 46,
  y: 8,

  posicaoArena: {
    x: 9,
    y: 9,
  },
};
const sprites = ["▲", "▶", "▼", "◀"];
let visualAlma = sprites[0];
const modosDaAlma = [
  "Paciência",
  "Bravura",
  "Integridade",
  "Perseverança",
  "Bondade",
  "Justiça",
];
let areaCombate = [
  [
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "| ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "| ",
  ],
  [
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
    "= ",
  ],
];
let mapa = areaCombate;
let textoInteracao = "";
let dialogoAtivo = false;
let dialogoConcluido = false;
let velocidadeNormalInteracao = 0;
let velocidadeInteracao = 0;
let pularInteracao = false;
let ele = false;
let telaAtual = "";
let redesenhar = true;

let modoAtual = "";
let mapaGerado = "";

function renderizarMapa(Mapa) {
  ele = localAtual === setores["DarkWorld"]["Sala do Ovo"];
  process.stdout.write("\x1B[H\x1B[J");

  for (let y = 0; y < Mapa.length; y++) {
    let linha = "";

    for (let x = 0; x < Mapa[y].length; x++) {
      if (x === posJogador.x && y === posJogador.y) {
        linha += visualAlma;
      } else {
        linha += Mapa[y][x];
        mapaGerado = linha;
      }
    }
    process.stdout.write(linha);
  }

  process.stdout.write("\nWASD para andar\n\n");
  process.stdout.write(textoInteracao);
  if (dialogoConcluido) {
    process.stdout.write("\n\nPressione Z para continuar.");
  } else if (dialogoAtivo) {
    process.stdout.write("\n\nZ: normal | X: completar | C: pular");
  }
}

async function mover(px, py) {
  const novoX = posJogador.x + px;
  const novoY = posJogador.y + py;

  const entradaLoja = localAtual["alternar"]?.["entrarLoja"];
  if (
    entradaLoja &&
    novoY === entradaLoja["y"] &&
    entradaLoja["x"].includes(novoX)
  ) {
    await abrirLoja();
    return;
  }

  if (
    novoY < 0 ||
    novoY >= mapa.length ||
    novoX < 0 ||
    novoX >= mapa[novoY].length ||
    mapa[novoY][novoX] === "#" ||
    mapa[novoY][novoX] === "|" ||
    (mapa[novoY][novoX] === "@" && ele === false)
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
  lerPos(mult);
}

async function lerPos(mult) {
  process.stdin.on("data", async (tecla) => {
    if (dialogoAtivo) {
      if (dialogoConcluido) {
        if (tecla.toLowerCase().includes("z")) {
          textoInteracao = "";
          dialogoAtivo = false;
          dialogoConcluido = false;
          redesenhar = true;
        }
      } else {
        if (tecla.toLowerCase().includes("z")) {
          velocidadeInteracao = velocidadeNormalInteracao;
        }
        if (tecla.toLowerCase().includes("x")) {
          velocidadeInteracao = 0;
        }
        if (tecla.toLowerCase().includes("c")) {
          pularInteracao = true;
        }
      }
      return;
    }

    if (telaAtual !== "mapa") {
      return;
    }

    switch (tecla.toLowerCase()) {
      case "w":
        visualAlma = sprites[0];
        await wait(1000 / 30);
        await mover(0, -1 * mult);
        redesenhar = true;
        break;

      case "d":
        visualAlma = sprites[1];
        await wait(1000 / 30);
        await mover(1, 0);
        redesenhar = true;
        break;

      case "s":
        visualAlma = sprites[2];
        await wait(1000 / 30);
        await mover(0, 1 * mult);
        redesenhar = true;
        break;

      case "a":
        visualAlma = sprites[3];
        await wait(1000 / 30);
        await mover(-1, 0);
        redesenhar = true;
        break;

      case "z":
        if (
          visualAlma === sprites[0] &&
          Object.keys(localAtual["coordInterativas"]).some(
            (coordenada) =>
              coordenada === `X${posJogador.x}-Y${posJogador.y - 1}`,
          )
        ) {
          dialogoConfirmar(
            "./sound/snd_text.wav",
            localAtual["coordInterativas"][
              `X${posJogador.x}-Y${posJogador.y - 1}`
            ],
            100,
          );
        }
        if (
          visualAlma === sprites[1] &&
          Object.keys(localAtual["coordInterativas"]).some(
            (coordenada) =>
              coordenada === `X${posJogador.x + 1}-Y${posJogador.y}`,
          )
        ) {
          dialogoConfirmar(
            "./sound/snd_text.wav",
            localAtual["coordInterativas"][
              `X${posJogador.x + 1}-Y${posJogador.y}`
            ],
            100,
          );
        }
        if (
          visualAlma === sprites[2] &&
          Object.keys(localAtual["coordInterativas"]).some(
            (coordenada) =>
              coordenada === `X${posJogador.x}-Y${posJogador.y + 1}`,
          )
        ) {
          dialogoConfirmar(
            "./sound/snd_text.wav",
            localAtual["coordInterativas"][
              `X${posJogador.x}-Y${posJogador.y + 1}`
            ],
            100,
          );
        }
        if (
          visualAlma === sprites[3] &&
          Object.keys(localAtual["coordInterativas"]).some(
            (coordenada) =>
              coordenada === `X${posJogador.x - 1}-Y${posJogador.y}`,
          )
        ) {
          dialogoConfirmar(
            "./sound/snd_text.wav",
            localAtual["coordInterativas"][
              `X${posJogador.x - 1}-Y${posJogador.y}`
            ],
            100,
          );
        }
        break;

      case "c":
        telaAtual = "inventario";
        abrirInventario();
        break;
    }
  });
}
function moverCombate(px, py) {
  const novoX = posJogador.posicaoArena.x + px;
  const novoY = posJogador.posicaoArena.y + py;

  if (
    novoY < 0 ||
    novoY >= mapa.length ||
    novoX < 0 ||
    novoX >= mapa[novoY].length ||
    mapa[novoY][novoX] === "|"
  ) {
    return;
  }

  posJogador.posicaoArena.x = novoX;
  posJogador.posicaoArena.y = novoY;
}
function lerPosArena() {
  while (turnoOponente && jogador.HPAtual > 0) {
    process.stdin.on("data", (tecla) => {
      switch (tecla.toLowerCase) {
        case w:
          moverCombate(0, -1);
          break;

        case a:
          moverCombate(-1, 0);
          break;

        case s:
          moverCombate(0, 1);
          break;

        case d:
          moverCombate(1, 0);
          break;
      }
    });
  }
  turnoOponente = false;
}

function renderizarArena() {}
async function comecarCombate(npc) {
  telaAtual = "combate";
  redesenhar = true;
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

async function dialogoConfirmarComum(voz, dialogo, tempoEscrever) {
  dialogoAtivo = true;
  dialogoConcluido = false;
  textoInteracao = "";
  velocidadeNormalInteracao = tempoEscrever;
  velocidadeInteracao = tempoEscrever;
  pularInteracao = false;

  for (let i = 0; i < dialogo.length; i++) {
    textoInteracao += dialogo[i];
    redesenhar = true;
    definirSom(voz, false, 1);
    const devePausarMais = [",", ".", "!", "?", ";"].includes(dialogo[i]);
    if (!pularInteracao) {
      if (devePausarMais) {
        await wait(velocidadeInteracao / 2);
      } else {
        await wait(velocidadeInteracao);
      }
    } else {
      textoInteracao += dialogo.substring(i);
      redesenhar = true;
      break;
    }
  }
}

async function dialogoConfirmarArray(voz, dialogo, tempoEscrever) {
  for (let i = 0; i < dialogo.length; i++) {
    await dialogoConfirmarComum(voz, dialogo[i], tempoEscrever);
    dialogoConcluido = true;
    redesenhar = true;

    if (i < dialogo.length - 1) {
      while (dialogoConcluido) {
        await wait(50);
      }
    }
  }
}

async function dialogoConfirmar(voz, dialogo, tempoEscrever) {
  if (Array.isArray(dialogo)) {
    await dialogoConfirmarArray(voz, dialogo, tempoEscrever);
  } else {
    await dialogoConfirmarComum(voz, dialogo, tempoEscrever);
    dialogoConcluido = true;
    redesenhar = true;
  }
}

async function iniciarJogo() {
  console.log("Iniciando jogo...");
  await wait(1000);
  console.clear();
}

let nomeEntrada = "";
let nomeVessel = "";
let progressoCarregado = false;

const arquivosSalvos = await fs.readdir("./arquivos/saves");
if (arquivosSalvos.includes("jogador.json")) {
  ativarRawMode();
  const escolhaSave = await escolherOpcao(
    "Há um progresso salvo. Deseja carregá-lo?",
    ["CARREGAR PROGRESSO", "NOVO JOGO"],
  );
  fecharRawMode();

  if (escolhaSave === "CARREGAR PROGRESSO") {
    await lerDadosJogador();
    nomeEntrada = jogador.nomeEntrada || "";
    nomeVessel = jogador.nomeVessel || "";
    progressoCarregado = true;
  } else {
    localAtual = null;
  }
}
if (!progressoCarregado) {
  await iniciarJogo();
  localAtual = setores["LightWorld"]["Lago"];
  jogador.localAtual = localAtual;
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
  nomeEntrada = await rl.question("DIGITE SEU NOME:\n\n");
  console.clear();
  rl.close();

  process.stdout.write("\x1B[2J\x1B[H");
  process.stdout.write("\x1B[?25l");

  for (let escolha = "Não"; escolha === "Não"; ) {
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
  await escreverTempo(
    "Agora, vamos dar um nome a seu receptáculo neste mundo.",
    50,
    1000,
  );
  let rl1 = novoReadLine();
  nomeVessel = await rl1.question(
    "DIGITE O NOME DO SEU RECEPTÁCULO (Max.: 13 caracteres, sem espaços.):\n\n",
  );
  console.clear();
  rl1.close();

  process.stdout.write("\x1B[2J\x1B[H");
  process.stdout.write("\x1B[?25l");

  for (let escolha = "Não"; escolha === "Não"; ) {
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
      nomeVessel = await rl.question(
        "DIGITE O NOME DO SEU RECEPTÁCULO (Max.: 13 caracteres, sem espaços.):\n\n",
      );
      rl.close();
    }
  }

  fecharRawMode();
  await wait(1000);
  console.clear();
  if (nomeEntrada.toLowerCase() === nomeVessel.toLowerCase()) {
    await escreverTempo(`'${nomeVessel}'.`, 50, 1500);
    await escreverTempo(
      "Claro, claro. Obviamente vocês dois são o mesmo.",
      100,
      2000,
    );
  } else {
    await escreverTempo(`Nós o chamamos de '${nomeVessel}'.`, 100, 2000);
  }
  // await escreverTempo(
  //   `${nomeEntrada}... Não é certo que você saiba o que aconteceu.`,
  //   100,
  //   1000,
  // );
  // await escreverTempo(
  //   "Esta linha do tempo não deveria ser acessível.",
  //   50,
  //   1500,
  // );
  await escreverTempo(
    "Você está disposto a passar por sofrimento e angústia?",
    50,
    1500,
  );
  ativarRawMode();
  let resposta1 = await escolherOpcao("...\n", [
    "Sim",
    "Não",
    "Você esqueceu de algo.",
  ]);
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
    await escreverVoz(
      npcs.Historia.padrao.voz,
      "Você não tem escolha.",
      250,
      1000,
    );
    await wait(2000);
  } else {
    console.clear();
    await escreverTempo(
      "'Esqueci de algo'... Você fala sobre seu corpo. Estou certo?",
      100,
      2500,
    );
    musica.pause();
    await escreverTempo("Interesssante. Muito, muito interessante.", 100, 1500);
    await escreverTempo("Vou contar-lhe as regras aqui...", 100, 1000);
    await escreverTempo("Você não escolhe como quer ser.", 200, 2500);
    await wait(1000);
  }
  fecharRawMode();
  definirSom("./sound/snd_impact.wav", false, 1);

  jogador.nomeEntrada = nomeEntrada;
  jogador.nomeVessel = nomeVessel;
  await salvarDadosJogador();
  await wait(2000);
}

atualizarAtributos();
posJogador.x = localAtual["Spawn"]["X"];
posJogador.y = localAtual["Spawn"]["Y"];
musica = definirSom(localAtual["musica"], true, 1);
mapa = carregarMapaJSON(localAtual["mapa"]);
process.stdout.write("\x1B[H");
process.stdout.write("\x1B[?25l");
ativarRawMode();

telaAtual = "mapa";

if (telaAtual === "mapa") {
  setInterval(() => {
    if (!redesenhar || telaAtual !== "mapa") return;

    const alternar = localAtual["alternar"];
    if (
      alternar &&
      posJogador.x === alternar["x"] &&
      alternar["y"].includes(posJogador.y)
    ) {
      let linhasMapa;
      if (Math.random() < 0.01) {
        localAtual = setores["DarkWorld"]["Sala do Ovo"];
        jogador.localAtual = localAtual;
        linhasMapa = localAtual["mapa"];
      } else {
        const [mundo, nomeLocal, propriedadeMapa] = alternar["novoMapa"]
          .match(/'[^']+'/g)
          .map((parte) => parte.slice(1, -1));
        const origemNoLightWorld = Object.values(setores["LightWorld"]).includes(
          localAtual,
        );
        localAtual = setores[mundo][nomeLocal];
        if (origemNoLightWorld && mundo === "LightWorld") {
          const xEntrada = localAtual["alternar"]["x"];
          posJogador.x = xEntrada === 0 ? 1 : xEntrada - 1;
        }
        jogador.localAtual = localAtual;
        linhasMapa = localAtual[propriedadeMapa];
      }

      mapa = carregarMapaJSON(linhasMapa);
    }

    renderizarMapa(mapa);
    redesenhar = false;
  }, 1000 / 30);
  console.clear();
  iniciarMovimento(modoAtual);
}
