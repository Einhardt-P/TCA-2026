import { itemArmaDW } from "./itemArma";

export class clonadorArmas {
  constructor(nome, ID, ataque, descricao, nomeDW, ataqueDW, descricaoDW, bonusMagia) {
    this.nome = nome;
    this.ID = "LW" + ID;
    this.desc = descricao;
    this.ataque = ataque;
    this.DarkWorld = new itemArmaDW(nomeDW, ID, ataqueDW, descricaoDW, bonusMagia);
  }
  sobreItem() {
    console.log(this.descricao)
  }
}