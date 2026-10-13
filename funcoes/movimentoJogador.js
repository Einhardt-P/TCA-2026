const mapa = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "#"],
    ["#", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "#"],
    ["#", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "#"],
    ["#", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "#"],
    ["#", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "=", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
];

const posJogador = {
    x: 1,
    y: 1
}

function renderizarMapa () {

    process.stdout.write("\x1B[H")

    for (let y = 0; y < mapa.length; y++) {
        let linha = "";

            for (let x = 0; x < mapa[y].length; x++) {
                if (x === posJogador.x  && y === posJogador.y) {
                    linha += "^";
                } else {
                    linha += mapa[y][x];
                }
            }

            process.stdout.write(linha + "\n");
    }

    process.stdout.write("\nWASD para andar\n");
}

function mover (px, py) {
  const novoX = posJogador.x + px;
  const novoY = posJogador.y + py;

  if (
    novoY < 0 ||
    novoY >= mapa.length ||
    novoX < 0 ||
    novoX >= mapa[novoY].length ||
    mapa[novoY][novoX] === "#"
  ) {
    return;
  }

posJogador.x = novoX;
posJogador.y = novoY;

renderizarMapa();

}

process.stdout.write("\x1B[2J\x1B[H");
process.stdout.write("\x1B[?25l");

renderizarMapa();

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

function lerPos() {
    process.stdin.on("data", (tecla) => {
    switch (tecla.toLowerCase()) {
        case "w":
            mover(0, -1);
            break;

        case "s":
            mover(0, 1);
            break;

        case "a":
            mover(-1, 0);
            break;

        case "d":
            mover(1, 0);
            break;
    }
})
}

    lerPos();