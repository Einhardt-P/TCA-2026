import { wait } from "./wait.js";

function renderizarOpcoes(pergunta, opcoes, indiceSelecionado) {
    console.clear();
    const opcoesRenderizadas = opcoes.map((opcao, indice) =>
        indice === indiceSelecionado ? `${opcao} ◀` : opcao
    );

    console.log(`${pergunta}\n${opcoesRenderizadas.join("\n")}`);
}

function selecionarOpcao(pergunta, opcoes) {
    return new Promise((resolve) => {
        let indiceSelecionado = 0;
        renderizarOpcoes(pergunta, opcoes, indiceSelecionado);

        const tratarTecla = (tecla) => {
            const entrada = tecla.toString().toLowerCase();

            if (entrada === "w" || entrada === "arrowup") {
                indiceSelecionado = (indiceSelecionado - 1 + opcoes.length) % opcoes.length;
                renderizarOpcoes(pergunta, opcoes, indiceSelecionado);
                return;
            }

            if (entrada === "s" || entrada === "arrowdown") {
                indiceSelecionado = (indiceSelecionado + 1) % opcoes.length;
                renderizarOpcoes(pergunta, opcoes, indiceSelecionado);
                return;
            }

            if (entrada === "z" || entrada === "\r" || entrada === "\n") {
                process.stdin.removeListener("data", tratarTecla);
                resolve(opcoes[indiceSelecionado]);
                return;
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