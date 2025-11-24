// models/grupodeContribuintes.js
import DatabaseConnection from "./databaseConnection.js";

class GrupoDeContribuintes extends DatabaseConnection {
  static #instance;

  constructor() {
    super(); // Chama o construtor do DatabaseConnection
    if (GrupoDeContribuintes.#instance) {
      return GrupoDeContribuintes.#instance;
    }
    
    // Inicializa a lista apenas se for a primeira vez
    this.contribuintes = [];
    GrupoDeContribuintes.#instance = this;
  }

  // Método estático para obter a instância única (Singleton)
  static getInstance() {
    if (!this.#instance) {
      this.#instance = new GrupoDeContribuintes();
    }
    return this.#instance;
  }

  addContribuinte(contribuinte) {
    // Verificação simples baseada na existência do método getTipo
    if (typeof contribuinte.getTipo === 'function') {
      this.contribuintes.push(contribuinte);
    } else {
      throw new Error("Objeto inválido. Deve ser um Contribuinte.");
    }
  }

  getContribuintes() {
    return this.contribuintes;
  }

  getTotalImposto() {
    return this.contribuintes.reduce(
      (total, contrib) => total + contrib.calcImposto(),
      0
    );
  }

  getPorcentagemContribuintesFeminino() {
    const totalPessoasFisicas = this.contribuintes.filter(
      (c) => c.getTipo() === "PessoaFisica"
    );
    
    // Verificação de segurança para o sexo
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