// models/grupodeContribuintes.js
import DatabaseConnection from "./databaseConnection.js";

class GrupoDeContribuintes extends DatabaseConnection {
  static #instance;

  constructor() {
    super();
    if (GrupoDeContribuintes.#instance) {
      return GrupoDeContribuintes.#instance;
    }
    this.contribuintes = [];
    GrupoDeContribuintes.#instance = this;
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new GrupoDeContribuintes();
    }
    return this.#instance;
  }

  addContribuinte(contribuinte) {
    if (contribuinte && typeof contribuinte.calcImposto === 'function') {
      this.contribuintes.push(contribuinte);
    } else {
      // Opcional: Ignorar silenciosamente ou lançar erro
    }
  }

  getTotalImposto() {
    return this.contribuintes.reduce(
      (total, contrib) => total + contrib.calcImposto(),
      0
    );
  }

  getPorcentagemContribuintesFeminino() {
    const totalPessoasFisicas = this.contribuintes.filter(
      (c) => c.constructor.name === "PessoaFisica"
    );
    const totalFeminino = totalPessoasFisicas.filter(
      (c) => c.sexo && c.sexo.toLowerCase() === "feminino"
    ).length;

    return totalPessoasFisicas.length > 0
      ? (totalFeminino / totalPessoasFisicas.length) * 100
      : 0;
  }

  toString() {
    return this.contribuintes.map((contrib) => contrib.toString()).join("\n");
  }
}

export default GrupoDeContribuintes;