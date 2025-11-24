import Contribuinte from "./contribuinte.js";

class PessoaFisica extends Contribuinte {
  #sexo;

  constructor(id, nome, documento, rendaBruta, sexo) {
    super(id, nome, documento, rendaBruta); // Passa ID para o pai
    this.#sexo = sexo;
  }

  get sexo() { return this.#sexo; }
  set sexo(valor) { this.#sexo = valor; }

  calcImposto() {
    let renda = this.getRendaBruta();
    let aliquota = 0, deducao = 0;

    if (renda <= 1400) { aliquota = 0; }
    else if (renda <= 2100) { aliquota = 0.1; deducao = 100; }
    else if (renda <= 2800) { aliquota = 0.15; deducao = 270; }
    else if (renda <= 3600) { aliquota = 0.25; deducao = 500; }
    else { aliquota = 0.3; deducao = 700; }

    return (renda * aliquota) - deducao;
  }

  toString() { return `${super.toString()} | Sexo: ${this.#sexo}`; }
}

export default PessoaFisica;