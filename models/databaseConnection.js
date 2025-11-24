// models/databaseConnection.js
class DatabaseConnection {
  static #instance;

  constructor() {
    if (DatabaseConnection.#instance) {
      return DatabaseConnection.#instance;
    }
    DatabaseConnection.#instance = this;
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new DatabaseConnection();
    }
    return this.#instance;
  }
}

export default DatabaseConnection;