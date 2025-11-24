import DatabaseConnection from "./databaseConnection.js";
import PessoaFisica from "./pessoaFisica.js";
import PessoaJuridica from "./pessoaJuridica.js";

class GrupoDeContribuintes {
  static #instance;

  constructor() {
    if (GrupoDeContribuintes.#instance) return GrupoDeContribuintes.#instance;
    this.dbConnection = DatabaseConnection.getInstance();
    this.contribuintes = [];
    GrupoDeContribuintes.#instance = this;
  }

  static getInstance() {
    if (!this.#instance) this.#instance = new GrupoDeContribuintes();
    return this.#instance;
  }

  // CREATE (INSERIR)
  async addContribuinte(c) {
    const pool = this.dbConnection.getPool();
    const tipo = c.getTipo();
    let sql = '', params = [];

    if (tipo === 'PessoaFisica') {
      sql = `INSERT INTO contribuintes (nome, documento, renda_bruta, tipo, sexo) VALUES (?, ?, ?, ?, ?)`;
      params = [c.getNome(), c.getDocumento(), c.getRendaBruta(), tipo, c.sexo];
    } else {
      sql = `INSERT INTO contribuintes (nome, documento, renda_bruta, tipo, ano_fundacao) VALUES (?, ?, ?, ?, ?)`;
      params = [c.getNome(), c.getDocumento(), c.getRendaBruta(), tipo, c.anoDeFundacao];
    }
    await pool.execute(sql, params);
  }

  // READ (CARREGAR)
  async carregarDoBanco() {
    const pool = this.dbConnection.getPool();
    const [rows] = await pool.execute('SELECT * FROM contribuintes');
    this.contribuintes = [];
    rows.forEach(row => {
      let obj;
      // Note que agora passamos row.id como primeiro parâmetro
      if (row.tipo === 'PessoaFisica') {
        obj = new PessoaFisica(row.id, row.nome, row.documento, parseFloat(row.renda_bruta), row.sexo);
      } else {
        obj = new PessoaJuridica(row.id, row.nome, row.documento, parseFloat(row.renda_bruta), row.ano_fundacao);
      }
      this.contribuintes.push(obj);
    });
  }

  // UPDATE (ATUALIZAR)
  async atualizarContribuinte(id, rendaNova) {
    const pool = this.dbConnection.getPool();
    // Exemplo simples: Atualizar apenas a renda bruta
    const sql = `UPDATE contribuintes SET renda_bruta = ? WHERE id = ?`;
    await pool.execute(sql, [rendaNova, id]);
  }

  // DELETE (EXCLUIR)
  async removerContribuinte(id) {
    const pool = this.dbConnection.getPool();
    const sql = `DELETE FROM contribuintes WHERE id = ?`;
    await pool.execute(sql, [id]);
  }

  getPorcentagemContribuintesFeminino() {
    const fisicas = this.contribuintes.filter(c => c.constructor.name === "PessoaFisica");
    const fem = fisicas.filter(c => c.sexo && c.sexo.toLowerCase() === "feminino").length;
    return fisicas.length > 0 ? (fem / fisicas.length) * 100 : 0;
  }

  getTotalImposto() {
    return this.contribuintes.reduce((acc, c) => acc + c.calcImposto(), 0);
  }

  toString() {
    return this.contribuintes.map(c => c.toString()).join("\n");
  }
}

export default GrupoDeContribuintes;