import mysql from 'mysql2/promise';

class DatabaseConnection {
  static #instance;
  #pool;

  constructor() {
    if (DatabaseConnection.#instance) {
      return DatabaseConnection.#instance;
    }

    // CONFIGURE AQUI OS DADOS DO SEU BANCO
    this.#pool = mysql.createPool({
      host: 'localhost',
      user: 'root',      // Seu usuário do MySQL
      password: '',      // Sua senha do MySQL
      database: 'sistema_tributario',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    DatabaseConnection.#instance = this;
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new DatabaseConnection();
    }
    return this.#instance;
  }

  getPool() {
    return this.#pool;
  }
}

export default DatabaseConnection;