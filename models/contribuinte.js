class Contribuinte {
  #id; // Novo campo
  #nome;
  #documento;
  #rendaBruta;

  constructor(id, nome, documento, rendaBruta) {
    this.#id = id;
    this.#nome = nome;
    this.#documento = documento;
    this.#rendaBruta = rendaBruta;
  }

  getId() { return this.#id; }
  getNome() { return this.#nome; }
  getDocumento() { return this.#documento; }
  getRendaBruta() { return this.#rendaBruta; }

  // Setters para atualização
  setNome(valor) { this.#nome = valor; }
  setRendaBruta(valor) { this.#rendaBruta = valor; }

  calcImposto() { return 0; }
  getTipo() { return this.constructor.name; }

  toString() {
    return `[ID: ${this.#id}] ${this.#nome} | Doc: ${this.#documento} | Renda: R$ ${this.#rendaBruta}`;
  }
}

export default Contribuinte;