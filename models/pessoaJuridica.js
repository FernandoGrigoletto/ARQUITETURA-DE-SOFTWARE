import Contribuinte from "./contribuinte.js";

class PessoaJuridica extends Contribuinte {
  #anoDeFundacao;

  constructor(nome, documento, rendaBruta, anoDeFundacao) {
    super(nome, documento, rendaBruta);
    this.#anoDeFundacao = anoDeFundacao;
  }

  get anoDeFundacao() {
    return this.#anoDeFundacao;
  }

  calcImposto() {
    return this.getRendaBruta() * 0.1;
  }

  toString() {
    return `${super.toString()}, Ano de Fundação: ${this.#anoDeFundacao}`;
  }
}

export default PessoaJuridica;