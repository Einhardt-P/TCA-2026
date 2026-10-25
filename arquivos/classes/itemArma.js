export class itemArmaDW {
  constructor(modelo) {
    this.nome = modelo.DarkWorld.nome;
    this.ID = "DW" + modelo.DarkWorld.ID;
    this.desc = modelo.DarkWorld.descricao;
    this.ataque = modelo.DarkWorld.ataque;
    this.bonusMagia = modelo.DarkWorld.bonusMagia;
  }
  sobreItem() {
    console.log(this.descricao)
  }
}
