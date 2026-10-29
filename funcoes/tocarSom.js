import audio from "audio";

export function definirSom(som, loop, velocidade) {
    let mus = audio(som);

    mus.loop = loop;
    mus.speed(velocidade); 
    mus.play({loop: loop})
    return mus;
}