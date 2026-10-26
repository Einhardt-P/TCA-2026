let jogador = {
        nome: entradaNome,
        raca: "",
        classe: "",
        LOVE: 0,
        HATE:0,
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
    
    definirRaca() {
      this.raca = racaJogador[random % 4];
    },

    definirClasse() {
        if (raca === "Humano" || raca === "Monstro") {
            classe = "Luz";
            if (this.raca === "Humano") {
                this.nullMagia = 0; 
            }
        } else {
            this.classe = "???";
        }
    },

    definirArmaInicial() {
      if (this.raca === "Humano") {
          this.armaLW = lapisEscolar;
          this.armaDW = lapisEscolar.DarkWorld;
          this.MaxHP = 20;
          this.HP = this.MaxHP;
          this.MaxHPDW = 90;
          this.HPDW = this.MaxHPDW
      }
      if (this.raca === "Monstro") {
        this.armaLW = reguaQuebrada;
        this.armaDW = reguaQuebrada.DarkWorld;
        this.MaxHP = 30;
        this.HP = this.MaxHP;
        this.MaxHPDW = 110;
        this.HPDW = this.MaxHPDW
      }
    },

    atualizarAtributos() {
        this.NEUTRAL = this.LOVE + this.HATE;
        
        let atqArmaLW = 0;
        if (this.armaLW) {
            atqArmaLW = this.armaLW.ataque;
        }

        let atqArmaDW = 0;
        if (this.armaDW) {
            atqArmaDW = this.armaDW.ataque;
        }

        if (this.armaDW) {
            this.bonusMagia = this.armaDW.bonusMagia;
        } else {
            this.bonusMagia = 0;
        }

        this.defesaLW = 1 * this.NEUTRAL;
        this.ataqueLW = (1 * this.NEUTRAL) + atqArmaLW;
        this.defesaDW = 1;
        this.ataqueDW = (1 * this.NEUTRAL) + atqArmaDW;
        
        this.magia = (1 + this.bonusMagia) * this.nullMagia;

        if (this.raca === "Monstro" && this.HPDW <= 0 ) {
          this.raca = "Dustner";
        }
    }
}