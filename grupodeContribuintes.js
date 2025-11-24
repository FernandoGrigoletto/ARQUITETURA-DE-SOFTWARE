import PessoaFisica from "./pessoaFisica.js";
import PessoaJuridica from "./pessoaJuridica.js";

class GrupoDeContribuintes {
  constructor() {
    this.contribuintes = [];
  }

  addContribuinte(contribuinte) {
    const tipo = contribuinte.getTipo();
    if (tipo === "PessoaFisica" || tipo === "PessoaJuridica") {
      this.contribuintes.push(contribuinte);
    } else {
      throw new Error(
        "O objeto deve ser uma instância de PessoaFisica ou PessoaJuridica"
      );
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
      (c) => c.getTipo() === "PessoaFisica"
    );
    const totalFeminino = totalPessoasFisicas.filter(
      (c) => c.sexo.toLowerCase() === "feminino"
    ).length;

    return totalPessoasFisicas.length > 0
      ? (totalFeminino / totalPessoasFisicas.length) * 100
      : 0;
  }

  // Método toString para representar o grupo de contribuintes como string
  toString() {
    return this.contribuintes.map((contrib) => contrib.toString()).join("\n");
  }
}

export default GrupoDeContribuintes;
