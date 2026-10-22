export class itemArmaDW {
  constructor(nome, ID, ataque, descricao, bonusMagia) {
    this.nome = nome;
    this.ID = "DW" + ID;
    this.desc = descricao;
    this.ataque = ataque;
    this.bonusMagia = bonusMagia;
  }
  sobreItem() {
    console.log(this.descricao)
  }
}
