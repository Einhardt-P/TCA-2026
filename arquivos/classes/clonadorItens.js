import { itemArmaDW } from "./itemArma";

export class clonadorArmas {
  constructor(modelo) {
    this.nome = modelo.nome;
    this.ID = "LW" + modelo.ID;
    this.desc = modelo.descricao;
    this.ataque = modelo.ataque;
    this.DarkWorld = new itemArmaDW(modelo);
  }
  sobreItem() {
    console.log(this.descricao)
  }
}