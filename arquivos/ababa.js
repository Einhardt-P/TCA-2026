import fs from "node:fs/promises";
let jogador = {
    nome: nomeEntrada,
    nomeVessel: nomeVessel,
    raca: "",
    darkWorld: false,
    LOVE: 0,
    HATE: 0,
    NEUTRAL: 0,
    nullMagia: 1,
    
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

}


let jogadorJSON = JSON.stringify(jogador);

await fs.writeFile(jogadorJSON, 2, null)