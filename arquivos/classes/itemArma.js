class itemArma {
  constructor(nome, ID, ataque, descricao, nomeDW, ataqueDW, descricaoDW, bonusMagia) {
    this.nome = nome;
    this.ID = "LW" + ID;
    this.desc = descricao;
    this.ataque = ataque;
    this.DarkWorld = new itemArmaDW(nomeDW, ID, ataqueDW, descricaoDW, bonusMagia);
  }
  sobreItem() {
    for (let i = 0; i < this.desc.length; i++) {
      console.log(this.desc[i]);
    }
  }
}

class itemArmaDW {
  constructor(nome, ID, danoMax, ataque, descricao, bonusMagia) {
    this.nome = nome;
    this.ID = "DW" + ID;
    this.desc = descricao;
    this.ataque = ataque;
    this.bonusMagia = bonusMagia;
  }
  sobreItem() {
    for (let i = 0; i < this.desc.length; i++) {
      console.log(this.desc[i]);
    }
  }
}

export default itemArma;
