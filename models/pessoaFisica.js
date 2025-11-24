import Contribuinte from "./contribuinte.js";

class PessoaFisica extends Contribuinte {
  #sexo;

  constructor(nome, documento, rendaBruta, sexo) {
    super(nome, documento, rendaBruta);
    this.#sexo = sexo;
  }

  get sexo() {
    return this.#sexo;
  }

  set sexo(valor) {
    this.#sexo = valor;
  }

  calcImposto() {
    let aliquota = 0,
      deducao = 0;

    if (this.rendaBruta <= 1400) {
      aliquota = 0;
      deducao = 0;
    } else if (this.rendaBruta <= 2100) {
      aliquota = 0.1;
      deducao = 100;
    } else if (this.rendaBruta <= 2800) {
      aliquota = 0.15;
      deducao = 270;
    } else if (this.rendaBruta <= 3600) {
      aliquota = 0.25;
      deducao = 500;
    } else {
      aliquota = 0.3;
      deducao = 700;
    }

    return this.rendaBruta * aliquota - deducao;
  }

  // Método toString para representar o objeto como string
  toString() {
    return `${super.toString()}, Sexo: ${this.#sexo}`;
  }
}

export default PessoaFisica;
