import { wait } from "./wait.js";
import { definirSom } from "./tocarSom.js";

function renderizarOpcoes(pergunta, opcoes, indiceSelecionado) {
    console.clear();
    let opcoesRenderizadas = [];

    for (let i = 0; i < opcoes.length; i++) {
        if (i === indiceSelecionado) {
            opcoesRenderizadas.push(opcoes[i] + " ◀");
        } else {
            opcoesRenderizadas.push(opcoes[i]);
        }
    }

    console.log(pergunta + "\n" + opcoesRenderizadas.join("\n"));
}

function selecionarOpcao(pergunta, opcoes) {
    return new Promise((resolve) => {
        let indiceSelecionado = 0;
        renderizarOpcoes(pergunta, opcoes, indiceSelecionado);

        const tratarTecla = (tecla) => {
            let entrada = tecla.toString().toLowerCase();

            switch (entrada) {
                case "w":
                    indiceSelecionado = indiceSelecionado - 1;
                    if (indiceSelecionado < 0) {
                        indiceSelecionado = opcoes.length - 1;
                    }
                    definirSom("./sound/snd_menumove.wav", false, 1);
                    renderizarOpcoes(pergunta, opcoes, indiceSelecionado);
                    break;

                case "s":
                    indiceSelecionado = indiceSelecionado + 1;
                    if (indiceSelecionado > opcoes.length - 1) {
                        indiceSelecionado = 0;
                    }
                    definirSom("./sound/snd_menumove.wav", false, 1);
                    renderizarOpcoes(pergunta, opcoes, indiceSelecionado);
                    break;

                case "\n":
                  case "\r":
                    definirSom("./sound/snd_select.wav", false, 1);
                    process.stdin.removeListener("data", tratarTecla);
                    resolve(opcoes[indiceSelecionado]);
                    break;
            }
        };

        process.stdin.on("data", tratarTecla);
    });
}

export async function escolherOpcao(pergunta, opcoes) {
    await wait(100);
    return await selecionarOpcao(pergunta, opcoes);
}

export async function simOuNao(pergunta) {
    await wait(100);
    return await selecionarOpcao(pergunta, ["Sim", "Não"]);
}