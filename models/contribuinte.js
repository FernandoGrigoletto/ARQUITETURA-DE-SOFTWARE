// Contribuinte.js
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

  setNome(valor) {
    this.#nome = valor;
  }

  getDocumento() {
    return this.#documento;
  }

  setDocumento(valor) {
    this.#documento = valor;
  }

  getRendaBruta() {
    return this.#rendaBruta;
  }

  setRendaBruta(valor) {
    this.#rendaBruta = valor;
  }

  calcImposto() {
    return 0;
  }

  getTipo() {
    return this.constructor.name;
  }

  // Método toString para representar o objeto como string
  toString() {
    return `Contribuinte: ${this.#nome}, Documento: ${
      this.#documento
    }, Renda Bruta: R$ ${this.#rendaBruta}`;
  }
}

export default Contribuinte;
