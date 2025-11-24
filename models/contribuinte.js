class Contribuinte {
  #nome;
  #documento;
  #rendaBruta;

  constructor(nome, documento, rendaBruta) {
    this.#nome = nome;
    this.#documento = documento;
    this.#rendaBruta = rendaBruta;
  }

  getNome() {
    return this.#nome;
  }

  getDocumento() {
    return this.#documento;
  }

  getRendaBruta() {
    return this.#rendaBruta;
  }

  calcImposto() {
    return 0;
  }

  getTipo() {
    return this.constructor.name;
  }

  toString() {
    return `Contribuinte: ${this.#nome}, Documento: ${this.#documento}, Renda Bruta: R$ ${this.#rendaBruta}`;
  }
}

export default Contribuinte;