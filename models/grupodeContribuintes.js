import DatabaseConnection from "./databaseConnection.js";
import PessoaFisica from "./pessoaFisica.js";
import PessoaJuridica from "./pessoaJuridica.js";

class GrupoDeContribuintes {
  static #instance;

  constructor() {
    if (GrupoDeContribuintes.#instance) {
      return GrupoDeContribuintes.#instance;
    }
    this.dbConnection = DatabaseConnection.getInstance();
    this.contribuintes = []; // Cache local dos objetos
    GrupoDeContribuintes.#instance = this;
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new GrupoDeContribuintes();
    }
    return this.#instance;
  }

  // AGORA É ASSÍNCRONO (ASYNC)
  async addContribuinte(contribuinte) {
    const pool = this.dbConnection.getPool();
    const tipo = contribuinte.getTipo(); // 'PessoaFisica' ou 'PessoaJuridica'
    
    let sql = '';
    let params = [];

    // Prepara o INSERT dependendo do tipo
    if (tipo === 'PessoaFisica') {
      sql = `INSERT INTO contribuintes (nome, documento, renda_bruta, tipo, sexo) VALUES (?, ?, ?, ?, ?)`;
      params = [contribuinte.getNome(), contribuinte.getDocumento(), contribuinte.getRendaBruta(), tipo, contribuinte.sexo];
    } else {
      sql = `INSERT INTO contribuintes (nome, documento, renda_bruta, tipo, ano_fundacao) VALUES (?, ?, ?, ?, ?)`;
      params = [contribuinte.getNome(), contribuinte.getDocumento(), contribuinte.getRendaBruta(), tipo, contribuinte.anoDeFundacao];
    }

    // Executa no banco
    await pool.execute(sql, params);
    
    // Adiciona na lista local para cálculos imediatos
    this.contribuintes.push(contribuinte);
  }

  // NOVO MÉTODO: Carrega do banco e recria os Objetos
  async carregarDoBanco() {
    const pool = this.dbConnection.getPool();
    const [rows] = await pool.execute('SELECT * FROM contribuintes');
    
    this.contribuintes = []; // Limpa lista atual

    rows.forEach(row => {
      let obj;
      // Converte a linha do banco (JSON) para Objeto com Métodos
      if (row.tipo === 'PessoaFisica') {
        obj = new PessoaFisica(row.nome, row.documento, parseFloat(row.renda_bruta), row.sexo);
      } else {
        obj = new PessoaJuridica(row.nome, row.documento, parseFloat(row.renda_bruta), row.ano_fundacao);
      }
      this.contribuintes.push(obj);
    });
  }

  getTotalImposto() {
    // Calcula com base nos objetos carregados na memória
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