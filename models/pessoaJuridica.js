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

  set anoDeFundacao(valor) {
    this.#anoDeFundacao = valor;
  }

  calcImposto() {
    return this.rendaBruta * 0.1;
  }

  // Método toString para representar o objeto como string
  toString() {
    return `${super.toString()}, Ano de Fundação: ${this.#anoDeFundacao}`;
  }
}

export default PessoaJuridica;
