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

  calcImposto() {
    let renda = this.getRendaBruta();
    let aliquota = 0;
    let deducao = 0;

    if (renda <= 1400) {
      aliquota = 0;
    } else if (renda <= 2100) {
      aliquota = 0.1;
      deducao = 100;
    } else if (renda <= 2800) {
      aliquota = 0.15;
      deducao = 270;
    } else if (renda <= 3600) {
      aliquota = 0.25;
      deducao = 500;
    } else {
      aliquota = 0.3;
      deducao = 700;
    }

    return (renda * aliquota) - deducao;
  }

  toString() {
    return `${super.toString()}, Sexo: ${this.#sexo}`;
  }
}

export default PessoaFisica;