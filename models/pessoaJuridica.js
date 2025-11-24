import Contribuinte from "./contribuinte.js";

class PessoaJuridica extends Contribuinte {
  #anoDeFundacao;

  constructor(id, nome, documento, rendaBruta, anoDeFundacao) {
    super(id, nome, documento, rendaBruta);
    this.#anoDeFundacao = anoDeFundacao;
  }

  get anoDeFundacao() { return this.#anoDeFundacao; }
  set anoDeFundacao(valor) { this.#anoDeFundacao = valor; }

  calcImposto() { return this.getRendaBruta() * 0.1; }

  toString() { return `${super.toString()} | Ano: ${this.#anoDeFundacao}`; }
}

export default PessoaJuridica;